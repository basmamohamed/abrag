import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, ActivityIndicator, TextInput } from 'react-native';
import { Header, Button, Container, Content, Card, Input } from 'native-base';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class ContactUs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            messsage: '',
            backgroundColor:'#222544',
            backgroundColorBody:'#222544'
        }
    }
    updateValue(text, field) {
        if (field == 'title') {
            this.setState({
                title: text,
                backgroundColor:'#222544',
            })
        } else if (field == 'body') {
            this.setState({
                body: text,
                backgroundColorBody:'#222544'
            })
        }
    }
    submit() {
        let user_id = this.props.navigation.getParam('user_id');
        let api_token = this.props.navigation.getParam('api_token');
        let formData = {}
           formData.title = this.state.title,
            formData.body = this.state.body,
            formData.api_token = api_token,
            formData.user_id = user_id
        // console.warn(formData);

        if (formData.title == "" || formData.body == "") {
            this.setState({ backgroundColorBody: "#660000", backgroundColor: "#660000" })
        } else {
            var url = 'https://drabraj.com/Apis/messages';
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
                        this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                        this.setState({
                            title: '',
                            body: ''
                        })
                    } else {
                        this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
    
                    }
                })
                .catch(response => {
                    this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                });
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
                    <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV' }}>
                        تواصــــل معنا
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
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', flex: 1 }}>
                    <Content>
                        <View style={{ alignItems: 'center', marginTop: '10%' }}>
                            <Image source={require('./img/icon/52.png')} style={{ width: 140, height: 140 }}></Image>

                            <Input placeholder="عنوان الرسالة " placeholderTextColor="#ABB2B9"
                                onChangeText={(text) => this.updateValue(text, 'title')}
                                value={this.state.title}
                                style={{
                                    width: '80%', textAlign: 'center', color: '#ABB2B9',
                                    borderRadius: 40,
                                    height: 40,
                                    borderColor: '#9E9E9E',
                                    borderWidth: 1,
                                    width: '80%',
                                    margin: 5,
                                    fontFamily: "STV-Bold",
                                    backgroundColor:this.state.backgroundColor
                                }} />

                            <TextInput placeholder="اكتب الرسالة " placeholderTextColor="#ABB2B9" multiline={true}
                                onChangeText={(text) => this.updateValue(text, 'body')}
                                value={this.state.body} style={{
                                    textAlign: 'center',
                                    height: 120,
                                    width: '80%',
                                    color: '#ABB2B9',
                                    borderWidth: 2,
                                    borderColor: '#9E9E9E',
                                    borderRadius: 30,
                                    fontFamily: "STV-Bold",
                                    backgroundColor:this.state.backgroundColorBody
                                }} />

                            <Button onPress={() => this.submit()}
                                style={{ width: '80%', flex: 1, margin: 15, alignSelf: 'center', justifyContent: 'center', backgroundColor: '#1abcd6', borderRadius: 15 }}>
                                <Text style={{ color: '#fff', padding: 5 }}>
                                    إرســـــــال    </Text>
                            </Button>


                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

