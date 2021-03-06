'use strict';

import React, {Component} from 'react';
import buffer from 'buffer';
import AuthService from './AuthService';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

export default class Login extends Component < {} > {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false
    }
  }
  render() {
    var errorCtrl = <View/>;
    if (!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        Verify username and password
      </Text>
    }
    if (!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        Unexpected issue
      </Text>
    }
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./images/alayor.png')}/>
        <Text style={styles.heading}>
          Github Browser
        </Text>
        <TextInput onChangeText={(text) => this.setState({username: text})} style={styles.input} placeholder="Github username"/>
        <TextInput onChangeText={(text) => this.setState({password: text})} style={styles.input} placeholder="Github password" secureTextEntry={true}/>

        <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Log In
          </Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicator animating={this.state.showProgress} size="large"/>
      </View>
    );
  }
  onLoginPressed() {
    console.log('Log in with ' + this.state.username);
    this.setState({showProgress: true});

    AuthService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(results);
      this.setState({showProgress: false});

      if(results.success && this.props.onLogin) {
        this.props.onLogin();
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 100,
    height: 100
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    width: 400,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
})
