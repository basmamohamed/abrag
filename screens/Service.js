import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, AsyncStorage, Picker, TextInput } from 'react-native';
import { Container, Content, Header, Left, Icon, Button, Item, Form, Right, Input, DatePicker, Radio } from 'native-base'
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import NavigationService from '../NavigationService';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class Services extends Component {
    constructor(props) {
        super(props);
        let selectedYear = 'سنه',
            selectedMonth = "شهر",
            selectedDay = 'يوم'
        let days = this.getDays();
        selectedYear = selectedYear || years[0];
        selectedMonth = selectedMonth || ((new Date()).getMonth() + 1);
        selectedDay = selectedDay || ((new Date()).getDay() + 1);
        this.state = {
            reports: [],
            name: '',
            state: '',
            country: 'Egypt',
            city: '',
            district: '',
            dateSelected: '',
            cca2: 'EG',
            Mselected: false,
            selected: false,
            male: false,
            female: false,
            gender: '',
            days,
            day: '',
            month: '',
            year: '',
            selectedYear,
            selectedMonth,
            selectedDay,
            api_token: '',
            user_id: '',
            // date_type: 'chris',
            backgroundColorCountry: '#24314b',
            backgroundColorCity: '#24314b',
            backgroundColorDistrict: '#24314b',
            backgroundColorName: '#24314b',
            price: this.props.navigation.getParam('price'),
        };
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
    onConfirmPress = () => {
        const confirm = this.confirm;
        const { selectedYear, selectedMonth, selectedDay } = this.state;
        confirm && confirm(selectedYear, selectedMonth, selectedDay);
        this.dismiss();
    }
    async componentDidMount() {
        let value = await AsyncStorage.getItem('user_id');
        let api_token = await AsyncStorage.getItem('api_token');
        this.setState({ api_token: api_token, user_id: value })

    }
    ///////////////////////Form Submtion////////////////////////
    submit() {
        let formData = {}
        formData.service_id = 1,
            formData.user_id = this.state.user_id,
            formData.api_token = this.state.api_token,
            formData.date_type = this.state.dateSelected,
            formData.day = this.state.selectedDay,
            formData.month = this.state.selectedMonth,
            formData.year = this.state.selectedYear,
            formData.gender = this.state.gender
        // console.warn(formData);
        if (this.state.name == "") {
            this.setState({
                backgroundColorName: '#660000',
                backgroundColorCity: '#660000',
                backgroundColorDistrict: '#660000',
            })
        } else {
            let address = this.state.city + '-' + this.state.district;
            let date = this.state.selectedDay + '-' + this.state.selectedMonth + '-' + this.state.selectedYear;

            var url = 'https://drabraj.com/Apis/services/request';
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(formData), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    // console.warn(response.user_service_id);
                    this.setState({
                        reports: response.reports
                    })
                    if (response.status == 200) {
                        NavigationService.navigate('ConfirmServices', {
                            name: this.state.name, date: date, address: address, gender: this.state.gender, price: this.state.price,
                            reports: this.state.reports,
                            user_id:this.state.user_id,
                            api_token:this.state.api_token,
                            service_id : 1 , user_service_id : response.user_service_id

                        })
                        this.setState({
                            name: '',
                            city: '',
                            district: '',
                            dateSelected: '',
                            selectedMonth: '',
                            selectedYear: '',
                            selectedDay: '',
                        })
                    } else {
                        this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                    }
                })
                .catch(error => {
                });
        }
    }
    updateValue(text, field) {
        if (field == 'name') {
            this.setState({
                name: text,
                backgroundColorName: '#222544'
            })
        } else if (field == 'city') {
            this.setState({
                city: text,
                backgroundColorCity: '#222544'
            })
        }
        else if (field == 'district') {
            this.setState({
                district: text,
                backgroundColorDistrict: '#222544'
            })
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
                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedYear}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedYear: itemValue })}
                        >
                            {this.renderPickerItems(enYears)}
                        </Picker>
                    </View>

                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedMonth}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedMonth: itemValue })}
                        >
                            {this.renderPickerItems(enMonths)}
                        </Picker>
                    </View>

                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
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
                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedYear}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedYear: itemValue })}
                        >
                            {this.renderPickerItems(arYears)}
                        </Picker>
                    </View>

                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedMonth}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedMonth: itemValue })}
                        >
                            {this.renderPickerItems(arMonths)}
                        </Picker>
                    </View>

                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
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
                    <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                        <View style={{ flex: 1 }}>
                            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                                <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                            </Button>
                        </View>
                        <View style={{ flex: 2, }}>
                            <Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV-Bold' }}>
                                الــخـــــدمات
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
                                    backgroundColor: this.state.backgroundColorName,
                                    borderRadius: 30,
                                    width: "90%",
                                    height: '8%',
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Image source={require('./img/icon/8.png')} style={{ width: 20, height: 20, margin: 10 }} />
                                    <TextInput onChangeText={(text) => this.updateValue(text, 'name')} placeholder="ادخل الاسم " placeholderTextColor="#ABB2B9"
                                        value={this.state.name} style={{ width: '70%', textAlign: 'center', color: '#ABB2B9', fontFamily: "STV-Bold" }} />

                                </View>

                                <View style={{
                                    borderRadius: 30,
                                    height: '8%',
                                    flex: 4, textAlign: 'center',
                                    color: '#fff',
                                    alignSelf: 'center',
                                    margin: 5,
                                    width: '90%',
                                    backgroundColor: this.state.backgroundColorCountry
                                }}>
                                    <CountryPicker
                                        onChange={(value) => this.setState({ country: value.name, cca2: value.cca2 })}
                                        cca2={this.state.cca2}
                                        translation='eng' />
                                    <Text style={{ color: '#fff', textAlign: 'center' }}>{this.state.country}</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row-reverse',
                                    backgroundColor: this.state.backgroundColorCity,
                                    borderRadius: 30,
                                    width: "90%",
                                    height: '8%',
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Image source={require('./img/icon/11.png')} style={{ width: 20, height: 20, margin: 10 }} />
                                    <TextInput onChangeText={(text) => this.updateValue(text, 'city')} placeholder="ادخل المدينة " placeholderTextColor="#ABB2B9"
                                        value={this.state.city} style={{ width: '70%', textAlign: 'center', fontFamily: "STV", color: '#ABB2B9', backgroundColor: this.state.backgroundColorCity }} />

                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    backgroundColor: this.state.backgroundColorDistrict,
                                    borderRadius: 30,
                                    width: "90%",
                                    height: '8%',
                                    margin: 5,
                                    marginBottom: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Image source={require('./img/icon/12.png')} style={{ width: 20, height: 20, margin: 10 }} />
                                    <TextInput onChangeText={(text) => this.updateValue(text, 'district')} placeholder="ادخل المنطقة " placeholderTextColor="#ABB2B9"
                                        value={this.state.district} style={{ width: '70%', textAlign: 'center', fontFamily: "STV", color: '#ABB2B9', backgroundColor: this.state.backgroundColorDistrict }} />
                                </View>
                                    

                                
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <View style={{ margin: 5  , paddingRight: '12%' }}>
                                        <Text style={{ margin: 5, color: '#fff', fontFamily: 'STV-Bold' }}>  الجنــس </Text>
                                    </View>
                                    <Item style={{ borderBottomWidth: 0, paddingRight: '3%'  }}>
                                        <Image source={require('./img/icon/14.png')} style={{ width: 32, height: 32 }} />
                                        <Text style={{ margin: 2, color: '#fff', fontFamily: "STV" }}>ذكر</Text>
                                        <Radio selected={this.state.gender == 'male'}
                                            onPress={() =>
                                                this.setState({
                                                    gender: 'male',
                                                })
                                            } />
                                    </Item>
                                    <Item style={{ width: '6%', borderBottomWidth: 0 }}></Item>
                                    <Item style={{ borderBottomWidth: 0, paddingLeft: '5%' }}>
                                        <Image source={require('./img/icon/15.png')} style={{ width: 32, height: 32 }} />
                                        <Text style={{ margin: 2, color: '#fff', fontFamily: 'STV' }}>انثى</Text>
                                        <Radio selected={this.state.gender == 'female'}
                                            onPress={() =>
                                                this.setState({
                                                    gender: 'female',
                                                })
                                            } />
                                    </Item>
                                </View>



                                <View style={{ flexDirection: 'row-reverse', margin: 5 }}>
                                    <Image source={require('./img/icon/13.png')} style={{ width: 20, height: 20, margin: 10 }} />
                                    <Text style={{ margin: 10, color: '#fff', fontFamily: 'STV-Bold' }}>ادخل تاريخ ميلادك</Text>
                                </View>
                                <View style={{ flexDirection: 'row-reverse', paddingLeft: '35%' }}>
                                    <Item style={{ borderBottomWidth: 0 }}>
                                        <Text style={{ margin: 2, color: '#fff', fontFamily: "STV" }}>ميلادى</Text>
                                        <Radio selected={this.state.dateSelected == 'chris'}
                                            onPress={() => {
                                                this.setState({
                                                    dateSelected: 'chris'
                                                })
                                            }
                                            } />
                                    </Item>
                                    <Item style={{ width: '12%', borderBottomWidth: 0 }}></Item>
                                    <Item style={{ borderBottomWidth: 0 }}></Item>
                                    <Item style={{ borderBottomWidth: 0, paddingLeft: '5%' }}>
                                        <Text style={{ margin: 2, color: '#fff', fontFamily: 'STV' }}>هجرى</Text>
                                        <Radio selected={this.state.dateSelected == 'hijry'}
                                            onPress={() => {
                                                this.setState({
                                                    dateSelected: 'hijry'
                                                })
                                            }
                                            } />

                                    </Item>
                                </View>
                               
                                {/* تاريخ الميلاد */}

                                {this.renderDate()}
                                <Button onPress={() => this.submit()} style={{
                                    borderRadius: 10, margin: 20, width: "60%", flexDirection: 'row-reverse',
                                    paddingHorizontal: 50, backgroundColor: 'green', alignSelf: 'center'
                                }}>
                                    <Image source={require('./img/icon/27.png')} style={{ width: 15, height: 15, }} />
                                    <Text style={{ color: '#fff', marginLeft: 5, fontWeight: 'bold', fontSize: 15, fontFamily: 'STV-Bold' }}>شراء الخدمة</Text>
                                </Button>

                            </ImageBackground>
                        </View>




                    </Content>
                </ImageBackground>
            </Container >
        );
    }
}

