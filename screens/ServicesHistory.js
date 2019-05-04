import React, { Component } from 'react'
import { Image, ImageBackground, View, TouchableOpacity, ActivityIndicator, Text } from 'react-native'
import { Container, Header, Button, Content, Body } from 'native-base'
import Toast, { DURATION } from 'react-native-easy-toast';

export default class ServicesHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            isLoading: true,
        }
    }
    async componentDidMount() {
        let user_id = this.props.navigation.getParam('user_id');
        let api_token = this.props.navigation.getParam('api_token');
        fetch('https://drabraj.com/Apis/services/history?user_id=' + user_id + '&api_token=' + api_token)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 200) {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.services,
                    })
                }
                else {
                    this.refs.toast.show(responseJson.message, DURATION.LENGTH_LONG);
                }
            })
            .catch((error) => {
                // console.warn(error)
            })
    }
    renderServices() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size="large" color="#f9d778" style={{ marginTop: 250, alignSelf: 'center' }} />
            )
        }
        else {
            return (
                <Content style={{ position: 'absolute', marginTop: 30, width: '100%', height: '100%' }}>
                    {this.state.dataSource.map((item, key) => (
                        <View key={key} style={{ padding: 25, borderBottomWidth: 1, borderBottomColor: '#000', borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}>
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Image source={require('./img/icon/70.png')} style={{ width: 20, height: 20, borderRadius: 10, marginLeft: 3 }} backgroundColor='#fff'></Image>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 15,
                                    color: '#e93a59'
                                }}>
                                    {item.name.substring(0, 25)} ..
                            </Text>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 12,
                                    color: '#A9A9A9',
                                    fontFamily: 'Cochin'
                                }}>{item.service_date.substring(0, 10)}</Text>
                                <Button rounded style={{
                                    width: 50, borderRadius: 30, marginLeft: 5,
                                    height: 20, backgroundColor: "#1abcd6", justifyContent: 'center'
                                }} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Reports', { reports: item.reports, title: item.name.substring(0, 25) })}>
                                        <Text style={{
                                            color: '#fff', textAlign: 'center',
                                            fontWeight: 'bold', fontSize: 12, fontFamily: 'Cochin'
                                        }}>عرض
                                    </Text>
                                    </TouchableOpacity>

                                </Button>
                                <Image source={require('./img/icon/41.png')} style={{ width: 17, height: 17 }}></Image>
                            </View>
                        </View>
                    ))}
                </Content>
            )
        }
    }

    render() {
        return (
            <Container>
                <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                    <View style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                        </Button>
                    </View>
                    <View style={{ flex: 2, }}>
                        <Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV-Bold' }}>
                            خدماتى السابقه
                    </Text>
                    </View>
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
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                    {this.renderServices()}
                </ImageBackground>
            </Container>
        )
    }
}