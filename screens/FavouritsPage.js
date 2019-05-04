import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { Header, Button, Container, Content, Card } from 'native-base';
import NavigationService from '../NavigationService';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class FavouritsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            category_type: '2',
            backgroundColorCategoy: '#24314b',
            message: ''
        }
    }

    componentDidMount() {
        let user_id = this.props.navigation.getParam('user_id');
        let api_token = this.props.navigation.getParam('api_token');
        fetch('https://drabraj.com/Apis/articles/favourite?user_id=' + user_id + '&api_token=' + api_token)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.warn(responseJson.articles.data);
                if (responseJson.status == 200) {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.articles.data
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        message: responseJson.message
                    })
                }
            })
            .catch((error) => {
                this.refs.toast.show(error, DURATION.LENGTH_LONG);
            })
    }



    renderAricalsFunction() {
        const regex = /(?:&nbsp;|<br>|<p>|<\/p>|<br \/>|&rlm;|&lrm;|<p style="text-align:right">)/g;
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
                    <Text style={{ color: "#fff", fontSize: 18, textAlign: 'center' }}>{this.state.message}</Text>
                    {this.state.dataSource.map((item, key) => (
                            <Card key={key} style={{ padding: 15, width: '90%', alignSelf: 'center', backgroundColor: '#192a4a', borderRadius: 30, }}>
                                <View style={{ flexDirection: 'row-reverse', }} >
                                    <View style={{ flexDirection: 'column', flex: 2 }}>
                                        <Text style={{ color: '#fff', fontFamily: 'STV-Bold' }}>
                                            {item.title}
                                        </Text>
                                        <Text style={{ color: '#aaa', fontSize: 12, fontFamily: 'STV' }} note>1 ساعه </Text>
                                        <Text style={{ color: '#fff', fontFamily: 'STV' }} note>
                                            {item.body.substring(0, 200).replace(regex, '')}......</Text>
                                        <Button onPress={() => NavigationService.navigate('ArticalDetails', { 
                                             share_url: item.share_url, 
                                             title: item.title,
                                             body: item.body.replace(regex, ''),
                                             article_id: item.id,
                                             atricalImage: item.media.url,
                                             comments:item.comments
                                        })} transparent style={{
                                            borderColor: '#fff',
                                            borderWidth: 1, borderRadius: 20, padding: 10, marginLeft: 5
                                        }}>
                                            <Text style={{ color: '#f9d778', textAlign: 'center', fontFamily: 'STV-Bold' }}>المزيــد</Text>
                                        </Button>
                                    </View>
                                    <View style={{}}>
                                        <Image source={{ uri: item.media.url }} style={{ width: 120, height: 160 }} />
                                    </View>
                                </View>
                            </Card>
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
                        مفضــــــلاتى
                    </Text></View>
                </Header>
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
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: "#f9d778", fontSize: 22, textAlign: 'center'  ,fontFamily: 'STV', margin : '5%'}}>هذه قائمه بالمواضيع التى اعجبت بها</Text>
                        <Content>
                        {this.renderAricalsFunction()}
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

