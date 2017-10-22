import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _ from 'lodash'
import { PageContainer, PrimaryButton, SecondaryButton, Row, Col, H1, H2, H3, H4, BigNumber } from '../../components/elements'
import { LineChart, XAxis, YAxis, CartesianGrid, Line, AreaChart, Area, Tooltip } from 'recharts'
import { getActiveMaritalAgreement } from './DashboardActions'
import Avatar from 'react-avatar'

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps!');
  console.log(state);
  return { 
    web3: state.web3,
    family: state.family,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoaded: () => {
      console.log('onWeb3Initialized')
      dispatch(getActiveMaritalAgreement())
    }
  }
}

class Dashboard extends Component {
  
  componentDidMount() {
    this.props.onPageLoaded();
  }

  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  findFirstName(str) {
    if(str == undefined) return '';
    return _.get(str.split(' '), '0', '');
  }

  render() {
    const { authData, family } = this.props;
    console.log(authData);
    const data = [
      { x: 'May', ETH: 20000 },
      { x: 'Jun', ETH: 27010 },
      { x: 'Jul', ETH: 20401 },
      { x: 'Aug', ETH: 21003 },
      { x: 'Sep', ETH: 24058 },
      { x: 'Oct', ETH: 28599 }
    ]

    const mockDependents = [
      {
        "name": "Eve",
        "status": "Child"
      },
      {
        "name": "Eric",
        "status": "Child of Spouse 1"
      }
    ]
    //TODO: check if the user have married
    const foundMarriageAgreement = !_.isNull(family.maritalAgreement)
    const username = _.get(authData, 'name', '')
    const spouse1FirstName = this.findFirstName(_.get(family, 'maritalAgreement.spouse1Name'));
    const spouse2FirstName = this.findFirstName(_.get(family, 'maritalAgreement.spouse2Name'));
    return(
      <main>
        <PageContainer>
          {foundMarriageAgreement &&
            <div>
              <h1>{spouse1FirstName} and {spouse2FirstName}'s Family</h1>
              <Row>
                <Col style={{ width: '60%' }}>
                  <H2>Net Wealth</H2>
                  <BigNumber>ETH 240,033.00</BigNumber>
                  <br />
                  <h2>Income</h2>
                  <AreaChart width={600} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="x" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="ETH" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                  </AreaChart>
                </Col>
                <Col style={{ width: '30%' }}>
                  <h2>People</h2>
                  <Row>
                    <Col>
                      <Avatar name="Ethan" round={true} size={50} />
                      <h4>{spouse1FirstName}</h4>
                    </Col>
                    <Col>
                      -----
                    </Col>
                    <Col>
                      <Avatar name="Emily" round={true} size={50} />
                      <h4>{spouse2FirstName}</h4>
                    </Col>
                  </Row>
                  <h3>Dependents / Beneficiaries</h3>
                  <div>
                    {_.map(mockDependents, dependent => (
                      <Row style={{ pading: '5px' }}>
                        <Col style={{ width: '240px' }}>
                          <H4>{dependent.name}</H4>
                          ({dependent.status})
                        </Col>
                        <Col>
                          <button>Details</button>
                        </Col>
                        
                      </Row>
                    ))}
                    
                  </div>
                  <br/><br/>
                  <PrimaryButton>+ Add Dependents</PrimaryButton>
                </Col>
              </Row>

              {/* Married to ... for x years */}
            </div>
          }
          {!foundMarriageAgreement &&
            <div style={{ textAlign: 'center' }}>
              <h1>Your family is not set up yet</h1>
              <Link to="/onboard">
                <PrimaryButton>Add Prenup/Postnup Agreement</PrimaryButton>
              </Link>
            </div>
          }
          
        </PageContainer>
      </main>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
