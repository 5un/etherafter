pragma solidity ^0.4.2;

import "./MaritalAgreement.sol";

contract MaritalRegistry {
  uint familiesCount;

  struct Person {
    address uportAddress;
    uint activeMaritalAgreement;
  }

  mapping(address => Person) public people;
  MaritalAgreement[] public maritalAgreements;

  function MaritalRegistry() {

  }

  function propose(string _marriageDate, address _owner, string _spouseOne, string _spouseTwo, address _spouseOneAddress, address _spouseTwoAddress) returns (address) {
    // TODO: create a marital agreement
    // msg.sender
    address ma = new MaritalAgreement("proposal", _marriageDate, _owner, _spouseOne, _spouseTwo, _spouseOneAddress, _spouseTwoAddress);
    // ma.spouseOneSign()
    familiesCount += 1;
    people[_spouseOneAddress] = Person({ uportAddress: _spouseOneAddress, activeMaritalAgreement: 0 });
    return ma;
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

  function getFamiliesCount() returns (uint) {
    return familiesCount;
  }

  function addDependent() {

  }

  function getActiveMarriageAgreement(address spouse) returns (uint) {
    return people[spouse].activeMaritalAgreement;
  }

}
