import SimpleStorageContract from '../../../build/contracts/SimpleStorage.json'
// import { loginUser } from '../loginbutton/LoginButtonActions'
import _ from 'lodash'
import store from '../../store'

const contract = require('truffle-contract')

export function getStorageData() {
  return function(dispatch) {
    let web3 = store.getState().web3.web3Instance

    // Double-check web3's status.
    console.log(web3)
    if (!_.isNull(web3)) {
      console.log('web3 not null')
      const simpleStorage = contract(SimpleStorageContract)
      simpleStorage.setProvider(web3.currentProvider)

      var simpleStorageInstance

      // Get current ethereum wallet.

      console.log('running dispatch')
      simpleStorage.deployed().then(function(instance) {
        simpleStorageInstance = instance
        console.log('contract deployed. gettin value')
        simpleStorageInstance.get()
        .then(function(result) {
          console.log('got value');
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

export function setStorageData(x) {
  return function(dispatch) {
    let web3 = store.getState().web3.web3Instance

    // Double-check web3's status.
    console.log(web3)
    if (!_.isNull(web3)) {
      console.log('web3 not null')
      const simpleStorage = contract(SimpleStorageContract)
      simpleStorage.setProvider(web3.currentProvider)

      var simpleStorageInstance

      // Get current ethereum wallet.
      web3.eth.getAccounts((error, accounts) => {
        console.log('running dispatch')
        simpleStorage.deployed().then(function(instance) {
          simpleStorageInstance = instance
          console.log('contract deployed. settin value')
          simpleStorageInstance.set(x, {from: accounts[0]})
          .then(function(result) {
            console.log('set value');
            console.log(result);
          })
          .catch(function(result) {
            // If error...
            console.log('get error');
            console.error(result);
          })
        })
      })

     
    } else {
      // console.error('Web3 is not initialized.');
    }
  }
}