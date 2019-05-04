import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, TouchableOpacity, Picker } from 'react-native';
import { Container, Content, Header, Left, Body, Icon, Button, Item, Form, Right, Input, DatePicker, Radio } from 'native-base'
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationService from '../NavigationService';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColorOld: '#24314b',
            backgroundColorPassword: '#24314b',
            backgroundColorConfirm: '#24314b',
            password:'',
            password_confirmation:'',
            old_password:''
        };

    }
    updateValue(text, field) {
        if (field == 'password') {
            this.setState({
                password: text,
                backgroundColorOld: '#24314b',
            })
        } else if (field == 'password_confirmation') {
            this.setState({
                password_confirmation: text,
                backgroundColorPassword: '#24314b',
            })
        } else if (field == 'old_password') {
            this.setState({
                old_password: text,
                backgroundColorConfirm: '#24314b',
            })
        }
        
    }
    ///////////////////////Form Submtion////////////////////////
    submit() {
        let formData = {}
        formData.code = this.props.navigation.getParam('code') ,
        formData.email = this.props.navigation.getParam('email') ,
        formData.password = this.state.password ,
        formData.password_confirmation = this.state.password_confirmation 
        var url = 'https://drabraj.com/Apis/reset/update';
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
                    NavigationService.navigate('DrawerNavigator');
                } else { 
                    this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                }
            })
            .catch(error => {
                //  console.warn('error');
            });
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
                                    <Image source={require('./img/icon/19.png')} style={{ width: 100, height: 100, margin: 30, alignSelf: 'center' }} />
                                    <Text style={{ fontSize: 25, color: '#e8ca75', alignSelf: 'center' ,fontFamily:"Cocon® Next Arabic-Light"}}>تغيير كلمة السر </Text>
                                </View>
                                <Form style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', padding: 10 }}>
                                    <Item>
                                        <Input secureTextEntry={true} style={{fontFamily:'STV', color:'#fff', backgroundColor: this.state.backgroundColorPassword}} placeholder="كلمة السر الجديده" 
                                        onChangeText={(text) => this.updateValue(text, 'password')}/>
                                        <Image source={require('./img/icon/2.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Item>
                                        <Input secureTextEntry={true} style={{fontFamily:'STV',color:'#fff', backgroundColor: this.state.backgroundColorConfirm}} placeholder="تأكيد كلمة السر الجديده"
                                        onChangeText={(text) => this.updateValue(text, 'password_confirmation')} />
                                        <Image source={require('./img/icon/9.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Button onPress={() => this.submit()}
                                        style={{ alignContent: 'center', width: 200, backgroundColor: '#e93a59', alignSelf: 'center', padding: 20, borderRadius: 8, margin: 20 }}>
                                        <Image source={require('./img/icon/21.png')} style={{ width: 20, height: 20, margin: 3 }} />
                                        <Text style={{fontFamily:'STV', fontSize: 20, color: '#fff', alignSelf: 'center', textAlign: 'center' }} >تغيير </Text>
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

