import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, Form, Icon, Button, Item, Input } from 'native-base'
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationService from '../NavigationService';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

import LinkedInSDK from 'react-native-linkedin-sdk';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#222544',
            backgroundColorPassword: '#222544',
            email: '',
            password: '',
            Resp: 0,
            user_id: "",
            api_token: "",
            socialName: '',
            providerID: '',
            provider: ''
        };
    }
    async LinkedInLogin() {
        const token = await LinkedInSDK.signIn({
            clientID: '78jsrbwa0hy686',
            clientSecret: 'dvTjIIQOI4qGdLPO',
            // iOS, Android (Required)
            scopes: [
                'r_basicprofile',
                'r_emailaddress',
            ],

        });

        const profile = await LinkedInSDK.getRequest('https://api.linkedin.com/v1/people/~?(email,first-name,last-name)' + token.accessToken);

        console.warn(profile);
    }

    componentDidMount() {
        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId generated from Firebase console
            webClientId:
                '1063643439573-a6p7df3s826lqkvsv3q1329m4sehi3q4.apps.googleusercontent.com',
        });
    }

    googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            this.setState({
                providerID: userInfo.user.id, provider: 'google',
                email: userInfo.user.email, socialName: userInfo.user.givenName + ' ' + userInfo.user.familyName
            });
            { this.SocialLogin() }
        } catch (error) {
            console.warn('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.warn('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.warn('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.warn('Play Services Not Available or Outdated');
            } else {
                console.warn('Some Other Error Happened');
            }
        }
    };

    fbLogin = () => {
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            (result) => {
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        let accessToken = data.accessToken

               
                        fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + accessToken)
                            .then((response) => response.json())
                            .then((json) => {
                               this.setState({ socialName: json.name, providerID: json.id, provider: 'facebook', email: json.email })
                               if(json.email==null){
                                this.refs.toast.show('Email is invalid', DURATION.LENGTH_LONG);
                               }else{
                               {this.SocialLogin()}
                               }
                               
                            })
                            .catch(() => {
                                // console.warn('error');
                            })
                      
                    })
                }
            },
            (error) => {
                alert('Login fail with error: ' + error);
            }
        );
    }

    SocialLogin() {
        let formData = {}
        formData.email = this.state.email,
            formData.name = this.state.socialName,
            formData.provider = this.state.provider,
            formData.provider_id = this.state.providerID
        var url = 'https://drabraj.com/Apis/register/social';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                this.setState({
                    Resp: response.status,
                });
                if (this.state.Resp == 400) {
                    this.refs.toast.show('Please Insert Correct Information', DURATION.LENGTH_LONG);
                } else if (this.state.Resp == 200) {
                    AsyncStorage.setItem("user_id", JSON.stringify(response.id));
                    AsyncStorage.setItem("api_token", response.api_token);
                    AsyncStorage.setItem("logged", JSON.stringify(response.status));
                    NavigationService.replace('Start')

                }
            })
            .catch(response => {
                this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
            });
    }
    updateValue(text, field) {
        if (field == 'email') {
            this.setState({
                email: text,
                backgroundColor: '#222544'
            })
        } else if (field == 'password') {
            this.setState({
                password: text,
                backgroundColorPassword: '#222544'
            })
        }
    }

    ///////////////////////Form Submtion////////////////////////
    submit() {
        let formData = {}
        formData.email = this.state.email,
            formData.password = this.state.password
        if (formData.email == "" || formData.password == "") {
            this.setState({ backgroundColorPassword: "#660000", backgroundColor: "#660000" })
            this.refs.toast.show('Please Insert Correct Information', DURATION.LENGTH_LONG);
        } else {
            var url = 'https://drabraj.com/Apis/login?';
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
                        // user_id : JSON.stringify(response.id),
                        // api_token:response.api_token
                    });
                    if (this.state.Resp == 400) {
                        this.refs.toast.show('Please Insert Correct Information', DURATION.LENGTH_LONG);
                    } else if (this.state.Resp == 200) {
                        AsyncStorage.setItem("user_id", JSON.stringify(response.id));
                        AsyncStorage.setItem("api_token", response.api_token);
                        AsyncStorage.setItem("logged", JSON.stringify(response.status));
                        NavigationService.replace('Start'),
                            this.setState({
                                email: '',
                                password: ''
                            })
                    }
                })
                .catch(response => {
                    this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                });
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
                    <Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                            <Image source={require('./img/icon/login.png')} style={{ width: 150, height: 150, margin: 50 }} />
                        </View>

                        <Form style={{ width: '80%', alignSelf: 'center', justifyContent: 'center' }}>
                            <Item iconRight >
                                <Input style={{ color: '#fff', backgroundColor: this.state.backgroundColor }} placeholder="البريد الالكترونى"
                                    onChangeText={(text) => this.updateValue(text, 'email')} />
                                <Image source={require('./img/icon/1.png')} style={{ width: 25, height: 25 }} />
                            </Item>
                            <Item last>
                                <Input secureTextEntry={true} style={{ color: '#fff', backgroundColor: this.state.backgroundColorPassword }} placeholder="كلمة السر"
                                    onChangeText={(text) => this.updateValue(text, 'password')} />
                                <Image source={require('./img/icon/2.png')} style={{ width: 25, height: 25 }} />

                            </Item>
                            <Button onPress={() => this.submit()}
                                style={{ backgroundColor: '#ec3c59', alignSelf: 'center', padding: 20, borderRadius: 8, margin: 20 }}>
                                <Image source={require('./img/icon/3.png')} style={{ width: 20, height: 20, margin: 3 }} />
                                <Text style={{ color: '#fff' }}>تسجيل الدخول</Text>
                            </Button>
                        </Form>
                        <View style={{ flexDirection: 'row-reverse', width: '80%', alignSelf: 'center', margin: 20 }}>
                            <TouchableOpacity onPress={() => NavigationService.navigate('ForgetPassword')} >
                                <Text style={{ flex: 1, textDecorationLine: 'underline', color: '#fff' }}>  هل نسيت كلمة المرور ؟ </Text>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => NavigationService.navigate('Register')} style={{ marginRight: 80 }}>
                                <Text style={{ flex: 1, textDecorationLine: 'underline', color: '#fff' }}> دخول لاول مره</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '80%', alignSelf: 'center', flexDirection: 'row', margin: 20 }}>
                            <Icon style={{ margin: 5, height: 90 }} onPress={this.fbLogin}>
                                <Image source={require('./img/icon/facebook.png')} style={{ width: 65, height: 65 }} />
                            </Icon>
                            <Icon style={{ margin: 5, height: 90 }} onPress={this.googleSignIn}>
                                <Image source={require('./img/icon/gmail.png')} style={{ width: 65, height: 65 }} />
                            </Icon>
                            <Icon style={{ margin: 5, height: 90 }} onPress={this.LinkedInLogin}>
                                <Image source={require('./img/icon/in.png')} style={{ width: 65, height: 65 }} />
                            </Icon>
                            <Icon style={{ margin: 5, height: 90 }}>
                                <Image source={require('./img/icon/twitter.png')} style={{ width: 65, height: 65 }} />
                            </Icon>
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

