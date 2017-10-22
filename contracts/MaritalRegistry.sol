pragma solidity ^0.4.2;

contract MaritalRegistry {
  uint maritalAgreementCount;

  struct Person {
    address uportAddress;
    uint activeMaritalAgreement;
  }

  struct MaritalAgreement {
    string marriageStatus;
    string marriageDate;
    string spouseOne;
    string spouseTwo;
    address spouseOneAddress;
    address spouseTwoAddress;
    address owner;
    uint amountInContract;
  }

  mapping(address => Person) public people;
  mapping(uint => MaritalAgreement) public maritalAgreements;

  function MaritalRegistry() {

  }

  function propose(string _marriageDate, address _owner, string _spouseOne, string _spouseTwo, address _spouseOneAddress, address _spouseTwoAddress) returns (uint) {
    // TODO: create a marital agreement
    // msg.sender
    maritalAgreements[maritalAgreementCount] = MaritalAgreement({
                                marriageStatus: "proposal", 
                                marriageDate: _marriageDate, 
                                owner: _owner, 
                                spouseOne: _spouseOne, 
                                spouseTwo: _spouseTwo, 
                                spouseOneAddress: _spouseOneAddress, 
                                spouseTwoAddress: _spouseTwoAddress,
                                amountInContract: 0
                              });
    people[_spouseOneAddress] = Person({ uportAddress: _spouseOneAddress, activeMaritalAgreement: maritalAgreementCount });

    maritalAgreementCount += 1;
    return maritalAgreementCount;
    // Sign the ma?
  }

  function acceptProposal(uint proposalId) {
    // Add number of family

  }

  function declineProposal(uint proposalId) {
    // Self destruct the proposal?
  }

  function proposeDivorce() {

  }

  function acceptDivorce() {

  }

  function declineDivorce() {

  }

  function getMaritalAgreementCount() returns (uint) {
    return maritalAgreementCount;
  }

  function addDependent() {

  }

  function getActiveMaritalAgreement(address spouse) returns (uint) {
    return people[spouse].activeMaritalAgreement;
  }

}
