import MaritalRegistryContract from '../../../build/contracts/MaritalRegistry.json'
import _ from 'lodash'
import store from '../../store'

const contract = require('truffle-contract')

export function getActiveMaritalAgreement() {
  return function(dispatch) {
    let web3 = store.getState().web3.web3Instance

    if (!_.isNull(web3)) {
      const maritalRegistry = contract(MaritalRegistryContract)
      maritalRegistry.setProvider(web3.currentProvider)

      maritalRegistry.deployed().then(function(instance) {
        console.log('contract deployed. gettin value')
        instance.getActiveMaritalAgreement.call("0x0dd1e632418dadbca6130c61590b150adb6d1818")
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
  }
}
