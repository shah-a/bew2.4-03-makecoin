const SmashFighters = artifacts.require("SmashFighters");

module.exports = function(deployer) {
  deployer.deploy(SmashFighters);
};
