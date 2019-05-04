

import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, TouchableOpacity, Picker, TextInput } from 'react-native';
import { Container, Content, Header, Left, Body, Icon, Button, Item, Form, Right, Input, DatePicker, Radio } from 'native-base'
import HeaderComp from './components/HeaderComp'
 
import Coupon from './Coupon';


export default class BuyService extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <Container>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%' }}>
                    <HeaderComp title=" اتمام عملية الشراء "  img={require('./img/icon/23.png')} />

                    <Content >
                        <View style={{ flexDirection: 'row-reverse', width: '100%', padding: 20, borderRadius: 10 }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 10, height: '100%', marginTop: 50 }}>

                                <View style={{
                                    flexDirection: 'row-reverse',

                                    width: "90%",

                                    margin: 10,
                                    alignSelf: 'center',
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    marginTop: 30


                                }}>

                                    <Text
                                        style={{


                                            textAlign: 'center', color: '#1abcd6',
                                            padding: 10, flex: 4
                                        }} >
                                        اسم الخدمة
                                        </Text>
                                    <Text
                                        style={{


                                            textAlign: 'center', color: '#d22859',
                                            padding: 10, flex: 2
                                        }} >
                                        55 جنيه
                                        </Text>


                                </View>



                                <View style={{ width: '100%', alignItems:'center',justifyContent:'center',alignContent: 'center', flexDirection: 'row-reverse', margin: 10 }}>

                                    <Coupon  />



                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',

                                    width: "90%",

                                    margin: 10,
                                    alignSelf: 'center',



                                }}>

                                    <Text
                                        style={{


                                            textAlign: 'center', color: '#1abcd6',
                                            padding: 10,
                                        }} >
                                        تم ادخال كوبون الخصم
                                        </Text>
                                    <Text
                                        style={{

                                            borderRadius: 30,
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            textAlign: 'center', color: '#d22859',
                                            padding: 10,
                                            borderStyle: 'dashed'
                                        }} >
                                        55 جنيه
                                        </Text>


                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',

                                    width: "90%",

                                    margin: 10,
                                    alignSelf: 'center',
                                    borderBottomWidth: 1, borderBottomColor: '#fff',
                                    paddingBottom: 20



                                }}>

                                    <Text
                                        style={{


                                            textAlign: 'center', color: '#1abcd6',
                                            padding: 10,
                                        }} >
                                        تم خصم
                                        </Text>
                                    <Text
                                        style={{

                                            borderRadius: 30,
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            textAlign: 'center', color: '#d22859',
                                            padding: 10,

                                        }} >
                                        55 جنيه
                                        </Text>


                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    width: '80%', alignSelf: 'center',
                                    paddingBottom: 20
                                }}>
                                    <Text style={{
                                        textAlign: 'center', fontSize: 30, color: '#fff',
                                        fontWight: 'bold', margin: 10
                                    }}>المجموع</Text>
                                    <Text
                                        style={{

                                            borderRadius: 30,
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            textAlign: 'center', color: '#d22859',
                                            padding: 10,

                                        }} >
                                        55 جنيه
                                        </Text>
                                    <Button style={{ width: '100%', marginVertical: 20, justifyContent: 'center', backgroundColor: '#eee', borderRadius: 15 }}><Text style={{ color: '#1abcd6' }}> اتمام عملية الشراء   </Text></Button>


                                </View>







                            </ImageBackground>
                        </View>



                    </Content>
                </ImageBackground>
            </Container >
        );
    }
}

