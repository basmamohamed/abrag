import React, { Component } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import {
	createDrawerNavigator,
	createAppContainer
} from 'react-navigation';

import RecentArtical from '../screens/RecentArtical';
import MenuDrawer from '../screens/components/MenuDrawer';
import ArticalDetails from '../screens/ArticalDetails';
import ServiceType from '../screens/ServiceType';
import ConfirmServices from '../screens/ConfirmServices';
import Service from '../screens/Service';
import ServiceTwice from '../screens/ServiceTwice';
import ConfirmServicesSecoundPerson from '../screens/ConfirmServicesSecoundPerson';
import ConfirmServicesFirstPerson from '../screens/ConfirmServicesFirstPerson';
import Reports from '../screens/Reports';
import Coupon from '../screens/Coupon';
import ProfilePage from '../screens/ProfilePage';
import UpdatePassword from '../screens/UpdatePassword';
import ProfileData from '../screens/ProfileData';
import AboutUs from '../screens/AboutUs';
import FavouritsPage from '../screens/FavouritsPage';
import ServicesHistory from '../screens/ServicesHistory';
import Offers from '../screens/Offers';
import ContactUs from '../screens/ContactUs';
import Login from '../screens/Login';
import Notification from '../screens/Notification';
import YouTube from '../screens/YouTube';
import Privacy from '../screens/Privacy';
import PaymentWay from '../screens/PaymentWay';
import MasaryForm from '../screens/MasaryForm';


const WIDTH = Dimensions.get('window').width;
const DrawerConfig = {
	drawerWidth: WIDTH * 0.83,
	drawerPosition: 'right',
	drawerLockMode: 'locked-open',
	contentComponent: ({ navigation }) => {
		return (<MenuDrawer navigation={navigation} />)
	}
}

const DrawerNavigator = createDrawerNavigator(

	{
		RecentArtical: {
			screen: RecentArtical
		},
		Notification: {
			screen: Notification
		},
		PaymentWay: {
			screen: PaymentWay
		},
		MasaryForm: {
			screen: MasaryForm
		},
		UpdatePassword: {
			screen: UpdatePassword
		},
		ServicesHistory: {
			screen: ServicesHistory
		},
		Privacy: {
			screen: Privacy
		},
		Login: {
			screen: Login
		},
		YouTube: {
			screen: YouTube
		},
		AboutUs: {
			screen: AboutUs
		},
		Offers: {
			screen: Offers
		},
		ContactUs: {
			screen: ContactUs
		},
		FavouritsPage: {
			screen: FavouritsPage
		},
		ProfileData: {
			screen: ProfileData
		},
		ConfirmServicesFirstPerson: {
			screen: ConfirmServicesFirstPerson
		},
		ServiceType: {
			screen: ServiceType
		},
		Reports: {
			screen: Reports
		},
		Coupon: {
			screen: Coupon
		},
		ServiceTwice: {
			screen: ServiceTwice
		},
		Service: {
			screen: Service
		},
		ConfirmServices: {
			screen: ConfirmServices
		},
		ProfilePage: {
			screen: ProfilePage
		},
		ArticalDetails: {
			screen: ArticalDetails
		},
		ConfirmServicesSecoundPerson: {
			screen: ConfirmServicesSecoundPerson
		},
	},

	DrawerConfig,

);

export default createAppContainer(DrawerNavigator);