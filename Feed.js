'use strict';

import React, {Component} from 'react';
import AuthService from './AuthService';
import {
  Text,
  View,
  ListView
} from 'react-native';


export default class Feed extends Component < {} > {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(['A', 'B', 'C'])
    }
    this.fetchFeed.bind(this);
  }
  componentDidMount() {
    this.fetchFeed();
  }
  fetchFeed(){
    AuthService.getAuthInfo((err, authInfo) => {
        var url = 'https://api.github.com/users/'
           + authInfo.user.login
           + '/received_events';

        fetch(url, {
          headers: authInfo.header
        })
        .then((response) => response.json())
        .then((responseData) => {
            var feedItems = responseData.filter((ev) => ev.type == 'PushEvent');
            this.setState({
              dataSource: this.state.dataSource
                  .cloneWithRows(feedItems)
            });
        })
      });
  }
  renderRow(rowData) {
    return <Text style={{
      color: '#333',
      backgroundColor: '#fff',
      alignSelf: 'center',
    }}>
      {rowData.actor.login}
    </Text>
  }
  render() {
    return (
      <View style={{
         flex: 1,
         justifyContent: 'flex-start',
         paddingTop: 30
       }}>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}