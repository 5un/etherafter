import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageContainer, GreenButton, FormGroup, Label, InputText, RadioOption, Padding20Box } from '../../components/elements'
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
import { uport } from './../../util/connectors.js'
import { createMaritalAgreement } from './../../util/family/familyActions'
import { RadioGroup, Radio } from 'react-radio-group'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { browserHistory } from 'react-router'

const mapStateToProps = (state, ownProps) => {
  return { web3: state.web3 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoaded: () => {
      // dispatch(getActiveMaritalAgreement())
    },
    createMaritalAgreement: (agreement) => {
      dispatch(createMaritalAgreement(agreement))
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
      spouse2Address: '0x4b413876b8499baa741a23a64bdcdb5faa5f6619',
      joinPropertyBeforeMarriage: true,
      joinPropertyAfterMarriage: true,
      divorcePropertyDivisionRatio: 50,
    }
    this.state = {
      currentPage: 0,
      inputs: defaults,
      defaults,
      formPageCount: 6,
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

  handleRadioChanged(v, e) {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [e.target.name]: v
      }
    })
  }

  handleSliderChanged(name, value) {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [name]: value
      }
    })
  }

  handleNextPageClicked() {
    const { currentPage, formPageCount } = this.state
    if(currentPage + 1 < formPageCount) {
      this.setState({ 
          currentPage: currentPage + 1 
      })
      
      
    } else {
      uport.requestCredentials().then((credentials) => {
        console.log(credentials)
        this.props.createMaritalAgreement(this.state.inputs)
        browserHistory.push('/dashboard')
      })  
    }
  }

  render() {
    const { authData } = this.props;
    const { currentPage, formPageCount, defaults, inputs } = this.state;
    //TODO: check if the user have married
    const foundMarriageAgreement = false
    console.log(inputs)
    return(
      <main>
        <PageContainer>
          <h1>Family Setup</h1>
          <span>Step {currentPage + 1} / {formPageCount}</span>
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
                <RadioGroup name="joinPropertyBeforeMarriage" selectedValue={inputs.joinPropertyBeforeMarriage} onChange={this.handleRadioChanged.bind(this)}>
                  <RadioOption>
                    <Radio value={true} /> Yes
                  </RadioOption>
                  <RadioOption>
                    <Radio value={false} /> No
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
                <RadioGroup name="joinPropertyAfterMarriage" selectedValue={inputs.joinPropertyAfterMarriage} onChange={this.handleRadioChanged.bind(this)}>
                  <RadioOption>
                    <Radio value={true} /> Yes
                  </RadioOption>
                  <RadioOption>
                    <Radio value={false} /> No
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
                <Padding20Box>
                  Spouse 1 <Slider style={{ width: '200px', display: 'inline-block' }} defaultValue={50} onChange={this.handleSliderChanged.bind(this, 'divorcePropertyDivisionRatio')}/> Spouse 2
                </Padding20Box>
              </FormGroup>
            </div>
          }
          {currentPage == 5 &&
            <div>
              <h2>Summary and Signing</h2>
              
              <h3>Spouse 1</h3>
              <div>{inputs.spouse1Name}</div>
              <div>{inputs.spouse1Address}</div>
              
              <h3>Spouse 2</h3>
              <div>{inputs.spouse2Name}</div>
              <div>{inputs.spouse2Address}</div>
              
              <h3>Will all property owned BEFORE the marriage remain separate property?</h3>
              {inputs.joinPropertyBeforeMarriage ? 'Yes': 'No'}

              <h3>Will property acquired AFTER the marriage ceremony also remain separate property?</h3>
              {inputs.joinPropertyAfterMarriage ? 'Yes': 'No'}

              <h3>Property Division After Marriage</h3>
              {inputs.divorcePropertyDivisionRatio} percent goes to Spouse 1<br />{100 - inputs.divorcePropertyDivisionRatio} percent goes to Spouse 2

              <br/><br/>
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
