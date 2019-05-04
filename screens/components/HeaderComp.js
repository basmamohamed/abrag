import React, { Component } from 'react';
import { Header, Button, Text } from 'native-base';
import { Image, View } from 'react-native'
 
export default class HeaderComp extends Component {
  render() {
    return (
      <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
        <View style={{ flex: 1 }}>
          <Button transparent onPress={this.props.opendrawer}>
            <Image source={require('../img/icon/24.png')} style={{ width: 32, height: 32, alignSelf: 'flex-end' }} />

          </Button>
        </View>
        <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 10 }}>
          {this.props.title}
        </Text></View>
        <Button transparent   style={{ flex: 1 }}><Image source={this.props.img} style={{ width: 32, height: 32, }} /></Button>
        
      </Header>

    );
  }
}