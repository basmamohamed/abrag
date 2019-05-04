import React, { Component } from 'react';
import { Image, ImageBackground, Text, TextInput, View, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { Container, Content, Header, Left, Body, Icon, Button, Item, Form, Right, Input, DatePicker, Radio } from 'native-base'
import CountryPicker from 'react-native-country-picker-modal';
import Toast, { DURATION } from 'react-native-easy-toast';
import BackComponent from './components/BackComponent';

export default class ProfileData extends Component {
    constructor(props) {
        super(props);
        let selectedYear = 2019,
            selectedMonth = 4,
            selectedDay = 1
        let days = this.getDays();
        selectedYear = selectedYear || years[0];
        selectedMonth = selectedMonth || ((new Date()).getMonth() + 1);
        selectedDay = selectedDay || ((new Date()).getDay() + 1);
        this.state = {
            dataSource: [],
            name: '',
            email: '',
            dateSelected: 'chris',
            itemSelected: 'male',
            age: '',
            day: '',
            month: '',
            year: '',
            city: '',
            days,
            country:'Egypt',
            district: '',
            selectedYear,
            selectedMonth,
            selectedDay,
            selected: '',
            cca2: 'EG',
            Mselected: false,
            selected: false,
            male: false,
            female: false,
            user_id: '',
            api_token: '',
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
    updateValue(text, field) {
        if (field == 'name') {
            this.setState({
                name: text,
                backgroundColorName: '#ddd'
            })
        } else if (field == 'email') {
            this.setState({
                email: text,
                backgroundColorEmail: '#ddd'
            })
        } else if (field == 'age') {
            this.setState({
                age: text,
                backgroundColorAge: '#ddd'
            })
        } else if (field == 'city') {
            this.setState({
                city: text,
                backgroundColorCity: '#ddd'
            })
        }
        else if (field == 'district') {
            this.setState({
                district: text,
                backgroundColorDistrict: '#ddd'
            })
        }
    }


    componentDidMount() {
        let user_id = this.props.navigation.getParam('user_id');
        let api_token = this.props.navigation.getParam('api_token');
        this.setState({
            user_id: user_id,
            api_token: api_token
        })
        fetch('https://drabraj.com/Apis/profile?user_id=' + user_id + '&api_token=' + api_token)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.warn(responseJson);

                this.setState({
                    name: responseJson.data.name,
                    email: responseJson.data.email,
                    dateSelected: responseJson.data.date_type,
                    age: responseJson.data.age,
                    selectedDay: responseJson.data.day,
                    selectedMonth: responseJson.data.month,
                    selectedYear: responseJson.data.year,
                    city: responseJson.data.city,
                    district: responseJson.data.district,
                })
            })
            .catch((error) => {
                // console.warn(error)
            })
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
    ///////////////////////Form Submtion////////////////////////
    submit() {
        let formData = {}
            formData.user_id = this.state.user_id,
            formData.api_token = this.state.api_token,
            formData.date_type = this.state.dateSelected,
            formData.day = this.state.selectedDay,
            formData.month = this.state.selectedMonth,
            formData.year = this.state.selectedYear,
            formData.district = this.state.district,
            formData.city = this.state.city,
            formData.name = this.state.name,
            formData.gender = this.state.itemSelected,
            formData.country = this.state.cca2
        // console.warn(formData);
        var url = 'https://drabraj.com/Apis/profile/update';
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(formData), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                // console.warn(response);
                if (response.status === 200) {
                    this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                    this.setState({
                        name: responseJson.data.name,
                        email: responseJson.data.email,
                        dateSelected: responseJson.data.date.type,
                        // age: responseJson.data.age,
                        selectedDay: responseJson.data.date.day,
                        selectedMonth: responseJson.data.date.month,
                        selectedYear: responseJson.data.date.year,
                        city: responseJson.data.profile.city,
                        cca2: responseJson.data.profile.country,
                        district: responseJson.data.profile.district
                    })

                } else {
                    this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                }
            })
            .catch(error => {
                // console.warn(error);
            });
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
                        <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV' }}>
                            الملف الشخصي
                    </Text></View>
                    </Header>
                    <Content >
                        <View style={{ flexDirection: 'row-reverse', width: '100%', padding: 8, borderRadius: 10 }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', alignSelf: 'center', borderRadius: 10 }}>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    marginTop: 20,
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        الإســــم
                                    </Text>
                                    <Input placeholderTextColor='#fff'  onChangeText={(text) => this.updateValue(text, 'name')}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#fff',
                                            padding: 10
                                        }} >
                                        {this.state.name}
                                    </Input>
                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        البريد الإلكترونى
                                    </Text>
                                    <Input placeholderTextColor="#FFF"  onChangeText={(text) => this.updateValue(text, 'email')}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#fff',
                                            padding: 10
                                        }} >
                                        {this.state.email}
                                    </Input>

                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        العمــــــر
                                    </Text>
                                    <Input placeholderTextColor="#fff"  onChangeText={(text) => this.updateValue(text, 'age')}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#fff', padding: 10
                                        }} >
                                        {this.state.age}
                                    </Input>
                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        الــــدوله
                                    </Text>
                                    <View style={{
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 30,
                                        flex: 4, textAlign: 'center', color: '#fff'
                                    }}>
                                        <CountryPicker
                                            onChange={(value) => this.setState({ country : value.name , cca2: value.cca2 })}
                                            cca2={this.state.cca2}
                                            translation='eng' />
                                             <Text style={{ color: '#fff', textAlign: 'center' }}>{this.state.country}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        المـــــدينة
                                    </Text>
                                    <Input placeholderTextColor='#fff' onChangeText={(text) => this.updateValue(text, 'city')}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#fff', padding: 10
                                        }} >
                                        {this.state.city}
                                    </Input>
                                </View>

                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: "90%",
                                    margin: 5,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ flex: 2, margin: 10, color: '#19acc7' }} >
                                        المنـــــطقة
                                    </Text>
                                    <Input placeholderTextColor="#fff"  onChangeText={(text) => this.updateValue(text, 'district')}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 30,
                                            flex: 4, textAlign: 'center', color: '#fff', padding: 10
                                        }} >
                                        {this.state.district}
                                    </Input>
                                </View>
                                <View style={{ flexDirection: 'row-reverse', margin: 2 }}>
                                    <Image source={require('./img/icon/13.png')} style={{ width: 20, height: 20, margin: 2 }} />
                                    <Text style={{ margin: 5, color: '#fff', fontFamily: 'STV-Bold' }}> الجنـــس</Text>
                                </View>
                                <View style={{ flexDirection: 'row-reverse', width: '100%', paddingLeft: '40%' }}>
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
                                <View style={{ flexDirection: 'row-reverse', margin: 2 }}>
                                    <Image source={require('./img/icon/13.png')} style={{ width: 20, height: 20, margin: 2 }} />
                                    <Text style={{ margin: 5, color: '#fff', fontFamily: 'STV-Bold' }}>  تاريخ ميلادك</Text>
                                </View>
                                <View style={{ flexDirection: 'row-reverse', width: '100%', paddingLeft: '40%' }}>
                                    <Item style={{ borderBottomWidth: 0 }}>
                                        <Text style={{ margin: 1, color: '#fff', fontFamily: 'STV' }}>ميلادى</Text>
                                        <Radio selected={this.state.dateSelected == 'chris'}
                                            onPress={() => {
                                                this.setState({
                                                    dateSelected: 'chris'
                                                })
                                            }
                                            } />
                                    </Item>
                                    <Item style={{ width: '0.8%', borderBottomWidth: 0 }}></Item>
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
                                {this.renderDate()}
                                <View style={{ flexDirection: 'row-reverse', margin: 5 }}>
                                    <Button onPress={() => this.submit()}
                                        style={{ flex: 1, margin: 10, justifyContent: 'center', backgroundColor: '#eee', borderRadius: 15 }}>
                                        <Text style={{ color: '#1abcd6' }}> تـــم التعـــديل   </Text></Button>
                                </View>
                            </ImageBackground>
                        </View>
                    </Content>
                </ImageBackground>
            </Container >
        );
    }
}

