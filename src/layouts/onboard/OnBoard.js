import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageContainer, GreenButton, FormGroup, Label, InputText, RadioOption } from '../../components/elements'
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
import { uport } from './../../util/connectors.js'
import { RadioGroup, Radio } from 'react-radio-group'

const mapStateToProps = (state, ownProps) => {
  return { web3: state.web3 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoaded: () => {
      // dispatch(getActiveMaritalAgreement())
    }
  }
}

class OnBoard extends Component {

  componentDidMount() {
    // this.props.onPageLoaded();
  }

  constructor(props, { authData }) {
    super(props)
    authData = this.props
    const defaults = {
      spouse1Name: 'Ethan Chain',
      spouse1Address: '0x0dd1e632418dadbca6130c61590b150adb6d1818',
      spouse2Name: 'Emily Ledger',
      spouse2Address: '0x4b413876b8499baa741a23a64bdcdb5faa5f6619'
    }
    this.state = {
      currentPage: 0,
      inputs: {},
      defaults,
      formPageCount: 5,
    }
  }

  handleTextChanged(e) {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [e.target.name]: e.target.value
      }
    })
  }

  handleRadioChanged(e) {
    console.log(e)  
  }

  handleNextPageClicked() {
    const { currentPage, formPageCount } = this.state
    if(currentPage + 1 < formPageCount) {
      if(currentPage == 5) {
        console.log('trying uport')
        uport.requestCredentials().then((credentials) => {
          console.log(credentials)
          this.setState({ 
            currentPage: currentPage + 1 
          })
        })
      } else {
        this.setState({ 
          currentPage: currentPage + 1 
        })
      }
      
    } else {
      //TODO: save redux state and go to other route
    }
    
  }

  render() {
    const { authData } = this.props;
    const { currentPage, formPageCount, defaults } = this.state;
    //TODO: check if the user have married
    const foundMarriageAgreement = false
    return(
      <main>
        <PageContainer>
          <h1>Family Setup</h1>
          <span>Step {currentPage} / {formPageCount}</span>
          {currentPage == 0 &&
            <div>
              <h2>Spouse 1 (You) Information</h2>
              <FormGroup>
                <Label>Name</Label>
                <InputText name="spouse1Name" onChange={this.handleTextChanged.bind(this)} defaultValue={defaults.spouse1Name} />
              </FormGroup>
              <FormGroup>
                <Label>Ethereum Address</Label>
                <InputText name="spouse1Address" onChange={this.handleTextChanged.bind(this)} defaultValue={defaults.spouse1Address}/>
              </FormGroup>
            </div>
          }
          {currentPage == 1 &&
            <div>
              <h2>Spouse 2 Information</h2>
              <FormGroup>
                <Label>Name</Label>
                <InputText name="spouse1Name" onChange={this.handleTextChanged.bind(this)} defaultValue={defaults.spouse2Name} />
              </FormGroup>
              <FormGroup>
                <Label>Ethereum Address</Label>
                <InputText name="spouse1Address" onChange={this.handleTextChanged.bind(this)} defaultValue={defaults.spouse2Address} />
              </FormGroup>
            </div>
          }
          {currentPage == 2 &&
            <div>
              <h2>Join Property Before Marriage</h2>
              <FormGroup>
                <Label>Will all property owned BEFORE the marriage remain separate property?</Label>
                <RadioGroup name="joinPropertyBeforeMarriage" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                  <RadioOption>
                    <Radio value={true} />Yes
                  </RadioOption>
                  <RadioOption>
                    <Radio value={false} />No
                  </RadioOption>
                </RadioGroup>
              </FormGroup>
              
            </div>
          }
          {currentPage == 3 &&
            <div>
              <h2>Join Property After Marriage</h2>
              <FormGroup>
                <Label>Will property acquired AFTER the marriage ceremony also remain separate property?</Label>
                <RadioGroup name="joinPropertyAfterMarriage" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                  <RadioOption>
                    <Radio value={true} />Yes
                  </RadioOption>
                  <RadioOption>
                    <Radio value={false} />No
                  </RadioOption>
                </RadioGroup>
              </FormGroup>
              
            </div>
          }
          {currentPage == 4 &&
            <div>
              <h2>Divorce Condition</h2>
              <FormGroup>
                <Label>How property will be divided in the event of a divorce?</Label>
                <RadioGroup name="divorcePropertyDivisionRatio" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                  <RadioOption>
                    <Radio value={true} />Yes
                  </RadioOption>
                  <RadioOption>
                    <Radio value={false} />No
                  </RadioOption>
                </RadioGroup>
              </FormGroup>
            </div>
          }
          {currentPage == 5 &&
            <div>
              <h2>Signing by Spouse 2</h2>
              <p>Spouse 2, by scaning the following UPort QR code, you agree to the marital agreement.</p>
            </div>
          }

          <GreenButton onClick={this.handleNextPageClicked.bind(this)}>Next</GreenButton>
        </PageContainer>
      </main>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnBoard)
