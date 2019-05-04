

import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, TouchableHighlight, Modal, AsyncStorage, TextInput } from 'react-native';
import { Container, Content, Header, Left, Body, Icon, Button, Item, Form, DatePicker, Radio } from 'native-base'
import NavigationService from '../NavigationService';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class ConfirmServices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            Resp: 0,
            api_token: '',
            code: '',
            user_id: '',
            backgroundColorCode: '#222544',
            price: this.props.navigation.getParam('price'),
            reports: this.props.navigation.getParam('reports'),
            title: this.props.navigation.getParam('title'),
            user_service_id: this.props.navigation.getParam('user_service_id'),
            service_id: this.props.navigation.getParam('service_id'),
            new_code: '',
            coupon_id: ''
        };
    }
    componentDidMount() {
        { this.LoadInitialState() }
    }
    LoadInitialState = async () => {
        let value = await AsyncStorage.getItem('user_id');
        let api_token = await AsyncStorage.getItem('api_token');
        this.setState({ api_token: api_token, user_id: value, code: '' })
    }

    updateValue(text, field) {
        if (field == 'code') {
            this.setState({
                code: text,
                new_code: text,
                backgroundColorCode: '#222544'
            })
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    ///////////////////////Form Submtion////////////////////////
    submit() {
        let formData = {}
        formData.user_id = this.state.user_id,
            formData.service_id = this.state.service_id,
            formData.code = this.state.code,
            formData.api_token = this.state.api_token
        // console.warn(formData);
        if (formData.code == "") {
            this.setModalVisible(this.state.modalVisible);
            this.setState({ backgroundColorCode: '#660000' });
            this.refs.toast.show('Please Insert Valid Cobon Number', DURATION.LENGTH_LONG);
        } else {
            this.setModalVisible(!this.state.modalVisible);
            var url = 'https://drabraj.com/Apis/coupons';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    // console.warn(response);
                    this.setState({
                        Resp: response.status,
                    });
                    if (this.state.Resp == 400) {
                        this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                        this.setState({
                            code: 'كوبون غير صالح',
                        });
                    } else if (this.state.Resp == 200) {
                        this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                        this.setState({
                            code: this.state.new_code,
                            price: response.price,
                            coupon_id: response.coupon_id
                        });
                    }
                })
                .catch(response => {
                    // this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                });
        }
    }
    /////////////////////////////////////////////////////////////////////
    GoToPaymentWay() {
        NavigationService.navigate('PaymentWay', {
            reports: this.state.reports,
            title: this.state.title,
            price: this.state.price,
            coupon_id: this.state.coupon_id,
            user_id: this.state.user_id,
            api_token: this.state.api_token,
            service_id: this.state.service_id,
            user_service_id: this.state.user_service_id
        })
    }
    render() {
        // console.warn(this.state.);
        return (
            <Container>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%' }}>
                    {/* //////////////////////////// */}
                    <Toast
                        ref="toast"
                        style={{ backgroundColor: '#fff' }}
                        position='top'
                        positionValue={5}
                        fadeInDuration={400}
                        fadeOutDuration={7000}
                        opacity={0.8}
                        textStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
                    />
                    {/* ///////////////////////////// */}
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
                        <View style={{ flexDirection: 'row-reverse', width: '100%', padding: 20, borderRadius: 20 }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 20 }}>

                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 10,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        إسـم الخدمـة
                                     </Text>
                                    <Text
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#566573',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#E74C3C', padding: 10
                                        }} >
                                        تحليل انماط الشخصيه
                                    </Text>
                                </View>

                                <Button
                                    onPress={() => this.setModalVisible(true)}
                                    style={{
                                        margin: 20,
                                        justifyContent: 'center', backgroundColor: '#eee',
                                        borderRadius: 15,
                                        padding: 20, width: '90%',
                                        alignSelf: 'center'
                                    }}>

                                    <Text style={{ color: '#1abcd6' }}>
                                        ادخل كوبون الخصــم
                                    </Text>
                                </Button>

                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 10,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        تم إدخال كوبون
                                     </Text>
                                    <Text
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#566573',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#E74C3C', padding: 10
                                        }} >
                                        {this.state.code}
                                    </Text>
                                </View>

                                <View style={{
                                    flexDirection: 'column-reverse',
                                    width: "90%",
                                    margin: 10,
                                    alignSelf: 'center'
                                }}>
                                    <Text
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#566573',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#E74C3C', padding: 10
                                        }} >
                                        {this.state.price}
                                    </Text>
                                    <Text style={{ flex: 2, margin: 10, textAlign: "center", color: '#19acc7' }} >
                                        الـمجمــــوع
                                     </Text>
                                </View>

                                <Button
                                    onPress={() => this.GoToPaymentWay()}
                                    style={{
                                        margin: 20,
                                        justifyContent: 'center', backgroundColor: '#eee',
                                        borderRadius: 15,
                                        padding: 20, width: '90%',
                                        alignSelf: 'center'
                                    }}>

                                    <Text style={{ color: '#1abcd6' }}>
                                        إتمام عملية الشراء
                                    </Text>
                                </Button>
                            </ImageBackground>
                        </View>
                    </Content>
                </ImageBackground>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={{ width: "80%", alignSelf: 'center', margin: 20, marginTop: 150, padding: 10, borderRadius: 10, backgroundColor: "#fff" }}>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableHighlight
                                style={{ margin: 20, alignSelf: 'flex-end' }}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Icon name="times" type='FontAwesome5' style={{ color: '#333' }} />

                            </TouchableHighlight>
                        </View>
                        <View>
                            <Text style={{ color: '#1abcd6', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>أدخل كوبون الخصم</Text>
                            <TextInput onChangeText={(text) => this.updateValue(text, 'code')}
                                style={{ backgroundColor: this.state.backgroundColorCode, marginVertical: 20, width: '100%', textAlign: 'center', color: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#333' }} />
                            <Button
                                onPress={() => this.submit()}
                                style={{
                                    margin: 10,
                                    justifyContent: 'center', backgroundColor: '#1abcd6',
                                    borderRadius: 20,
                                    padding: 50, width: '100%',
                                    alignSelf: 'center',
                                }}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, }}>
                                    تـــم
                                    </Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </Container >
        );
    }
}

