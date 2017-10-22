import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageContainer, GreenButton } from '../../components/elements'
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
import { getActiveMaritalAgreement } from './DashboardActions'


const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps!');
  console.log(state);
  return { web3: state.web3 }
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

  render() {
    const { authData } = this.props;
    console.log(authData);
    const data = [
      { x: 1, y: 5 },
      { x: 2, y: 3 },
      { x: 3, y: 2 },
      { x: 4, y: 5 },
      { x: 5, y: 4 }
    ]
    //TODO: check if the user have married
    const foundMarriageAgreement = false
    return(
      <main>
        <PageContainer>
          {foundMarriageAgreement &&
            <div>
              <h1>Dashboard</h1>
              <p><strong>Hello, {this.props.authData.name}!</strong> here's your status</p>
              <h2>Family Wealth</h2>
              <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="x"/>
                <YAxis/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="x" stroke="#8884d8" />
                <Line type="monotone" dataKey="y" stroke="#82ca9d" />
              </LineChart>
              {/* Married to ... for x years */}
            </div>
          }
          {!foundMarriageAgreement &&
            <div style={{ textAlign: 'center' }}>
              <h1>Your family is not set up yet</h1>
              <GreenButton>Add Prenup/Postnup Agreement</GreenButton>
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
