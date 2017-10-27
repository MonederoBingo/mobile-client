'use strict';

import React, {Component} from 'react';
import AuthService from './AuthService';
import {
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from 'react-native';

export default class SearchResults extends Component < {} > {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
      showProgress: true,
      searchQuery: props.searchQuery
    }
    this.doSearch.bind(this);
  }
  componentDidMount() {
    this.doSearch();
  }
  doSearch(){
    const url = "https://api.github.com/search/repositories?q=" +
       encodeURIComponent(this.state.searchQuery);
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          repositories: responseData.respositories,
          dataSource: this.state.dataSource
             .cloneWithRows(responseData.items)
        });
      })
      .finally(() => {
        this.setState({showProgress: false});
      });
  }
  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#ddd'
      >
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1
        }}>

        </View>
      </TouchableHighlight>
    );
  }
  render() {
    if(this.state.showProgress){
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <ActivityIndicator
            size="large"
            animating={true} />
        </View>
      );
    }
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
