contract PrenuptialAgreement {
  
  string public marriageStatus;
  string public marriageDate;
  string public ipfsHash;
  string public theHusband;
  string public theWife;
  address public husbandAddress;
  address public wifeAddress;
  address owner;
  uint amountInContract;
  uint public constant WEI_PER_ETHER = 1000000000000000000;

  bool public isSigned;
  bool public wifeSigned;
  bool public husbandSigned;

    // This is the constructor, called while creating the contract
  function PrenuptialAgreement(string _marriageStatus, string _marriageDate, string _ipfsHash, address _owner, string _theHusband, string _theWife, address _husbandAddress, address _wifeAddress){
    marriageStatus = _marriageStatus;
    marriageDate = _marriageDate;
    ipfsHash = _ipfsHash;
    theHusband = _theHusband;
    theWife = _theWife;
    husbandAddress = _husbandAddress;
    wifeAddress = _wifeAddress;
    owner = _owner;
    amountInContract += msg.value;
  }

    // This is a function called by both the husband and wife to accept the terms of the document denoted by ipfsHash
  function accept() {
      amountInContract += msg.value;
    if(msg.sender == husbandAddress){
      husbandSigned = true;
      if (wifeSigned == true){
        isSigned = true;
      }
    }
    if(msg.sender == wifeAddress){
      wifeSigned = true;
      if (husbandSigned == true){
        isSigned = true;
      }
    }
  }
  
  modifier ifOwner() { 
    if (owner != msg.sender) {
        throw;
    } else {
        _
    }
  }
    
  // A function to change the Marriage status of the contract
  function changeStatus(string _status) ifOwner{
      marriageStatus = _status;
  }
  
  // A function to change the hash of the document in case we decide to update the covenants
  function changeIPFSHash(string _hash) ifOwner{
      ipfsHash = _hash;   
      isSigned = false;
  }
  
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