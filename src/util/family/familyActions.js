import MaritalRegistryContract from '../../../build/contracts/MaritalRegistry.json'
import _ from 'lodash'
import store from '../../store'

const contract = require('truffle-contract')

function agreementCreated(agreement) {
  return {
    type: 'CREATE_AGREEMENT',
    payload: agreement
  }
}

export function createMaritalAgreement(agreement) {
  return function(dispatch) {
    let web3 = store.getState().web3.web3Instance
    if (!_.isNull(web3)) {

      const maritalRegistry = contract(MaritalRegistryContract)
      maritalRegistry.setProvider(web3.currentProvider)

      maritalRegistry.deployed().then(function(instance) {
        console.log('contract deployed. gettin value')
        
        // propose(string _marriageDate, address _owner, string _spouseOne, string _spouseTwo, address _spouseOneAddress, address _spouseTwoAddress)
        
        //instance.getActiveMarriageAgreement.call("0x0dd1e632418dadbca6130c61590b150adb6d1818")

        instance.propose((new Date()).toString(), agreement.spouse1Address, agreement.spouse1Name, agreement.spouse2Name, agreement.spouse1Address, agreement.spouse2Address, {from: agreement.spouse1Address})
        .then(function(result) {
          console.log('got active marriage value');
          console.log(result);
        })
        .catch(function(result) {
          // If error...
          console.log('get error');
          console.error(result);
        })
      })
    } else {
      // console.error('Web3 is not initialized.');
    }

    dispatch(agreementCreated(agreement))
  }
}