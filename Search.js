'use strict';

import React, {Component} from 'react';
import AuthService from './AuthService';
import SearchResults from './SearchResults';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

export default class Search extends Component < {} > {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={(text) => this.setState({
          searchQuery: text
        })} style={styles.input} placeholder="Search Query"/>

        <TouchableHighlight onPress={this.onSearchPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Search
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  onSearchPressed() {
    this.props.navigator.push({
      component: SearchResults,
      title: 'results',
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 100,
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
});
