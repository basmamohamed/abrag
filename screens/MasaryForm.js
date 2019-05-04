import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, AsyncStorage, Modal, TouchableHighlight, TextInput } from 'react-native';
import { Container, Content, Header, Left, Icon, Button, Item, Form, Right, Input, DatePicker, Radio } from 'native-base'
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import NavigationService from '../NavigationService';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class MasaryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // reports: [],
            modalVisible: false,
            fname: '',
            lanme: '',
            phone: '',
            email: '',
            api_token: '',
            user_id: '',
            backgroundColorPhone: '#24314b',
            backgroundColorFirstName: '#24314b',
            backgroundColorLastName: '#24314b',
            backgroundColorEmail: '#24314b',
            title: this.props.navigation.getParam('title'),
            title2: this.props.navigation.getParam('title2'),
            reports: this.props.navigation.getParam('reports'),
            price: this.props.navigation.getParam('price'),
            coupon_id: this.props.navigation.getParam('coupon_id'),
            user_id: this.props.navigation.getParam('user_id'),
            api_token: this.props.navigation.getParam('api_token'),
            service_id: this.props.navigation.getParam('service_id'),
            user_service_id: this.props.navigation.getParam('user_service_id'),
        };
    }

    componentDidMount() {
        { this.LoadInitialState() }

    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    LoadInitialState = async () => {
        let value = await AsyncStorage.getItem('user_id');
        let api_token = await AsyncStorage.getItem('api_token');
        this.setState({ api_token: api_token, user_id: value })
    }
    ///////////////////////Form Submtion////////////////////////
    submit() {
            let formData = {}
            formData.user_id = this.state.user_id,
            formData.api_token = this.state.api_token,
            formData.last_name = this.state.lname,
            formData.first_name = this.state.fname,
            formData.email = this.state.email,
            formData.phone = this.state.phone,
            formData.coupon_id = this.state.coupon_id,
            formData.offer_id = this.state.offer_id,
            formData.price = this.state.price,
            formData.service_id = this.state.service_id,
            formData.type = 'fawry',
            formData.user_service_id = this.state.user_service_id
        // console.warn(formData);
        if (this.state.first_name == "" | this.state.last_name == "" | this.state.email == "" | this.state.phone == "") {
            this.setState({
                backgroundColorPhone: '#660000',
                backgroundColorFirstName: '#660000',
                backgroundColorLastName: '#660000',
                backgroundColorEmail: '#660000',
            })
        } else {

            var url = 'https://drabraj.com/Apis/payaccept';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    // console.warn(response);
                    this.setState({
                        Resp: response.status,
                    });
                    if (this.state.Resp == 400) {
                        this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                    } else if (this.state.Resp == 200) {
                        this.setState({
                            modalVisible: true,
                        });
                        this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                    }
                })
                .catch(response => {
                    this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                });
        }
    }
    updateValue(text, field) {
        if (field == 'fname') {
            this.setState({
                fname: text,
                backgroundColorFirstName: '#222544'
            })
        } else if (field == 'lname') {
            this.setState({
                lname: text,
                backgroundColorLastName: '#222544'
            })
        }
        else if (field == 'phone') {
            this.setState({
                phone: text,
                backgroundColorPhone: '#222544'
            })
        }
        else if (field == 'email') {
            this.setState({
                email: text,
                backgroundColorEmail: '#222544'
            })
        }
    }
    
    GoToReports(){
        this.setState({
            modalVisible: false,
            fname: '',
            lanme: '',
            phone: '',
            email: '',
        })
        NavigationService.navigate('Reports', {
            reports: this.state.reports,
            title:this.state.title,
           
        })
    }
    render() {
        return (
            <Container>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%' }}>
                    {/* //////////////////////////// */}
                    <Toast
                        ref="toast"
                        style={{ backgroundColor: '#fff' }}
                        position='top'
                        positionValue={5}
                        fadeInDuration={600}
                        fadeOutDuration={30000}
                        opacity={12}
                        textStyle={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}
                    />
                    {/* ///////////////////////////// */}
                    <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                        <View style={{ flex: 1 }}>
                            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                                <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                            </Button>
                        </View>
                        <View style={{ flex: 2, }}>
                            <Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV-Bold' }}>
                                {this.state.title2}
                            </Text>
                        </View>
                    </Header>
                    <Content >
                        <View style={{ flexDirection: 'row-reverse', width: '100%', padding: 8, borderRadius: 10 }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 10 }}>
                                <Text style={{ fontSize: 25, color: '#e8ca75', fontFamily: 'STV-Bold', alignSelf: 'center', marginTop: 30, margin: 10 }}>ادخل البيانات التاليه </Text>

                                <View style={{
                                    flexDirection: 'row-reverse',
                                    backgroundColor: this.state.backgroundColorFirstName,
                                    borderRadius: 30,
                                    width: "90%",
                                    height: '10%',
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Image source={require('./img/icon/8.png')} style={{ width: 20, height: 20, margin: 10 }} />
                                    <TextInput onChangeText={(text) => this.updateValue(text, 'fname')} placeholder="ادخل الاسم الأول " placeholderTextColor="#ABB2B9"
                                        value={this.state.firstname} style={{ width: '70%', textAlign: 'center', color: '#ABB2B9', fontFamily: "STV-Bold" }} />
                                </View>

                                <View style={{
                                    flexDirection: 'row-reverse',
                                    backgroundColor: this.state.backgroundColorLastName,
                                    borderRadius: 30,
                                    width: "90%",
                                    height: '10%',
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Image source={require('./img/icon/8.png')} style={{ width: 20, height: 20, margin: 10 }} />
                                    <TextInput onChangeText={(text) => this.updateValue(text, 'lname')} placeholder="ادخل الاسم الثانى " placeholderTextColor="#ABB2B9"
                                        value={this.state.lastname} style={{
                                            width: '70%', textAlign: 'center', fontFamily: "STV", color: '#ABB2B9',
                                        }} />
                                </View>

                                <View style={{
                                    flexDirection: 'row-reverse',
                                    backgroundColor: this.state.backgroundColorPhone,
                                    borderRadius: 30,
                                    width: "90%",
                                    height: '10%',
                                    margin: 5,
                                    marginBottom: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Image source={require('./img/icon/37.png')} style={{ width: 20, height: 20, margin: 10 }} />
                                    <TextInput onChangeText={(text) => this.updateValue(text, 'phone')} placeholder="ادخل رقم الهاتف " placeholderTextColor="#ABB2B9"
                                        value={this.state.district} style={{ width: '70%', textAlign: 'center', fontFamily: "STV", color: '#ABB2B9', backgroundColor: this.state.backgroundColorDistrict }} />
                                </View>

                                <View style={{
                                    flexDirection: 'row-reverse',
                                    backgroundColor: this.state.backgroundColorEmail,
                                    borderRadius: 30,
                                    width: "90%",
                                    height: '10%',
                                    margin: 5,
                                    marginBottom: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Image source={require('./img/icon/1.png')} style={{ width: 20, height: 20, margin: 10 }} />
                                    <TextInput onChangeText={(text) => this.updateValue(text, 'email')} placeholder="ادخل  البريد الإلكترونى   " placeholderTextColor="#ABB2B9"
                                        value={this.state.email} style={{ width: '70%', textAlign: 'center', fontFamily: "STV", color: '#ABB2B9', backgroundColor: this.state.backgroundColorDistrict }} />
                                </View>

                                <Button onPress={() => this.submit()} style={{
                                    borderRadius: 10, margin: 20, width: "60%", flexDirection: 'row-reverse',
                                    paddingHorizontal: 50, backgroundColor: 'green', alignSelf: 'center'
                                }}>
                                    <Image source={require('./img/icon/27.png')} style={{ width: 15, height: 15, }} />
                                    <Text style={{ color: '#fff', marginLeft: 5, fontWeight: 'bold', fontSize: 15, fontFamily: 'STV-Bold' }}>شراءالخدمة</Text>
                                </Button>

                            </ImageBackground>
                        </View>

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
                                    <Image source={require('./img/icon/53.png')} style={{ width: 90, height: 90, justifyContent: 'center', alignSelf: 'center' }} />
                                    <Text style={{ color: '#1abcd6', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}> تــمـــت عملية الدفع بنجــــاح</Text>
                                    <Button
                                        onPress={() =>this.GoToReports()}
                                        style={{
                                            margin: 10,
                                            justifyContent: 'center', backgroundColor: '#1abcd6',
                                            borderRadius: 20,
                                            padding: 50, width: '100%',
                                            alignSelf: 'center',
                                        }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, }}>
                                            أحصل على التقرير
                                    </Text>
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                    </Content>
                </ImageBackground>
            </Container >
        );
    }
}

