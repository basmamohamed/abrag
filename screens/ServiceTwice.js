import React, { Component } from 'react';
import {
    Image, ImageBackground, Text, View, AsyncStorage, Picker,
} from 'react-native';
import {
    Container, Content, Icon, Button, Item, Form, Header
    , Input, Radio
} from 'native-base'
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationService from '../NavigationService';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';

export default class ServiceTwice extends Component {
    constructor(props) {
        // StatusBarIOS.setHidden(true);
        super(props);
        let selectedYear = 2000,
            selectedYear2 = 2000,
            selectedMonth = 4,
            selectedDay = 1,
            selectedMonth2 = 4,
            selectedDay2 = 1
        let days = this.getDays();
        selectedYear = selectedYear || years[0];
        selectedMonth = selectedMonth || ((new Date()).getMonth() + 1);
        selectedDay = selectedDay || ((new Date()).getDay() + 1);

        selectedYear2 = selectedYear2 || years[0];
        selectedMonth2 = selectedMonth2 || ((new Date()).getMonth() + 1);
        selectedDay2 = selectedDay2 || ((new Date()).getDay() + 1);
        this.state = {
            cca2: 'EG',
            cca22: 'EG',
            name: '',
            country: 'Egypt',
            city: '',
            district: '',
            gender: '',
            date_type: '',
            day: '',
            month: '',
            year: '',
            itemSelected: '',
            dateSelected: 'chris',
            ///////////////
            name2: '',
            country2: 'Egypt',
            city2: '',
            district2: '',
            gender2: '',
            date_type2: '',
            day2: '',
            month2: '',
            year2: '',
            itemSelected2: '',
            dateSelected2: '',
            selectedYear2,
            selectedMonth2,
            selectedDay2,
            //////////////
            days,
            selectedYear,
            selectedMonth,
            selectedDay,
            backgroundColorName: '#222540',
            backgroundColorName2: '#222540',
            user_id: '',
            api_token: '',
            reports: []
        };
    }
    async componentDidMount() {
        let user_id = await AsyncStorage.getItem('user_id');
        let api_token = await AsyncStorage.getItem('api_token');
        this.setState({ api_token: api_token, user_id: user_id })
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
        const { selectedYear, selectedMonth, selectedDay, selectedYear2, selectedMonth2, selectedDay2 } = this.state;
        confirm && confirm(selectedYear, selectedMonth, selectedDay, selectedYear2, selectedMonth2, selectedDay2);
        this.dismiss();
    }
    updateValue(text, field) {
        if (field == 'name') {
            this.setState({
                name: text,
                backgroundColorName: '#222540'
            })
        } else if (field == 'name2') {
            this.setState({
                name2: text,
                backgroundColorName2: '#222540'
            })
        } else if (field == 'city') {
            this.setState({
                city: text,
            })
        } else if (field == 'district') {
            this.setState({
                district: text,
            })

        } else if (field == 'city2') {
            this.setState({
                city2: text,
            })
        } else if (field == 'district2') {
            this.setState({
                district2: text,
            })
        }
    }

