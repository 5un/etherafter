const initialState = {
  maritalAgreement: null
}

const familyReducer = (state = initialState, action) => {
  if (action.type === 'CREATE_AGREEMENT')
  {
    return Object.assign({}, state, {
      maritalAgreement: action.payload
    })
  }

  return state
}

export default familyReducer