var MaritalRegistry = artifacts.require("./MaritalRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(MaritalRegistry);
};
