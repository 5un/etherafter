import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Splash, InnerSplash, PageContainer, Button, InlineImg } from '../../components/elements'
import { getStorageData, setStorageData } from './HomeActions'

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps!');
  console.log(state);
  return { web3: state.web3 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onWeb3Initialized: () => {
      console.log('onWeb3Initialized')
      dispatch(getStorageData())
    },
    setStorageData: (x) => {
      dispatch(setStorageData(x))
    },
  }
}

class Home extends Component {

  componentDidMount() {
    //this.props.onPageLoad();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.web3 !== nextProps.web3)
    this.props.onWeb3Initialized();
  }

  handleBumpNumberButtonClicked() {
    this.props.setStorageData(4);
  }

  render() {
    return(
      <main>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <Splash>
              <InnerSplash>
                <h1>Live Happily <i>Etherafter</i></h1>
                <p>Etherafter eases family financial contracts <br/>in the age of cryptocurrencies.</p>
                <br />
                <Button><InlineImg role="presentation" src="/images/icon-uport.png" height="20"/> Get Started</Button>
              </InnerSplash>
            </Splash>
            <PageContainer>
              <h2>UPort Authentication</h2>
              <p>This particular box comes with UPort autentication built-in.</p>
              <p>NOTE: To interact with your smart contracts through UPort's web3 instance, make sure they're deployed to the Ropsten testnet.</p>
              <p>In the upper-right corner, you'll see a login button. Click it to login with UPort. There is an authenticated route, "/dashboard", that displays the UPort user's name once authenticated.</p>
              <h3>Redirect Path</h3>
              <p>This example redirects home ("/") when trying to access an authenticated route without first authenticating. You can change this path in the failureRedriectUrl property of the UserIsAuthenticated wrapper on <strong>line 9</strong> of util/wrappers.js.</p>
              <h3>Accessing User Data</h3>
              <p>Once authenticated, any component can access the user's data by assigning the authData object to a component's props.</p>
              <pre>
                <code>
                  {"// In component's constructor."}<br/>
                  {"constructor(props, { authData }) {"}<br/>
                  {"  super(props)"}<br/>
                  {"  authData = this.props"}<br/>
                  {"}"}<br/><br/>
                  {"// Use in component."}<br/>
                  {"Hello { this.props.authData.name }!"}
                </code>
              </pre>
              <h3>Further Reading</h3>
              <p>The React/Redux portions of the authentication fuctionality are provided by <a href="https://github.com/mjrussell/redux-auth-wrapper" target="_blank">mjrussell/redux-auth-wrapper</a>.</p>
              <button onClick={this.handleBumpNumberButtonClicked.bind(this)}>Bump Family Number</button>
            </PageContainer>
          </div>
        </div>
      </main>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
