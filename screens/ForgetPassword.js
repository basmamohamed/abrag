

import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, TouchableOpacity, Picker } from 'react-native';
import { Container, Content, Header, Left, Body, Icon, Button, Item, Form, Right, Input, DatePicker, Radio } from 'native-base'
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationService from '../NavigationService';

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#24314b',
            backgroundColorCode:'#24314b',
            email: '',
            code:''
        };
    }
    updateValue(text, field) {
        if (field == 'email') {
            this.setState({
                email: text,
                backgroundColor: '#24314b',
            })
        } else if (field == 'code') {
            this.setState({
                code: text,
                backgroundColorCode: '#24314b'
            })
        }
    }
    ///////////////////////Form Submtion////////////////////////
    submit() {
        let formData = {}
        formData.email = this.state.email
        // console.warn(formData);
    if (formData.email == "" || formData.code == "") {
        this.setState({backgroundColor:"#660000",backgroundColorCode:'#660000'})
    } else {
        var url = 'https://drabraj.com/Apis/reset/mail';
        fetch(url, {
            method: 'POST',  
            body: JSON.stringify(formData),  
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                // console.warn(response);
                if (response.status == 200) {
                    this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                    
                } else {
                    this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                }
            })
            .catch(error => {
                //  console.warn('error');
            });
    }
}

next(){
    if (this.state.email == "" || this.state.code == "") {
        this.setState({backgroundColor:"#660000",backgroundColorCode:'#660000'})
    } else { 
        NavigationService.navigate('ChangePassword', { email: this.state.email , code:this.state.code })
    }
}
/////////////////////////////////////////////////////////////////////
 
    render() {
        return (
            <Container>
                <ImageBackground source={require('./img/icon/bg1.png')} style={{ width: '100%', height: '100%' }}>
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
                    <Content >
                        <View style={{ flexDirection: 'row-reverse', width: '100%', padding: 20, borderRadius: 10 }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 10, height: 700 }}>
                                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                                    <Image source={require('./img/icon/20.png')} style={{ width: 100, height: 100, margin: 30, alignSelf: 'center' }} />
                                    <Text style={{ fontSize: 25, color: '#e8ca75', alignSelf: 'center', fontFamily:'Cocon® Next Arabic-Light'}}>هل نسيت كلمة المرور؟</Text>
                                    <Text note style={{ fontSize: 12, color: '#aaa', alignSelf: 'center',fontFamily:'STV' }}>سوف يتم ارسال لك كود على البريد الالكترونى</Text>
                                </View>
                                <Form style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', padding: 10 }}>
                                    <Item  >
                                        <Input style={{ color:'#fff', backgroundColor: this.state.backgroundColor , fontFamily:'STV'}}
                                        onChangeText={(text) => this.updateValue(text, 'email')} value={this.state.mail} placeholder="ادخل البريد الالكترونى" />
                                        <Image source={require('./img/icon/1.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Button onPress={() => this.submit()}
                                        style={{ backgroundColor: '#e93a59', alignSelf: 'center', padding: 20, borderRadius: 8, margin: 20 }}>
                                        <Image source={require('./img/icon/25.png')} style={{ width: 20, height: 20, margin: 3 }} />
                                        <Text style={{ color: '#fff' ,fontFamily:'STV'}}>ارسال </Text>
                                    </Button>
                                </Form>
                                <Form style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', padding: 10 }}>
                                    <Item  >
                                        <Input  style={{ color:'#fff', backgroundColor: this.state.backgroundColorCode,fontFamily:'STV'}} 
                                        onChangeText={(text) => this.updateValue(text , 'code')} placeholder="ادخل الكود المرسل فى البريد الالكترونى" />
                                        <Image source={require('./img/icon/2.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Button onPress={() => this.next()}
                                        style={{ backgroundColor: 'green', alignSelf: 'center', padding: 20, borderRadius: 8, margin: 20 }}>
                                        <Image source={require('./img/icon/45.png')} style={{ width: 20, height: 20, margin: 3 }} />
                                        <Text style={{ color: '#fff',fontFamily:'STV' }}>تأكيد </Text>
                                    </Button>
                                </Form>
                            </ImageBackground>
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

