pragma solidity ^0.4.2;

contract MaritalAgreement {
  
  string public marriageStatus;
  string public marriageDate;
  // string public ipfsHash;
  string public spouseOne;
  string public spouseTwo;
  address public spouseOneAddress;
  address public spouseTwoAddress;
  address owner;
  uint amountInContract;
  uint public constant WEI_PER_ETHER = 1000000000000000000;

  bool public isSigned;
  bool public spouseTwoSigned;
  bool public spouseOneSigned;

    // This is the constructor, called while creating the contract
  function MaritalAgreement(string _marriageStatus, string _marriageDate, address _owner, string _spouseOne, string _spouseTwo, address _spouseOneAddress, address _spouseTwoAddress){
    marriageStatus = _marriageStatus;
    marriageDate = _marriageDate;
    // ipfsHash = _ipfsHash;
    spouseOne = _spouseOne;
    spouseTwo = _spouseTwo;
    spouseOneAddress = _spouseOneAddress;
    spouseTwoAddress = _spouseTwoAddress;
    owner = _owner;
    amountInContract += msg.value;
  }

    // This is a function called by both the husband and wife to accept the terms of the document denoted by ipfsHash
  function accept() {
    //TODO: dont let the sender accept if he/she is still on an active prenup with someoneelse
    amountInContract += msg.value;
    if (msg.sender == spouseOneAddress) {
      spouseOneSigned = true;
      if (spouseTwoSigned == true){
        isSigned = true;
      }
    }

    if (msg.sender == spouseTwoAddress) {
      spouseTwoSigned = true;
      if (spouseOneSigned == true){
        isSigned = true;
      }
    }
  }
  
  function spouseOneSign() {
    spouseOneSigned = true;
    if (spouseTwoSigned == true){
      isSigned = true;
    }
  }

  function spouseTwoSign() {
    spouseTwoSigned = true;
    if (spouseOneSigned == true){
      isSigned = true;
    }
  }

  modifier ifOwner() { 
    if (owner != msg.sender) {
      // throw;
    } else {
      _;
    }
  }
    
  // A function to change the Marriage status of the contract
  function changeStatus(string _status) ifOwner{
    marriageStatus = _status;
  }
  
  // A function to change the hash of the document in case we decide to update the covenants
  // function changeIPFSHash(string _hash) ifOwner{
  //   // ipfsHash = _hash;   
  //   isSigned = false;
  // }
  
  // Fallback function which increases the variable 
  function(){
    amountInContract += msg.value;
  }
  
  // A withdraw function just in case someone sends Ether to this contract
  function withdraw() ifOwner {
    uint amountReturned = amountInContract - (WEI_PER_ETHER * 2/10);
    owner.send(amountReturned);
  }


      
}