'use strict';

import React, {Component} from 'react';
import AuthService from './AuthService';
import {
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  StyleSheet
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
        <View style= {{
            padding: 20,
            borderColor: '#D7D7D7',
            borderBottomWidth: 1,
            backgroundColor: '#fff'
          }}>
          <Text style={{
              fontSize: 20,
              fontWeight: "600",
              paddingTop: 30
            }}>
            {rowData.full_name}
          </Text>
          <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              margingBottom: 20,
            }}>
             <View style={styles.repoCell}>
               <Text style={styles.repoCellLabel}>
                 {rowData.stargazers_count} stars
               </Text>
               <Text style={styles.repoCellLabel}>
                 {rowData.forks} forks
               </Text>
               <Text style={styles.repoCellLabel}>
                 {rowData.open_issues} issues
               </Text>
             </View>
          </View>
        </View>
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

const styles = StyleSheet.create({
  repoCell: {
    width: 100,
    alignItems: 'center'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
  repoCellLabel: {
    textAlign: 'center'
  }
});
