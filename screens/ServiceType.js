
import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, TouchableOpacity, ScrollView,  ActivityIndicator, AsyncStorage } from 'react-native';
import { Spinner, Header, Button, Container, Content, Card, Left, List, ListItem, Item, Input } from 'native-base';
import NavigationService from '../NavigationService';

export default class ServiceType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            api_token: '',
            user_id: '',
            isLoading: true,
        }
    }
    LoadInitialState = async () => {
        let value = await AsyncStorage.getItem('user_id');
        let api_token = await AsyncStorage.getItem('api_token');
        this.setState({ api_token: api_token, user_id: value })

        fetch('https://drabraj.com/Apis/services?user_id=' +value + '&api_token=' + api_token)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.warn(responseJson.services);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.services,
                })
            })
            .catch((error) => {
                // console.warn(error)
            })
    }
    submit(id, price) {
        if (id === 1) { 
            NavigationService.navigate('Service', { price: price })
        } else if(id === 2){
            NavigationService.navigate('ServiceTwice', { price: price })
        }
    }
    componentDidMount() {
        this.LoadInitialState();
        
    }
    renderCardsFunction() {
        if (this.state.isLoading) {

            return (
                <View style={{ height: 500 }} >
                    <ActivityIndicator size="large" color="#f9d778" style={{ marginTop: 150, alignSelf: 'center', justifyContent: 'space-around', alignItems: 'center' }} />
                </View>
            )
        }
        else {
            const regex = /(?:&nbsp;|<br>|<strong>|<\/strong>|&ndash;|<p>|&quot;|<\/p>|<br \/>|&rlm;|&lrm;)/g;
            return (
                <View>
                    {this.state.dataSource.map((item, key) => (
                        <TouchableOpacity key={key} onPress={() => this.submit(item.id, item.price)} >
                            <Card
                                style={{
                                    backgroundColor: '#1c2d4c',
                                    borderRadius: 20, borderWidth: 0,
                                    borderColor: '#1c2d4c',
                                    width: '90%',
                                    alignSelf: 'center'
                                }}>
                                <List style={{ margin: 15 }}>

                                    <ListItem style={{ flexDirection: 'row-reverse', borderBottomWidth: 0 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', borderRadius: 40, width: 40, height: 40 }}>
                                            <Image source={require('./img/icon/70.png')} style={{ width: 25, height: 25 }} />
                                        </View>
                                        <Text style={{ flex: 5, color: '#fff', fontSize: 15, paddingHorizontal: 2,fontFamily:'STV' }}> {item.name} </Text>
                                        <Image source={require('./img/icon/76.png')} style={{ width: 60, height: 60 }} />
                                        <Text style={{ position: "absolute", marginRight: 190, fontSize: 15, fontWeight: 'bold', color: '#1F618D',fontFamily:'STV-Bold' }} > {item.price}</Text>
                                        <Text style={{ position: "absolute", marginRight: 218, fontWeight: 'bold', color: '#AEB6BF',fontFamily:'STV' }} > {item.currency_name} </Text>
                                    </ListItem>

                                    <View style={{ color: '#fff',fontFamily:'STV', borderColor: "#fff", borderWidth: 1, padding: 10, borderRadius: 10, width: '100%' }}>
                                        <Text style={{ fontSize: 12, color: '#fff' }}>{item.description.replace(regex, '')}</Text>
                                    </View>
                                </List>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </View>
            )
        }
    };
    render() {
        return (
            <Container>
                <ScrollView>
                    <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                        <View style={{ flex: 1 }}>
                            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                                <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                            </Button>
                        </View>
                        <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18,fontFamily:'STV' }}>
                            الخدمـــــــات
                    </Text></View>
                    </Header>

                    <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', }}>
                        <View style={{ width: "90%", alignSelf: 'center' }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', height: '100%', marginTop: 50, alignSelf: 'center' }}>
                                <Text
                                    style={{
                                        color: '#f9d778',
                                        fontSize: 25, fontWeight: 'bold',
                                        textAlign: 'center', margin: 30,fontFamily:'STV-Bold'
                                    }}>
                                    اختر نوع الخدمة</Text>
                                {this.renderCardsFunction()}
                            </ImageBackground>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </Container>
        );
    }
}

