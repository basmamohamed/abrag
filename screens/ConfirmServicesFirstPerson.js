

import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { Container, Content, Header, Left, Body, Icon, Button, Item, Form, Right, Input, DatePicker, Radio } from 'native-base'
import NavigationService from '../NavigationService';

export default class ConfirmServicesFirstPerson extends Component {

    render() {
        let name = this.props.navigation.getParam('name');
        let date = this.props.navigation.getParam('date');
        let address = this.props.navigation.getParam('address');
        let gender = this.props.navigation.getParam('gender');

        let price = this.props.navigation.getParam('price');
        let reports = this.props.navigation.getParam('reports');

        let name2 = this.props.navigation.getParam('name1');
        let date2 = this.props.navigation.getParam('date1');
        let address2 = this.props.navigation.getParam('address1');
        let gender2 = this.props.navigation.getParam('gender1');

        let user_id = this.props.navigation.getParam('user_id');
        let api_token = this.props.navigation.getParam('api_token');
        let user_service_id = this.props.navigation.getParam('user_service_id');
        let service_id = this.props.navigation.getParam('service_id');

        // console.warn(name2);console.warn(date2);console.warn(address2);console.warn(gender2);
        return (
            <Container>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%' }}>
                    <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                        <View style={{ flex: 1 }}>
                            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                                <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                            </Button>
                        </View>
                        <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18 }}>
                            الــخـــــدمات
                        </Text></View>
                    </Header>
                    <Content >
                        <View style={{ flexDirection: 'row-reverse', width: '100%', padding: 20, borderRadius: 10 }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 10 }}>
                                <Text
                                    style={{ color: '#d4bb70', margin: 20, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
                                >تأكيد البيانات </Text>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        نوع الخدمه
                                    </Text>
                                    <Text
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#fff',
                                            padding: 10
                                        }} >
                                        تحليل توافقات عاطفية
                                        </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        الاسم
                                    </Text>
                                    <Text placeholderTextColor="#FFF"
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#fff',
                                            padding: 10
                                        }} >
                                        {name}
                                    </Text>

                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        تاريخ الميلاد
                                    </Text>
                                    <Text
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#fff', padding: 10
                                        }} >
                                        {date}
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        النوع
                                    </Text>
                                    <Text
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#fff', padding: 10
                                        }} >
                                        {gender}
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        العنوان
                                    </Text>
                                    <Text
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#fff', padding: 10
                                        }} >
                                        {address}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row-reverse', margin: 5 }}>
                                    <Button onPress={() => NavigationService.navigate('ServiceTwice')}
                                        style={{ flex: 1, margin: 10, justifyContent: 'center', backgroundColor: '#d22859', borderRadius: 15 }}><Text style={{ color: '#fff' }}>تعديل البيانات</Text>
                                    </Button>
                                    <Button onPress={() => NavigationService.navigate('ServiceType')}
                                        style={{ flex: 1, margin: 10, justifyContent: 'center', backgroundColor: '#1abcd6', borderRadius: 15 }}><Text style={{ color: '#fff' }}> اضافة خدمات اخرى</Text>
                                    </Button>
                                </View>

                                <Button
                                    onPress={() => NavigationService.navigate('ConfirmServicesSecoundPerson', {
                                        name2: name2, date2: date2, address2: address2, gender2: gender2,
                                        price: price,
                                        reports: reports,
                                        user_id:user_id,
                                        api_token:api_token,
                                        user_service_id:user_service_id,
                                        service_id:service_id
                                    })}
                                    style={{ backgroundColor: 'green', alignSelf: 'center', padding: 20, borderRadius: 8, margin: 20 }}>
                                    <Image source={require('./img/icon/3.png')} style={{ width: 20, height: 20, margin: 3 }} />
                                    <Text style={{ color: '#fff' }}> متـــابعه </Text>
                                </Button>
                            </ImageBackground>
                        </View>
                    </Content>
                </ImageBackground>
            </Container >
        );
    }
}

