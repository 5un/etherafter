var PrenuptialAgreement = artifacts.require("./PrenuptialAgreement.sol");

module.exports = function(deployer) {
  deployer.deploy(PrenuptialAgreement);
};
