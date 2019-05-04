

import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, TouchableOpacity, Picker, TextInput } from 'react-native';
import { Container, Content, Header, Left, Body, Icon, Button, Item, Form, Right, Input, DatePicker, Radio } from 'native-base'
import NavigationService from '../NavigationService';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class PaymentWay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            api_token: '',
            coupon_id: '',
            offer_id: '',
            price: '',
            service_id: '',
            type: '',
            user_service_id: '',
            Resp: 0,
            reports:[],
            title:''
        };

    }
    componentDidMount() {
        let reports = this.props.navigation.getParam('reports');
        let user_id = this.props.navigation.getParam('user_id');
        let api_token = this.props.navigation.getParam('api_token');
        let coupon_id = this.props.navigation.getParam('coupon_id');
        let offer_id = this.props.navigation.getParam('offer_id');
        let title =  this.props.navigation.getParam('title');
        let price = this.props.navigation.getParam('price');
        let service_id = this.props.navigation.getParam('service_id');
        let user_service_id = this.props.navigation.getParam('user_service_id');
        // console.warn(user_id);
        this.setState({
            api_token: api_token,
            user_id: user_id,
            coupon_id: coupon_id,
            offer_id: offer_id,
            price: price,
            reports: reports,
            title:title,
            service_id: service_id,
            user_service_id: user_service_id
        })
    }

    Fawry() {
        let formData = {}
            formData.user_id = this.state.user_id,
            formData.api_token = this.state.api_token,
            formData.coupon_id = this.state.coupon_id,
            formData.offer_id = this.state.offer_id,
            formData.price = this.state.price,
            formData.service_id = this.state.service_id,
            formData.type = 'fawry',
            formData.user_service_id = this.state.user_service_id
        // console.warn(formData);
        var url = 'https://drabraj.com/Apis/payment';
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
                } else if (this.state.Resp == 200) {
                    // this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                    var url = 'https://drabraj.com/Apis/payment';
                    fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(formData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                        .then(response => {
                            console.warn(response);
                        })
                        .catch(response => {
                        });
                }
            })
            .catch(response => {
                this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
            });
    }

    Masary(id) {
        if (id == 100) {
            NavigationService.navigate('MasaryForm', {
                title2 : 'مصــــــــارى',
                reports: this.state.reports,
                price: this.state.price,
                coupon_id: this.state.coupon_id,
                title : this.state.title,
                user_id: this.state.user_id,
                api_token: this.state.api_token,
                service_id: this.state.service_id,
                user_service_id: this.state.user_service_id
            })
        } else {
            NavigationService.navigate('MasaryForm', {
                reports: this.state.reports,
                title2 : 'أمـــــــــــان',
                title : this.state.title,
                price: this.state.price,
                coupon_id: this.state.coupon_id,
                user_id: this.state.user_id,
                api_token: this.state.api_token,
                service_id: this.state.service_id,
                user_service_id: this.state.user_service_id
            })
        }
    }

    render() {
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
                            طريقـــة الدفــــع
                        </Text></View>
                    </Header>
                    <Content >
                        <View style={{ flexDirection: 'row-reverse', width: '100%', padding: 20, borderRadius: 10 }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 10, height: '100%', }}>
                                <Text
                                    style={{ color: '#d4bb70', margin: 50, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
                                >اختر طريقة الدفع  </Text>

                                {/* ////////////////////////Fawry////////////////////////// */}
                                <TouchableOpacity onPress={() => this.Fawry()} >
                                    <View style={{
                                        flexDirection: 'row-reverse',
                                        width: "90%",
                                        padding: 5,
                                        margin: 10,
                                        alignSelf: 'center',
                                        borderRadius: 30,
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        backgroundColor: '#fff',
                                        justifyContent: 'center'
                                    }}>
                                        <Image source={require('./img/icon/65.png')} style={{ width: 50, height: 50 }} />
                                    </View>
                                </TouchableOpacity>
                                {/* ////////////////////////Aman////////////////////////// */} 
                                <TouchableOpacity onPress={() => this.Masary(100)} >
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    padding: 5,
                                    margin: 10,
                                    alignSelf: 'center',
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    backgroundColor: '#fff',
                                    justifyContent: 'center'
                                }}>
                                    <Image source={require('./img/icon/65.png')} style={{ width: 50, height: 50 }} />
                                </View>
                                </TouchableOpacity>
                                {/* ////////////////////////Masary////////////////////////// */}
                                <TouchableOpacity onPress={() => this.Masary(200)} >
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    padding: 5,
                                    margin: 10,
                                    alignSelf: 'center',
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    backgroundColor: '#fff',
                                    justifyContent: 'center'
                                }}>
                                    <Image source={require('./img/icon/65.png')} style={{ width: 50, height: 50 }} />
                                </View>
                                </TouchableOpacity>

                            </ImageBackground>
                        </View>
                    </Content>
                </ImageBackground>
            </Container >
        );
    }
}

