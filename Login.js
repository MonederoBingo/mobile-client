'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

export default class Login extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo}
           source={require('./images/alayor.png')} />
        <Text style={styles.heading}>
          Github Browser
        </Text>
        <TextInput
          onChangeText={(text) => this.setState({username: text})}
          style={styles.input}
          placeholder="Github username" />
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          style={styles.input}
           placeholder="Github password"
           secureTextEntry={true}/>

         <TouchableHighlight
           onPress={this.onLoginPressed.bind(this)}
           style={styles.button}>
           <Text style={styles.buttonText}>
             Log In
           </Text>
         </TouchableHighlight>
      </View>
    );
  }
  onLoginPressed() {
    console.log('Log in with ' + this.state.username);
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
  }
})
