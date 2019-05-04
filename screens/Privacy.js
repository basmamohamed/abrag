import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { Header, Button, Container, Content, Card } from 'native-base';

export default class Privacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privacy: '',
            terms: '',

        }
    }

    componentDidMount() {
        fetch('https://drabraj.com/Apis/settings')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 200) {
                    this.setState({
                        privacy: responseJson.data.privacy,
                        terms: responseJson.data.terms
                    })
                }
            })
            .catch((error) => {
            })
    }


    render() {
        const regex = /(?:&nbsp;|<br>|<p>|<\/p>|<br \/>|&rlm;|&lrm;|&ndash;|&rdquo;|&rsquo;|&ldquo;|&quot;|&bull;|&#39;|<p style="text-align:right">)/g;
        return (
            <Container>
                <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                    <View style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                        </Button>
                    </View>
                    <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV' }}>
                        الشـــروط والأحكــام
                    </Text></View>
                </Header>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center' }}>
                    <Content>
                        <Text style={{ textAlign: 'center', color: '#f9d778', fontFamily: 'STV', padding: 10 }}>
                            {this.state.privacy.replace(regex, '')}
                            {this.state.terms.replace(regex, '')}
                        </Text>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

