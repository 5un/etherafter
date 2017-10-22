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
    //TODO: save in web3 first
    dispatch(agreementCreated(agreement))
  }
}
