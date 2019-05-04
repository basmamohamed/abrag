import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, ActivityIndicator, StatusBar } from 'react-native';
import { Header, Button, Content, Card, List, ListItem } from 'native-base';
import NavigationService from '../NavigationService';

export default class Offers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            isLoading: true,
            user_id: '',
            api_token: ''
        }
    }
    componentDidMount() {
        let user_id = this.props.navigation.getParam('user_id');
        let api_token = this.props.navigation.getParam('api_token');

        fetch('https://drabraj.com/Apis/offers/?user_id=' + user_id + '&api_token=' + api_token)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 200) {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.data,
                    })
                }
            })
            .catch((error) => {
                // console.warn(error);
            })
    }

    submit(service_id,price) {
        if (service_id == 1) {
           NavigationService.navigate('Service',{price:price})  
        }  else {
            NavigationService.navigate('ServiceTwice',{price:price}) 
        }
    }
    renderFunction() {
        const regex = /(?:&nbsp;|<br>|<p>|<\/p>|<br \/>|<strong>|<\/strong>|&quot;|&ndash;|&rlm;|&lrm;)/g;
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size="large" color="#f9d778" style={{ alignSelf: 'center', marginTop: '60%' }} />
            )
        }
        else {
            return (
                <Content>
                    {this.state.dataSource.map((item, key) => (
                        <Card key={key}
                            style={{
                                backgroundColor: '#192a4a',
                                borderRadius: 20, borderWidth: 0,
                                borderColor: '#1c2d4c',
                                margin: 15,
                                marginTop: 30,
                                width: '80%',
                                alignSelf: 'center'
                            }}>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', }}>
                                <Image source={require('./img/icon/70.png')} style={{ width: 25, height: 25, margin: 10 }} />
                                <Text style={{ color: '#fff', fontSize: 18, paddingHorizontal: 10, fontFamily: 'STV' }}> {item.first_service.name} </Text>
                            </View>
                            <Text style={{ flex: 5, color: '#fff', fontSize: 12, padding: 5, marginBottom: 15, borderRadius: 15, borderWidth: 1, borderColor: '#fff', paddingHorizontal: 10, fontFamily: 'STV' }}> {item.first_service.description.replace(regex, '')} </Text>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', }}>
                                <Image source={require('./img/icon/70.png')} style={{ width: 25, height: 25, margin: 10 }} />
                                <Text style={{ flex: 5, color: '#fff', fontSize: 18, paddingHorizontal: 10, fontFamily: 'STV' }}> {item.second_service.name} </Text>
                            </View>
                            <Text style={{ flex: 5, color: '#fff', padding: 5, borderRadius: 15, borderWidth: 1, borderColor: '#fff', fontSize: 12, paddingHorizontal: 10, fontFamily: 'STV' }}> {item.second_service.description.replace(regex, '')} </Text>
                            <View style={{ flexDirection: 'row-reverse', marginTop: 10, justifyContent: 'space-between' }}>
                                <Button transparent style={{ borderRadius: 20, borderWidth: 1, borderColor: '#fff', width: '40%', justifyContent: 'center', margin: 5 }}>
                                    <Text style={{ color: '#e93a59' }}>{item.price} جنيه</Text>
                                </Button>
                                <Button onPress={() => this.submit(item.first_service_id,item.price)} style={{ backgroundColor: 'green', borderRadius: 20, borderWidth: 1, borderColor: '#fff', width: '40%', justifyContent: 'center', margin: 5 }}>
                                    <Text style={{ color: '#fff', textAlign: 'center' }}>اطلب العرض</Text>
                                </Button>
                            </View>
                        </Card>
                    ))}
                </Content>
            )
        }
    }

    render() {
        return (
            <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', flex: 1 }}>
                <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                    <View style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                        </Button>
                    </View>
                    <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV' }}>
                        عــــــروض خـــــاصة
                    </Text></View>
                </Header>
                {this.renderFunction()}
            </ImageBackground>
        );
    }
}

