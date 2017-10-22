var MaritalAgreement = artifacts.require("./MaritalAgreement.sol");
var MaritalRegistry = artifacts.require("./MaritalRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(MaritalAgreement);
  deployer.deploy(MaritalRegistry);
};
