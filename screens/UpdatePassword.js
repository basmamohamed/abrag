import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, AsyncStorage, Picker } from 'react-native';
import { Container, Content, Header, Left, Body, Icon, Button, Item, Form, Right, Input, DatePicker, Radio } from 'native-base'
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationService from '../NavigationService';

export default class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColorOld: '#24314b',
            backgroundColorPassword: '#24314b',
            backgroundColorConfirm: '#24314b',
            api_token: '',
            password: '',
            password_confirmation: '',
            old_password: ''
        };
    }
    
    async componentDidMount() {
        let api_token = await AsyncStorage.getItem('api_token');
        this.setState({ api_token: api_token  })
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
        formData.code = this.props.navigation.getParam('code'),
            formData.email = this.props.navigation.getParam('email'),
            formData.api_token = this.state.api_token,
            formData.password = this.state.password,
            formData.password_confirmation = this.state.password_confirmation
        formData.old_password = this.state.old_password
        // console.warn(formData);
        if (formData.old_password == "", formData.password == "" || formData.password_confirmation == "" || formData.password_confirmation == "" !== formData.password == "") {
            this.refs.toast.show("please complete the form", DURATION.LENGTH_LONG)
            if (formData.old_password == "") {
                this.setState({ backgroundColorOld: "#660000" })
            }
            if (formData.password_confirmation == "") {
                this.setState({ backgroundColorConfirm: "#660000" })
            }
            if (formData.password == "") {
                this.setState({ backgroundColorPassword: "#660000" })
            }
        } else {
            var url = 'https://drabraj.com/Apis/profile/reset/password?';
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(formData), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                        this.refs.toast.show(response.message, DURATION.LENGTH_LONG)
                })
                .catch(error => {
                    // this.refs.toast.show(error, DURATION.LENGTH_LONG)
                });
        }
    }
    /////////////////////////////////////////////////////////////////////
    render() {
        return (
            <Container>
                 <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                    <View style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                        </Button>
                    </View>
                    <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV' }}>
                        الملف الشخصي
                    </Text></View>
                </Header>
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
                                    <Image source={require('./img/icon/19.png')} style={{ width: 130, height: 130, margin: 30, alignSelf: 'center' }} />
                                    <Text style={{ fontSize: 25, color: '#e8ca75', alignSelf: 'center', fontFamily: "Cocon® Next Arabic-Light" }}>تغيير كلمة السر </Text>
                                </View>
                                <Form style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', padding: 10 }}>
                                    <Item>
                                        <Input secureTextEntry={true} style={{ fontFamily: 'STV', color: '#fff', backgroundColor: this.state.backgroundColorOld }} placeholder="كلمة السر القديمه"
                                            onChangeText={(text) => this.updateValue(text, 'old_password')} />
                                        <Image source={require('./img/icon/2.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Item>
                                        <Input secureTextEntry={true} style={{ fontFamily: 'STV', color: '#fff', backgroundColor: this.state.backgroundColorPassword }} placeholder="كلمة السر الجديده"
                                            onChangeText={(text) => this.updateValue(text, 'password')} />
                                        <Image source={require('./img/icon/2.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Item>
                                        <Input secureTextEntry={true} style={{ fontFamily: 'STV', color: '#fff', backgroundColor: this.state.backgroundColorConfirm }} placeholder="تأكيد كلمة السر الجديده"
                                            onChangeText={(text) => this.updateValue(text, 'password_confirmation')} />
                                        <Image source={require('./img/icon/9.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Button onPress={() => this.submit()}
                                        style={{ alignContent: 'center', width: 200, backgroundColor: '#e93a59', alignSelf: 'center', padding: 20, borderRadius: 8, margin: 20 }}>
                                        <Image source={require('./img/icon/21.png')} style={{ width: 20, height: 20, margin: 3 }} />
                                        <Text style={{ fontFamily: 'STV', fontSize: 20, color: '#fff', alignSelf: 'center', textAlign: 'center' }} >تغيير </Text>
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
