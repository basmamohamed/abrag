import React from 'react';
import { Image, Text, View, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { List, ListItem, Card, Badge, Icon } from 'native-base';
import NavigationService from '../../NavigationService';

export default class MenuDrawer extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         user_id: '',
         api_token: '',
         notifications: '',
         dataSource: []
      }
   }

   LoadInitialState = async () => {
      let value = await AsyncStorage.getItem('user_id');
      let api_token = await AsyncStorage.getItem('api_token');
      this.setState({ api_token: api_token, user_id: value })

      fetch('https://drabraj.com/Apis/profile?user_id=' + value + '&api_token=' + api_token)
         .then((response) => response.json())
         .then((responseJson) => {
            this.setState({
               dataSource: responseJson.data,
            })
         })
         .catch((error) => {
            // console.warn(error)
         })
   }

   componentDidMount() {
      { this.LoadInitialState() }
   }

   submit() {
      AsyncStorage.clear();
      NavigationService.replace('Login');
   }

   render() {
      return (
         <View style={{ flex: 2, backgroundColor: '#213a65', flexDirection: 'row-reverse' }}>
            <Card style={{ flex: 4, backgroundColor: '#213a65', borderColor: '#213a65', marginTop: 0, marginBottom: 0 }}>
               <View style={{ height: 150, width: '100%', backgroundColor: '#0d2447', alignContent: 'center', alignItems: 'center' }}>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilePage', {
                     api_token: this.state.api_token,
                     user_id: this.state.user_id
                  })}>
                     <View style={{ marginTop: 30, flexDirection: 'row-reverse', alignContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#aaa', borderRadius: 100, width: 100, height: 100, borderColor: '#e43659', justifyContent: 'center', borderWidth: 1 }}>
                           <Image source={{ uri: this.state.dataSource.image_url }} style={{ width: 95, height: 95, borderRadius: 100 }}></Image>
                        </View>
                        <Text style={{ marginHorizontal: 20, color: "#FFF", fontWeight: 'bold' }}> {this.state.dataSource.name} </Text>
                     </View>
                  </TouchableOpacity>

               </View>
               <ScrollView>
                  <View style={{ backgroundColor: '#213a65', marginTop: 5 }}>
                     {/* <View style={{ backgroundColor: '#380707', width: '100%' }}> */}
                     <List >
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification', {
                           api_token: this.state.api_token,
                           user_id: this.state.user_id
                        })}>
                           <View style={{ backgroundColor: '#380707', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/30.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>التنبهات</Text>
                           </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RecentArtical')}>
                           <View style={{ backgroundColor: '#380707', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/31.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>احدث المقالات</Text>
                           </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('YouTube', {
                           api_token: this.state.api_token,
                        })}>
                           <View style={{ backgroundColor: '#380707', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/32.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>يوتيوب</Text>
                           </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ServiceType')}>
                           <View style={{ backgroundColor: '#0d2447', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/33.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>خدمة جديده</Text>
                           </View>
                        </TouchableOpacity>

                        {/* ////////////////////////////////////// */}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Offers', {
                           api_token: this.state.api_token,
                           user_id: this.state.user_id
                        })}>
                           <View style={{ backgroundColor: '#0d2447', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/34.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>عروض خاصه</Text>
                           </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilePage', {
                           api_token: this.state.api_token,
                           user_id: this.state.user_id
                        })}>
                           <View style={{ backgroundColor: '#0d3c9b', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/35.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>الملف الشخصى</Text>
                           </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ServicesHistory', {
                           api_token: this.state.api_token,
                           user_id: this.state.user_id
                        })}>
                           <View style={{ backgroundColor: '#0d3c9b', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/36.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>خدماتى السابقه</Text>
                           </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('FavouritsPage', {
                           api_token: this.state.api_token,
                           user_id: this.state.user_id
                        })}>
                           <View style={{ backgroundColor: '#0d3c9b', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/37.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>مفضلاتى</Text>
                           </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutUs')}>
                           <View style={{ backgroundColor: '#401b60', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/38.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>عن التطبيق</Text>
                           </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUs', {
                           api_token: this.state.api_token,
                           user_id: this.state.user_id
                        })}>
                           <View style={{ backgroundColor: '#401b60', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/39.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>مساعده</Text>
                           </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Privacy')}>
                           <View style={{ backgroundColor: '#401b60', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/33.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}>الشـــروط والأحكـــام</Text>
                           </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.submit()}>
                           <View style={{ backgroundColor: '#401b60', marginBottom: 2, height: 40, flexDirection: 'row-reverse' }}>
                              <Image source={require('../img/icon/40.png')} style={{ margin: 10, width: 20, height: 20 }} />
                              <Text style={{ color: '#fff', fontWeight: 'bold', paddingTop: 12 }}> تسجيل الخروج</Text>
                           </View>
                        </TouchableOpacity>


                     </List>

                  </View>
               </ScrollView>
            </Card>
            <View style={{ justifyContent: 'center', backgroundColor: '#213a65' }}>
               <Icon onPress={() => this.props.navigation.closeDrawer()}>
                  <Image source={require('../img/icon/arrow.png')} style={{ width: 30, height: 30 }} />
               </Icon>
            </View>
         </View>
      )
   }
}

