import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, ActivityIndicator, WebView } from 'react-native';
import { Header, Button, Container, Content, Card, Icon } from 'native-base';
import NavigationService from '../NavigationService';
import Toast, { DURATION } from 'react-native-easy-toast';
import ImagePicker from 'react-native-image-picker';

export default class YouTube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true
        }
    }

    componentDidMount() {
        let user_id = this.props.navigation.getParam('user_id');
        let api_token = this.props.navigation.getParam('api_token');
        this.setState({
            api_token: api_token,
            user_id: user_id,

        })
        fetch('https://drabraj.com/Apis/videos?api_token=' + api_token)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.data.data,
                    isLoading: false,
                })
            })
            .catch((error) => {
                // console.warn(error)
            })
    }

    renderVediosFunction() {
        if (this.state.isLoading) {
            return (
                <Content>
                    <ActivityIndicator size="large" color="#f9d778" style={{ alignSelf: 'center' }} />
                </Content>
            )
        }
        else {
            return (
                <Content>
                    {this.state.dataSource.map((item, key) => (
                        <View key={key} style={{ height: 300, margin: 15 }}>
                            <WebView
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: 'https://www.youtube.com/embed/'+ item.url }}
                            />
                        </View>
                    ))}
                </Content>
            )
        }
    };

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
                        اليـــوتيوب
                    </Text></View>
                </Header>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center' }}>
                    <Content>
                        {this.renderVediosFunction()}
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

