

import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, TextInput } from 'react-native';
import { Container, Content, Header, Button,  Form } from 'native-base'

export default class SendMessage extends Component {
    
    render() {
        return (
            <Container>

                <ImageBackground source={require('./img/icon/bg1.png')} style={{ width: '100%', height: '100%' }}>
                    <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff' }}>
                        <View style={{ flex: 1 }}>
                            <Button transparent  >
                                <Image source={require('./img/icon/24.png')} style={{ width: 32, height: 32, alignSelf: 'flex-end' }} />
                            </Button>
                        </View>

                        <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginHorizontal: 20, marginTop: 10 }}>تواصل معانا </Text></View>
                        <Button transparent   style={{ flex: 1 }}><Image source={require('./img/icon/23.png')} style={{ width: 32, height: 32, }} /></Button>

                    </Header>
                    <Content >
                        <View style={{ flexDirection: 'row-reverse', width: '100%', padding: 20, borderRadius: 10 }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 10, height: 700 }}>
                                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                                    <Image source={require('./img/icon/52.png')} style={{ width: 150, height: 150, margin: 30, alignSelf: 'center' }} />
                                    <Text style={{ fontSize: 25, color: '#e8ca75', alignSelf: 'center', }}>اترك رسالتك</Text>
                                </View>
                                <Form style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', padding: 10 }}>
                                    <View style={{
                                        flexDirection: 'row-reverse',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 30,
                                        width: "90%",

                                        margin: 10,
                                        alignSelf: 'center'




                                    }}>
                                        <TextInput placeholder="عنوان الرساله " placeholderTextColor="#FFF"
                                            style={{ width: '70%', textAlign: 'center', color: '#fff' }} />




                                    </View>
                                    <View style={{
                                        flexDirection: 'row-reverse',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 30,
                                        width: "90%",

                                        margin: 10,
                                        alignSelf: 'center'




                                    }}>
                                        <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            placeholder=" الرساله " placeholderTextColor="#FFF"
                                            style={{ width: '70%', color: '#fff', }} />




                                    </View>


                                    <Button
                                        style={{width:"90%",justifyContent:'center', flexDirection:'row-reverse',backgroundColor: '#1abcd6', alignSelf: 'center', padding: 20, borderRadius: 8, margin: 20 }}>
                                        <Image source={require('./img/icon/45.png')} style={{ width: 20, height: 20, margin: 3 }} />
                                        <Text style={{ color: '#fff' }}> ارسل</Text>
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

