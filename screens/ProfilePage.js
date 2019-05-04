import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { Header, Button, Container, Content, Card, Icon } from 'native-base';
import NavigationService from '../NavigationService';
import Toast, { DURATION } from 'react-native-easy-toast';
import ImagePicker from 'react-native-image-picker';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: 'null',
            isLoading: true,
            dataSource: [],
            user_id: '',
            api_token: '',
            photo:'null'
        }
    }

    componentDidMount() {
        let user_id = this.props.navigation.getParam('user_id');
        let api_token = this.props.navigation.getParam('api_token');
        this.setState({
            api_token: api_token,
            user_id: user_id,
        })
        fetch('https://drabraj.com/Apis/profile?user_id=' + user_id + '&api_token=' + api_token)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                    photo:responseJson.data.image_url
                })
            })
            .catch((error) => {
                // console.warn(error)
            })
    }
    chooseImage () {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                this.setState({ image: response,photo:response.uri })
            }
            const data = new FormData();
            data.append('user_id', this.state.user_id);
            data.append('api_token', this.state.api_token);
            data.append('image', {
                uri: this.state.image.uri,
                type: 'image/jpg|png|jpeg',
                name: 'testPhotoName'
            });
            fetch('https://drabraj.com/Apis/profile/update', {
                method: 'post',
                body: data
            }).then(res => res.json())
                .then(response => {
                    this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                    // console.warn(response.data.profile.profile_picture.url);
                    
                })
                .catch(error => this.refs.toast.show(error, DURATION.LENGTH_LONG))
        })

    }

    renderUserData() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size="large" color="#f9d778" style={{ marginTop: 250, alignSelf: 'center', justifyContent: 'space-around', alignItems: 'center' }} />
            )
        }
        else {
            return (
                <Content>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '30%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: this.state.photo }} style={{ width: 80, height: 80, borderRadius: 40 }}></Image>
                            <Icon onPress={() => this.chooseImage()} style={{ marginTop: 60 }}>
                                <Image source={require('./img/icon/50.png')} style={{ width: 18, height: 18 }} ></Image>
                            </Icon>
                        </View>
                        <Text style={{ color: '#fff', fontSize: 25 }}>{this.state.dataSource.name}</Text>
                        <Text style={{ color: '#aaa' }}>{this.state.dataSource.email}</Text>
                    </View>
                    <View style={{ width: '75%', marginTop: '6%' }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <Image source={require('./img/icon/13.png')} style={{ width: 15, height: 15 }}></Image>
                            <Text style={{ fontSize: 15, color: '#aaa', marginHorizontal: 10 }}>{this.state.dataSource.day}-{this.state.dataSource.month}-{this.state.dataSource.year}</Text>
                            <Text style={{ color: '#aaa', fontSize: 15 }}>{this.state.dataSource.age} عام</Text>
                        </View>
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <Image source={require('./img/icon/49.png')} style={{ width: 15, height: 15 }}></Image>
                            <Text style={{ color: '#aaa', marginHorizontal: 10 }}>{this.state.dataSource.district} - {this.state.dataSource.city} </Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', marginTop: '6%' }}>
                        <Button onPress={() => NavigationService.navigate('ProfileData', {
                            user_id: this.state.user_id,
                            api_token: this.state.api_token
                        })}
                            style={{ backgroundColor: '#e93a59', alignSelf: 'center', borderRadius: 8, marginVertical: 20, width: '55%', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontFamily: 'STV' }}>تعديل البيانات </Text>
                        </Button>
                        <Button onPress={() => NavigationService.navigate('UpdatePassword', { email: this.state.dataSource.email })}
                            style={{ backgroundColor: '#1abcd6', alignSelf: 'center', borderRadius: 8, width: '55%', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontFamily: 'STV' }}>تغيير كلمة السر </Text>
                        </Button>
                    </View>
                </Content>
            )
        }
    };
    render() {
        return (
            <Container>
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
                    <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV' }}>
                        الملف الشخصي
                    </Text></View>
                </Header>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center' }}>
                    <Content>
                        {this.renderUserData()}
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

