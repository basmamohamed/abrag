

import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, ActivityIndicator, Picker, ScrollView } from 'react-native';
import { Container, Content, Header, Left, Body, Icon, Button, Item, Form, Right, Input, DatePicker, Radio, List, ListItem } from 'native-base'

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        let user_id = this.props.navigation.getParam('user_id');
        let api_token = this.props.navigation.getParam('api_token');
        fetch('https://drabraj.com/Apis/notifications?api_token='+ api_token +'&user_id='+user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.warn(responseJson.notifications.data);
                this.setState({
                    isLoading:false,
                    notifications: responseJson.notifications.data
                })
            })
            .catch((error) => {
                // console.warn(error)
            })
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
                    {this.state.notifications.map((item, key) => (
                             <ListItem key={key} style={{ flexDirection: 'row-reverse', borderBottomWidth: 0 }}>
                                    <Text style={{ flex: 3, fontWeight: 'bold', color: '#f9d778', fontSize: 15, paddingHorizontal: 20 }}>{item.title}</Text>
                                    <Text style={{ flex: 3, color: '#fff', fontSize: 12, paddingHorizontal: 20 }}> {item.body} </Text>
                                    <View style={{ flexDirection: 'row-reverse', flex: 6, justifyContent: 'center', borderRadius: 40, padding: 5 }}>
                                        <Text style={{ color: '#aaa' }} note> {item.created_at.substring(0, 10)} </Text>
                                        <Image source={require('./img/icon/55.png')} style={{ width: 25, height: 25 }} />
                                    </View>
                                </ListItem>
                    ))}
                </View>
            )
        }
    };

    render() {
        return (
            <Container>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%' }}>
                    <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                        <View style={{ flex: 1 }}>
                            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                                <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                            </Button>
                        </View>
                        <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV' }}>
                            التنبيهـــــات
                    </Text></View>
                    </Header>
                    <ScrollView style={{ width: "90%", alignSelf: 'center' }}>
                        <ImageBackground style={{ marginTop: 40, width: '100%' }}
                            source={require('./img/icon/bg2.png')}
                        >
                            <List>
                                {/*  */}
                                {this.renderCardsFunction()}
                            </List>
                        </ImageBackground>
                    </ScrollView>
                </ImageBackground>
            </Container >
        );
    }
}

