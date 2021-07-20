import Web3 from "web3";
import smashArtifact from "../build/contracts/SmashFighters.json"

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = smashArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        smashArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refreshFighters();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  transferFrom: async function () {
    const fighterId = parseInt(document.getElementById("fighterId").value);
    const recipient = document.getElementById("recipient").value;

    this.setStatus("Sending fighter... (this may take a while)");

    const { transferFrom } = this.meta.methods;
    await transferFrom(this.account, recipient, fighterId).call();

    this.setStatus("Transfer complete!");
    this.refreshFighters();
  },

  refreshFighters: async function () {
    const { balanceOf } = this.meta.methods;
    const numFighters = await balanceOf(this.account).call();

    const fightersElement = document.getElementById("numFighters");
    fightersElement.innerHTML = numFighters;
  },

  setStatus: function (message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  }
};

window.App = App;

window.addEventListener("load", function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
