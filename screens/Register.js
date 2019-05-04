import React, { Component } from 'react';
import {
    Image, ImageBackground, Text, View, TouchableOpacity, Picker, AsyncStorage
} from 'react-native';
import {
    Container, Content, Icon, Button, Item, Form, Header
    , Input, Radio
} from 'native-base'
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationService from '../NavigationService';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';

export default class Register extends Component {
    constructor(props) {
        // StatusBarIOS.setHidden(true);
        super(props);
        let selectedYear = 2000,
            selectedMonth = 4,
            selectedDay = 1
        let days = this.getDays();
        selectedYear = selectedYear || years[0];
        selectedMonth = selectedMonth || ((new Date()).getMonth() + 1);
        selectedDay = selectedDay || ((new Date()).getDay() + 1);
        this.state = {
            cca2: 'EG',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            country: 'Egypt',
            city: '',
            district: '',
            gender: '',
            date_type: '',
            day: '',
            month: '',
            year: '',
            itemSelected: 'male',
            dateSelected: 'chris',
            days,
            selectedYear,
            selectedMonth,
            selectedDay,
            backgroundColorName: '#222540',
            backgroundColorEmail: '#222540',
            backgroundColorPassword: '#222540',
            backgroundColorPassword_confirmation: '#222540',
            backgroundColorCountry: '#222540',
            backgroundColorCity: '#222540',
            backgroundColorDistrict: '#222540',
            backgroundColorDay: '#222540',
            backgroundColorMonth: '#222540',
            backgroundColorYear: '#222540',
            user_id: "",
            api_token: ""
        };
    }

    onValueChange_Country(value) {
        this.setState({
            selected_Country: value,
            backgroundColorCountry: '#222540'
        });
    }


    dismiss = () => {
        this.setState({
            visiable: false
        })
    }

    getDays = () => {
        let days = []
        for (let i = 1; i <= 31; i++) {
            days.push(i);
        }
        return days;
    }

    renderPickerItems = (data) => {
        let items = data.map((value, index) => {
            return (<Picker.Item key={'r-' + index} label={'' + value} value={value} />)
        })
        return items;
    }

    onCancelPress = () => {
        this.dismiss();
    }

    onConfirmPress = () => {
        const confirm = this.confirm;
        const { selectedYear, selectedMonth, selectedDay } = this.state;
        confirm && confirm(selectedYear, selectedMonth, selectedDay);
        this.dismiss();
    }
    updateValue(text, field) {
        if (field == 'name') {
            this.setState({
                name: text,
                backgroundColorName: '#222540'
            })
        } else if (field == 'email') {
            this.setState({
                email: text,
                backgroundColorEmail: '#222540'
            })
        } else if (field == 'password') {
            this.setState({
                password: text,
                backgroundColorPassword: '#222540'
            })
        } else if (field == 'password_confirmation') {
            this.setState({
                password_confirmation: text,
                backgroundColorPassword_confirmation: '#222540'
            })
        } else if (field == 'city') {
            this.setState({
                city: text,
                backgroundColorCity: '#222540'
            })

        } else if (field == 'district') {
            this.setState({
                district: text,
                backgroundColorDistrict: '#222540'
            })
        }
    }

