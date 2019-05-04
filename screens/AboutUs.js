import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { Header, Button, Container, Content, Card } from 'native-base';
import BackComponent from './components/BackComponent';

export default class AboutUs extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSource:'',
            isLoading:true
        }
    }
    componentDidMount() {
        fetch('https://drabraj.com/Apis/settings')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 200) {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.data.about
                    })
                } 
            })
            .catch((error) => {
                console.warn(error);
                
            })
    }
    renderFunction(){
        const regex = /(?:&nbsp;|<br>|<p>|<\/p>|<br \/>|&ndash;|&rlm;|&lrm;)/g;
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size="large" color="#f9d778" style={{ alignSelf: 'center' ,marginTop:'60%'}} />
            )
        }
        else {
            return (
                <Content>
                <View style={{ alignItems: 'center' ,marginTop:'15%'}}>
                    <Image source={require('./img/icon/54.png')} style={{ width: 80, height: 140 }}></Image>
                        <Card style={{ padding: 15, width: '90%', backgroundColor: '#192a4a', borderRadius: 30}}>
                            <Text style={{ color: '#fff', textAlign: 'center' }}>{this.state.dataSource.replace(regex, '')}</Text>
                        </Card>
                    </View>
                    </Content>
            )}
    }

    render() {
        return (
            <Container>
                 <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                    <View style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                        </Button>
                    </View>
                    <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV' }}>
                         عــن التطبيـــــق
                    </Text></View>
                </Header>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', flex: 1 }}>
                    {this.renderFunction()}
                </ImageBackground>
            </Container>
        );
    }
}

