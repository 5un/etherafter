var MaritalRegistry = artifacts.require("./MaritalRegistry.sol");

contract('MaritalRegistry', function(accounts) {

  it("..it should be able to create proposal", function() {
    return MaritalRegistry.deployed().then(function(instance) {
      maritalRegistryInstance = instance;
      return maritalRegistryInstance.propose();
    }).then(function() {
      return simpleStorageInstance.get.call();
    }).then(function(storedData) {
      assert.equal(storedData, 89, "The value 89 was not stored.");
    });
  });

});

