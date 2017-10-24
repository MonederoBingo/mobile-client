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
      pushEvent: props.pushEvent
    }
  }
  renderRow(rowData) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',

        }}>
          <Text>{rowData.sha.substring(0, 6)} - {rowData.message}</Text>
        </View>
      );
  }
  render() {
    return (
      <View style={{
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <Image
          source={{uri: this.state.pushEvent.actor.avatar_url}}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
          }}
        />
        <Text style={{
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 20,
        }}>
          {moment(this.state.pushEvent.created_at).fromNow()}
        </Text>
        <Text>{this.state.pushEvent.actor.login}</Text>
        <Text>{this.state.pushEvent.payload.ref.replace('refs/heads/', '')}</Text>
        <Text>at {this.state.pushEvent.repo.name}</Text>
        <Text>{this.state.pushEvent.payload.commits.length} Commit(s)</Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}