    ///////////////////////Form Submtion////////////////////////
    submit() {
        let formData = {}
        formData.name = this.state.name,
            formData.email = this.state.email,
            formData.password = this.state.password,
            formData.password_confirmation = this.state.password_confirmation,
            formData.country = this.state.cca2,
            formData.city = this.state.city,
            formData.district = this.state.district,
            formData.gender = this.state.itemSelected,
            formData.date_type = this.state.dateSelected,
            formData.day = this.state.selectedDay,
            formData.month = this.state.selectedMonth,
            formData.year = this.state.selectedYear
        // console.warn(formData);
        if (formData.name == "" || formData.password == "" || formData.email == "" || formData.password_confirmation == "" || formData.country == "" || formData.city == ""
            || formData.district == "" || formData.day == "" || formData.month == "" || formData.year == "" || formData.password_confirmation == "" !== formData.password == "") {
            this.setState({
                backgroundColorName: '#660000',
                backgroundColorEmail: '#660000',
                backgroundColorPassword: '#660000',
                backgroundColorPassword_confirmation: '#660000',
                backgroundColorCountry: '#660000',
                backgroundColorCity: '#660000',
                backgroundColorDistrict: '#660000',
                backgroundColorGender: '#660000',
                backgroundColorDate_type: '#660000',
                backgroundColorDay: '#660000',
                backgroundColorMonth: '#660000',
                backgroundColorYear: '#660000'
            })
        } else {
            // console.warn('else');
            var url = 'https://drabraj.com/Apis/register';
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(formData), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    //console.warn(response);
                    this.setState({
                        Resp: response.status
                    })
                    if (this.state.Resp == 200) {
                        NavigationService.replace('Start'),
                            AsyncStorage.setItem("user_id", JSON.stringify(response.id));
                        AsyncStorage.setItem("api_token", response.api_token);
                        AsyncStorage.setItem("logged", JSON.stringify(response.status));
                        this.setState({
                            name: '',
                            city: '',
                            district: '',
                            dateSelected: '',
                            selectedMonth: '',
                            selectedYear: '',
                            selectedDay: '',
                            gender: '',
                            password: '',
                            password_confirmation: ''
                        })
                        this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                    } else {
                        this.refs.toast.show(response.error, DURATION.LENGTH_LONG);
                    }
                })
                .catch(error => {
                    // console.warn('error');
                });
        }
    }
    renderDate = () => {
        let enMonths = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيه', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
        let arMonths = ['محرم', 'صفر', 'ربيع الاول', 'ربيع الثانى', 'جمادي الاول', 'جماد الثانى', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجه']
        let enYears = [];
        let arYears = [];
        const { days, selectedYear, selectedMonth, selectedDay, dateSelected } = this.state;
        if (dateSelected == 'chris') {
            for (let j = 1960; j <= 2030; j++) {
                enYears.push(j);
            }
            return (
                <View style={{ flex: 3, flexDirection: 'row' }}>
                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 70, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedYear}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedYear: itemValue })}
                        >
                            {this.renderPickerItems(enYears)}
                        </Picker>
                    </View>

                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 50, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedMonth}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedMonth: itemValue })}
                        >
                            {this.renderPickerItems(enMonths)}
                        </Picker>
                    </View>

                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 50, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedDay}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedDay: itemValue })}
                        >
                            {this.renderPickerItems(days)}
                        </Picker>
                    </View>
                </View>
            )
        }
        else if (dateSelected == 'hijry') {
            for (let j = 1430; j <= 1460; j++) {
                arYears.push(j);
            }
            return (
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={{ margin: '2%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedYear}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedYear: itemValue })}
                        >
                            {this.renderPickerItems(arYears)}
                        </Picker>
                    </View>

                    <View style={{ margin: '2%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedMonth}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedMonth: itemValue })}
                        >
                            {this.renderPickerItems(arMonths)}
                        </Picker>
                    </View>

                    <View style={{ margin: '2%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedDay}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedDay: itemValue })}
                        >
                            {this.renderPickerItems(days)}
                        </Picker>
                    </View>
                </View>
            )
        }
    }
    /////////////////////////////////////////////////////////////////////

    render() {
        return (
            <Container>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%' }}>
                    <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                        <View style={{ flex: 1, }}>
                            <Text style={{ textAlign: 'center', color: '#fff', marginTop: 15, marginRight: 18, fontFamily: "STV-Bold" }}>
                                تسجيـــــل مستخدم جديـــــد
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
                    <Content >
                        <View style={{ flexDirection: 'row-reverse', width: '100%', paddding: 20, borderRadius: 10 }}>
                            <ImageBackground source={require('./img/icon/bg1.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 10 }}>
                                <Form style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', padding: 5 }}>
                                    <Item  >
                                        <Input style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorName }} placeholder="اسم المستخدم  "
                                            onChangeText={(text) => this.updateValue(text, 'name')} />
                                        <Image source={require('./img/icon/8.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Item  >
                                        <Input style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorEmail }} placeholder="البريد الالكترونى"
                                            onChangeText={(text) => this.updateValue(text, 'email')} />
                                        <Image source={require('./img/icon/1.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Item >
                                        <Input secureTextEntry={true} style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorPassword }} placeholder="كلمة السر"
                                            onChangeText={(text) => this.updateValue(text, 'password')} />
                                        <Image source={require('./img/icon/2.png')} style={{ width: 25, height: 25 }} />

                                    </Item>
                                    <Item >
                                        <Input secureTextEntry={true} style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorPassword_confirmation }} placeholder=" تأكيد كلمة السر"
                                            onChangeText={(text) => this.updateValue(text, 'password_confirmation')} />
                                        <Image source={require('./img/icon/9.png')} style={{ width: 25, height: 25 }} />

                                    </Item>
                                    {/* <Item >
                                        <Input style={{ color: '#fff', backgroundColor: this.state.backgroundColorPassword_confirmation }} editable={false}>
                                        
                                        </Input>
                                        <CountryPicker
                                        onChange={(value) => this.setState({ country: value, cca2: value.cca2 })}
                                        cca2={this.state.cca2}
                                        translation='eng'
                                    />
                                        <Image source={require('./img/icon/10.png')} style={{ width: 25, height: 25, marginLeft:15 }} />

                                    </Item> */}

                                    <View style={{
                                        borderBottomWidth: 1,
                                        borderColor: '#fff',
                                        height: '8%',
                                        flex: 4,
                                        color: '#fff',
                                        marginLeft: '5%',
                                        width: '95%',
                                        backgroundColor: this.state.backgroundColorPassword_confirmation
                                    }}>
                                        <CountryPicker
                                            onChange={(value) => this.setState({ country: value.name, cca2: value.cca2 })}
                                            cca2={this.state.cca2}
                                            translation='eng'
                                        />
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>{this.state.country}</Text>
                                    </View>



                                    <Item>
                                        <Input style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorCity }} placeholder="اختر المدينة"
                                            onChangeText={(text) => this.updateValue(text, 'city')} />
                                        <Image source={require('./img/icon/11.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Item>
                                        <Input style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorDistrict }} placeholder="اختر المنطقة"
                                            onChangeText={(text) => this.updateValue(text, 'district')} />
                                        <Image source={require('./img/icon/12.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <View style={{ flexDirection: 'row-reverse' }}>

                                        <Image source={require('./img/icon/13.png')} style={{ width: 25, height: 25 }} />
                                        <Text style={{ margin: 5, color: '#fff', fontFamily: "STV-Bold" }}> الجنـــس</Text>
                                        <Item style={{ borderBottomWidth: 0 }}>
                                            <Text style={{ margin: 5, color: '#fff', fontFamily: 'STV' }}>ّذكر</Text>
                                            <Image source={require('./img/icon/14.png')} style={{ width: 25, height: 25 }} />
                                            <Radio selected={this.state.itemSelected == 'male'}
                                                onPress={() =>
                                                    this.setState({
                                                        itemSelected: 'male',
                                                    })
                                                } />
                                        </Item>
                                        <Item style={{ borderBottomWidth: 0 }}>
                                            <Text style={{ margin: 5, color: '#fff', fontFamily: 'STV' }}>انثى</Text>
                                            <Image source={require('./img/icon/15.png')} style={{ width: 25, height: 25 }} />
                                            <Radio selected={this.state.itemSelected == 'female'}
                                                onPress={() =>
                                                    this.setState({
                                                        itemSelected: 'female',
                                                    })
                                                } />
                                        </Item>
                                    </View>
                                    <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                                        <Text style={{ margin: 5, color: '#fff', fontFamily: "STV-Bold" }}>تاريخ الميلاد</Text>
                                        <Item style={{ borderBottomWidth: 0, paddingRight: '3%' }}>
                                            <Text style={{ margin: 1, color: '#fff', fontFamily: 'STV' }}>ميلادى</Text>
                                            <Radio selected={this.state.dateSelected == 'chris'}
                                                onPress={() => {
                                                    this.setState({
                                                        dateSelected: 'chris'
                                                    })
                                                }
                                                } />
                                        </Item>
                                        <Item style={{ width: '0.5%', borderBottomWidth: 0 }}></Item>
                                        <Item style={{ borderBottomWidth: 0 }}>
                                            <Text style={{ margin: 1, color: '#fff', fontFamily: 'STV' }}>هجرى</Text>
                                            <Radio selected={this.state.dateSelected == 'hijry'}
                                                onPress={() => {
                                                    this.setState({
                                                        dateSelected: 'hijry'
                                                    })
                                                }
                                                } />
                                        </Item>

                                    </View>

                                    <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                                        {this.renderDate()}
                                    </View>

                                    <Button
                                        onPress={() => this.submit()}
                                        style={{ backgroundColor: 'green', alignSelf: 'center', padding: 5, borderRadius: 8, margin: 5 }}>
                                        <Image source={require('./img/icon/3.png')} style={{ width: 20, height: 20, margin: 3 }} />
                                        <Text style={{ color: '#fff' }}>تسجيل </Text>
                                    </Button>
                                </Form>
                                <View style={{ flexDirection: 'row-reverse', width: '80%', alignSelf: 'center', margin: 1, justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => NavigationService.navigate('Login')} style={{ flex: 1, alignSelf: 'flex-start' }}  >
                                        <Text style={{ flex: 1, textAlign: 'center', textDecorationLine: 'underline', color: '#fff' }}>    لديك حساب بالفعل ؟ </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '80%', alignSelf: 'center', flexDirection: 'row', margin: 20 }}>

                                    <Image source={require('./img/icon/facebook.png')} style={{ width: 65, height: 65, margin: 5 }} />
                                    <Image source={require('./img/icon/gmail.png')} style={{ width: 65, height: 65, margin: 5 }} />
                                    <Image source={require('./img/icon/in.png')} style={{ width: 65, height: 65, margin: 5 }} />
                                    <Image source={require('./img/icon/twitter.png')} style={{ width: 65, height: 65, margin: 5 }} />

                                </View>
                            </ImageBackground>
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}