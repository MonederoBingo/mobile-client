'use strict';

import React, {Component} from 'react';
import AuthService from './AuthService';
import {
  Text,
  View,
  ListView,
  Image,
} from 'react-native';
import moment from 'moment';


export default class PushPayload extends Component < {} > {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <Text>Hello there</Text>
      </View>
    );
  }
}
