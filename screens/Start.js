
import React, { Component } from 'react';
import { ImageBackground , Left , Text, View, TouchableOpacity } from 'react-native';
import { Container, Content } from 'native-base';
import NavigationService from '../NavigationService';
export default class Start extends Component {
    render() {
        return (
            <Container>
                 {/* DrawerNavigator */}
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center' }}>
                    <Content>
                        <View style={{marginTop:100}}>
                            <Text style={{margin:30 ,color: '#f9d778',fontFamily:'Cocon® Next Arabic-Light', fontSize: 40, textAlign: 'center', fontWeight: 'bold' }}>مرحبا بك</Text>

                            <TouchableOpacity onPress={() => NavigationService.navigate('DrawerNavigator')} >
                                <View source={require('./img/icon/logo.png')} style={{ width: 200, height: 200, alignSelf: 'center' }} >
                                    <ImageBackground
                                        source={require('./img/icon/42.png')}
                                        style={{ justifyContent: 'center', width: "100%", height: '100%' }}>
                                        <Text
                                            style={{
                                                color: "#fff", fontSize: 40, fontWeight: 'bold',
                                                textAlign: 'center',fontFamily:'Cocon® Next Arabic-Light'
                                            }}>إبدأ</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

