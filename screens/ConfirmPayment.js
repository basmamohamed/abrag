

import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, TouchableOpacity, Picker, Modal, TextInput, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Left, Body, Icon, Button, Item, Form, Right, Input, DatePicker, Radio } from 'native-base'
import HeaderComp from './components/HeaderComp'
 
import Coupon from './Coupon';


export default class ConfirmPayment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        };
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        return (
            <Container>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%' }}>
                    <HeaderComp title=" اتمام عملية الشراء "   img={require('./img/icon/23.png')} />

                    <Content >
                        <View style={{ flexDirection: 'row-reverse', width: '100%', padding: 20, borderRadius: 10 }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 10, height: '100%', marginTop: 50 }}>

                                <View>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            marginRight: 20,
                                            color: '#1abcd6',
                                            padding: 10,
                                            fontWeight: 'bold'
                                        }} >
                                        الاسم
                                        </Text>
                                    <TextInput
                                        placeholder="ادخل الاسم"
                                        placeholderTextColor='#555'
                                        style={{

                                            width: "90%",

                                            padding: 5,
                                            alignSelf: 'center',
                                            borderRadius: 30,
                                            borderWidth: 1,
                                            borderColor: '#555',


                                        }} />

                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            marginRight: 20,
                                            color: '#1abcd6',
                                            padding: 10,
                                            fontWeight: 'bold'
                                        }} >
                                        الاميل
                                        </Text>
                                    <TextInput
                                        placeholder="ادخل الاميل"
                                        placeholderTextColor='#555'
                                        style={{

                                            width: "90%",

                                            padding: 5,
                                            alignSelf: 'center',
                                            borderRadius: 30,
                                            borderWidth: 1,
                                            borderColor: '#555',


                                        }} />

                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            marginRight: 20,
                                            color: '#1abcd6',
                                            padding: 10,
                                            fontWeight: 'bold'
                                        }} >
                                        التليفون
                                        </Text>
                                    <TextInput
                                        placeholder="ادخل التليفون"
                                        placeholderTextColor='#555'
                                        style={{

                                            width: "90%",

                                            padding: 5,
                                            alignSelf: 'center',
                                            borderRadius: 30,
                                            borderWidth: 1,
                                            borderColor: '#555',


                                        }} />


                                </View>
                                <View >
                                    <Modal
                                        animationType="fade"
                                        transparent={true}
                                        visible={this.state.modalVisible}

                                    >
                                        <View style={{ width: "80%", alignSelf: 'center', margin: 20, marginTop: 150, padding: 10, borderRadius: 10, backgroundColor: "#fff" }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <TouchableHighlight
                                                    style={{ margin: 20, alignSelf: 'flex-end' }}
                                                    onPress={() => {
                                                        this.setModalVisible(!this.state.modalVisible);
                                                    }}>
                                                    <Icon name="times" type='FontAwesome5' style={{ color: '#333' }} />

                                                </TouchableHighlight>
                                            </View>
                                            <View>

<Image source={require('./img/icon/53.png')} style={{width:100,height:100,alignSelf:"center"}} />
   <Text style={{fontSize:18,color:'#1abcd6',alignSelf:'center'}}>تمت عملية الدفع بنجاح</Text>                                            
                                                <Button

                                                    onPress={() => this.setModalVisible(true)}

                                                    style={{
                                                        margin: 10,
                                                        justifyContent: 'center', backgroundColor: '#1abcd6',
                                                        borderRadius: 20,
                                                        padding: 50, width: '100%',
                                                        alignSelf: 'center',
                                                    }}>

                                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, }}>
                                                       احصل على التقرير 
                                                     </Text>
                                                </Button>
                                            </View>
                                        </View>
                                    </Modal>
                                    <Button
                                        onPress={() => this.setModalVisible(true)}

                                        style={{
                                            margin: 40,
                                            justifyContent: 'center', backgroundColor: 'green',
                                            borderRadius: 15,
                                            padding: 20, width: '80%',
                                            alignSelf: 'center',
                                            
                                        }}>

                                        <Text style={{ color: '#fff',fontSize:20,fontWeight:'bold' }}>
                                            تأكيد
                  </Text>
                                    </Button>


                                </View >





                            </ImageBackground>
                        </View>



                    </Content>
                </ImageBackground>
            </Container >
        );
    }
}