    ///////////////////////Form Submtion////////////////////////
    submit() {
        let formData = {}
        formData.service = 2,
            formData.user_id = this.state.user_id,
            formData.service_id = 2,
            formData.api_token = this.state.api_token,
            formData.day1 = this.state.selectedDay,
            formData.month1 = this.state.selectedMonth,
            formData.year1 = this.state.selectedYear,
            formData.date_type1 = this.state.dateSelected,
            formData.date_type2 = this.state.dateSelected2,
            formData.gender1 = this.state.itemSelected,
            formData.gender2 = this.state.itemSelected2,
            formData.day2 = this.state.selectedDay2,
            formData.month2 = this.state.selectedMonth2,
            formData.year2 = this.state.selectedYear2
        // console.warn(formData);
        if (this.state.name == "" || this.state.name2 == "") {
            this.setState({
                backgroundColorName: '#660000',
                backgroundColorName2: "#660000"
            })
            // console.warn('notdone 660000');
        } else {
            let address = this.state.city + '-' + this.state.district;
            let date = this.state.selectedDay + '' + this.state.selectedMonth + '-' + this.state.selectedYear;
            let address1 = this.state.city2 + '-' + this.state.district2;
            let date1 = this.state.selectedDay2 + '-' + this.state.selectedMonth2 + '-' + this.state.selectedYear2;
            var url = 'https://drabraj.com/Apis/services/request?';
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
                        reports: response.reports
                    })
                    if (this.state.Resp == 200) {
                        NavigationService.navigate('ConfirmServicesFirstPerson', {
                            name: this.state.name,
                            date: date,
                            address: address,
                            gender: this.state.itemSelected,
                            name1: this.state.name2,
                            date1: date1,
                            address1: address1,
                            gender1: this.state.itemSelected2,
                            reports: this.state.reports,
                            price: response.price,
                            user_id: this.state.user_id,
                            api_token: this.state.api_token,
                            service_id: 2, user_service_id: response.user_service_id
                        })
                        // console.warn('done 200');
                        this.setState({
                            name: '',
                            city: '',
                            district: '',
                            dateSelected: '',
                            selectedMonth: '',
                            selectedYear: '',
                            selectedDay: '',
                            gender: '',
                            name2: '',
                            city2: '',
                            district2: '',
                            dateSelected2: '',
                            selectedMonth2: '',
                            selectedYear2: '',
                            selectedDay2: '',
                            gender2: ''
                        })
                    } else {
                        this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                    }
                })
                .catch(error => {
                    // console.warn('notdone error');
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

    renderDate2 = () => {
        let enMonths = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيه', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
        let arMonths = ['محرم', 'صفر', 'ربيع الاول', 'ربيع الثانى', 'جمادي الاول', 'جماد الثانى', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجه']
        let enYears = [];
        let arYears = [];
        const { days, selectedYear2, selectedMonth2, selectedDay2, dateSelected2 } = this.state;
        if (dateSelected2 == 'chris') {
            for (let j = 1960; j <= 2030; j++) {
                enYears.push(j);
            }
            return (
                <View style={{ flex: 3, flexDirection: 'row' }}>
                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedYear2}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedYear2: itemValue })}
                        >
                            {this.renderPickerItems(enYears)}
                        </Picker>
                    </View>
                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedMonth2}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedMonth2: itemValue })}
                        >
                            {this.renderPickerItems(enMonths)}
                        </Picker>
                    </View>
                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedDay2}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedDay2: itemValue })}
                        >
                            {this.renderPickerItems(days)}
                        </Picker>
                    </View>
                </View>
            )
        }
        else if (dateSelected2 == 'hijry') {
            for (let j = 1430; j <= 1460; j++) {
                arYears.push(j);
            }
            return (
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedYear2}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedYear2: itemValue })}
                        >
                            {this.renderPickerItems(arYears)}
                        </Picker>
                    </View>

                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedMonth2}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedMonth2: itemValue })}
                        >
                            {this.renderPickerItems(arMonths)}
                        </Picker>
                    </View>

                    <View style={{ margin: '0.5%', flex: 1, borderWidth: 2, borderRadius: 40, borderColor: '#6d6e77' }}>
                        <Picker
                            style={{ color: '#fff', transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                            selectedValue={selectedDay2}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedDay2: itemValue })}
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
                                الــخـــــدمات
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
                        <View style={{ flexDirection: 'row-reverse', width: '100%', padding: 8, borderRadius: 10 }}>
                            <ImageBackground source={require('./img/icon/bg1.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 10 }}>
                                <Text style={{ fontSize: 25, color: '#e8ca75', fontFamily: 'STV-Bold', alignSelf: 'center', marginTop: 30, margin: 10 }}>ادخل البيانات التاليه </Text>
                                <Text style={{ fontSize: 18, color: '#19acc7', fontFamily: 'STV-Bold', alignSelf: 'center', margin: 5 }}> الشخص الأول </Text>
                                <Form style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', padding: 10 }}>
                                    <Item  >
                                        <Input style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorName }} placeholder="  أدخل الإسم  "
                                            value={this.state.name} onChangeText={(text) => this.updateValue(text, 'name')} />
                                        <Image source={require('./img/icon/8.png')} style={{ width: 25, height: 25 }} />
                                    </Item>

                                    <View style={{
                                        borderBottomWidth: 1,
                                        borderColor: '#fff',
                                        height: '8%',
                                        flex: 4,
                                        color: '#fff',

                                        marginLeft: '5%',
                                        width: '95%',
                                    }}>
                                        <CountryPicker
                                            onChange={(value) => this.setState({ country: value.name, cca2: value.cca2 })}
                                            cca2={this.state.cca2}
                                            translation='eng'
                                        />
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>{this.state.country}</Text>
                                    </View>


                                    <Item>
                                        <Input style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorCity }} placeholder="ادخل المدينة"
                                            value={this.state.city} onChangeText={(text) => this.updateValue(text, 'city')} />
                                        <Image source={require('./img/icon/11.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Item>
                                        <Input style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorDistrict }} placeholder="ادخل المنطقة"
                                            value={this.state.district} onChangeText={(text) => this.updateValue(text, 'district')} />
                                        <Image source={require('./img/icon/12.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <View style={{ flexDirection: 'row-reverse' }}>
                                        <Image source={require('./img/icon/13.png')} style={{ width: 25, height: 25 }} />
                                        <Text style={{ margin: 5, color: '#fff', fontFamily: "STV-Bold" }}> الجنـس </Text>
                                        <Item style={{ borderBottomWidth: 0 }}>
                                            <Text style={{ margin: 5, color: '#fff', fontFamily: 'STV' }}>ّذكر</Text>
                                            <Image source={require('./img/icon/14.png')} style={{ width: 25, height: 25 }} />
                                            <Radio selected={this.state.itemSelected == 'male'}
                                                onPress={() =>
                                                    this.setState({
                                                        itemSelected2: 'female',
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
                                                        itemSelected2: 'male'
                                                    })
                                                } />
                                        </Item>
                                    </View>
                                    <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                                        <Text style={{ margin: 5, color: '#fff', fontFamily: "STV-Bold" }}>تاريخ الميلاد</Text>
                                        <Item style={{ borderBottomWidth: 0, paddingRight: '2%' }}>
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
                                </Form>
                                {/* /////////////////////////// sECOUNDpERSON //////////////////// */}
                                <View style={{ width: '100%', backgroundColor: '#bae6ee' }}>
                                    <Text style={{ fontSize: 18, color: '#19acc7', fontFamily: 'STV-Bold', alignSelf: 'center', margin: 5 }}>  الشخص الثانى </Text>
                                </View>
                                <Form style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', padding: 10 }}>
                                    <Item  >
                                        <Input style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorName2 }} placeholder="  أدخل الإسم  "
                                            value={this.state.name2} onChangeText={(text) => this.updateValue(text, 'name2')} />
                                        <Image source={require('./img/icon/8.png')} style={{ width: 25, height: 25 }} />
                                    </Item>

                                    <View style={{
                                        borderBottomWidth: 1,
                                        borderColor: '#fff',
                                        height: '8%',
                                        flex: 4,
                                        color: '#fff',

                                        marginLeft: '5%',
                                        width: '95%',
                                    }}>
                                        <CountryPicker
                                            onChange={(value) => this.setState({ country2: value.name, cca22: value.cca2 })}
                                            cca2={this.state.cca22}
                                            translation='eng'
                                        />
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>{this.state.country2}</Text>
                                    </View>

                                    {/* <Image source={require('./img/icon/10.png')} style={{ width: 25, height: 25, marginLeft: 15 }} /> */}

                                    <Item>
                                        <Input style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorCity }} placeholder="ادخل المدينة"
                                            value={this.state.city2} onChangeText={(text) => this.updateValue(text, 'city2')} />
                                        <Image source={require('./img/icon/11.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <Item>
                                        <Input style={{ color: '#fff', fontFamily: 'STV', backgroundColor: this.state.backgroundColorDistrict }} placeholder="ادخل المنطقة"
                                            value={this.state.district2} onChangeText={(text) => this.updateValue(text, 'district2')} />
                                        <Image source={require('./img/icon/12.png')} style={{ width: 25, height: 25 }} />
                                    </Item>
                                    <View style={{ flexDirection: 'row-reverse' }}>
                                        <Image source={require('./img/icon/13.png')} style={{ width: 25, height: 25 }} />
                                        <Text style={{ margin: 5, color: '#fff', fontFamily: "STV-Bold" }}>  الجنـــس</Text>
                                        <Item style={{ borderBottomWidth: 0 }}>
                                            <Text style={{ margin: 5, color: '#fff', fontFamily: 'STV' }}>ّذكر</Text>
                                            <Image source={require('./img/icon/14.png')} style={{ width: 25, height: 25 }} />
                                            <Radio selected={this.state.itemSelected2 == 'male'}
                                                onPress={() =>
                                                    this.setState({
                                                        itemSelected2: 'male',
                                                        itemSelected: 'female'
                                                    })
                                                } />
                                        </Item>
                                        <Item style={{ borderBottomWidth: 0 }}>
                                            <Text style={{ margin: 5, color: '#fff', fontFamily: 'STV' }}>انثى</Text>
                                            <Image source={require('./img/icon/15.png')} style={{ width: 25, height: 25 }} />
                                            <Radio selected={this.state.itemSelected2 == 'female'}
                                                onPress={() =>
                                                    this.setState({
                                                        itemSelected2: 'female',
                                                        itemSelected: 'male'
                                                    })
                                                } />
                                        </Item>
                                    </View>
                                    <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                                        <Text style={{ margin: 5, color: '#fff', fontFamily: "STV-Bold" }}>تاريخ الميلاد</Text>
                                        <Item style={{ borderBottomWidth: 0, paddingRight: '3%' }}>
                                            <Text style={{ margin: 1, color: '#fff', fontFamily: 'STV' }}>ميلادى</Text>
                                            <Radio selected={this.state.dateSelected2 == 'chris'}
                                                onPress={() => {
                                                    this.setState({
                                                        dateSelected2: 'chris'
                                                    })
                                                }
                                                } />
                                        </Item>
                                        <Item style={{ width: '0.5%', borderBottomWidth: 0 }}></Item>
                                        <Item style={{ borderBottomWidth: 0 }}>
                                            <Text style={{ margin: 1, color: '#fff', fontFamily: 'STV' }}>هجرى</Text>
                                            <Radio selected={this.state.dateSelected2 == 'hijry'}
                                                onPress={() => {
                                                    this.setState({
                                                        dateSelected2: 'hijry'
                                                    })
                                                }
                                                } />
                                        </Item>
                                    </View>
                                    <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                                        {this.renderDate2()}
                                    </View>
                                    <Button
                                        onPress={() => this.submit()}
                                        style={{ backgroundColor: 'green', alignSelf: 'center', padding: 20, borderRadius: 8, margin: 20 }}>
                                        <Image source={require('./img/icon/3.png')} style={{ width: 20, height: 20, margin: 3 }} />
                                        <Text style={{ color: '#fff' }}> متـــابعه </Text>
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