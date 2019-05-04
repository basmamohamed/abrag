
import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Spinner, Header, Button, Container, Content, Card, CardItem, Left, List, ListItem, Item, Input } from 'native-base';

export default class Reports extends Component {

     
    renderCardsFunction() {
        let reports = this.props.navigation.getParam('reports');
          
        return (
            <View>
                {reports.map((item, key) => (
                    <Card key={key}
                        style={{
                            backgroundColor: '#1c2d4c',
                            borderRadius: 20, borderWidth: 0,
                            borderColor: '#1c2d4c',
                            width: '90%',
                            alignSelf: 'center'
                        }}>
                        <List style={{ margin: 20 }}>
                            <ListItem style={{ flexDirection: 'row-reverse', borderBottomWidth: 0 }}>
                                <View style={{ flex: 1, justifyContent: 'center', borderRadius: 40, width: 60, height: 40, padding: 5 }}>
                                    <Text style={{ color: '#f9d778', fontSize: 15, }}>
                                        {item.title}
                                    </Text>
                                </View>
                                {/* <Image source={require('./img/icon/76.png')} style={{ flex: 1, width: 50, height: 50, marginHorizontal: 10 }} /> */}
                                <View style={{ flex: 1, justifyContent: 'center', borderRadius: 40, width: 40, height: 40, padding: 5 }}>
                                    <Text style={{ color: '#e93a59', fontSize: 15 }}>  </Text>
                                </View>
                            </ListItem>
                            <View style={{ color: '#fff', padding: 10, borderRadius: 10, width: '100%' }}>
                                <Text style={{ color: '#fff' }}>
                                    {item.body}
                                </Text>
                            </View>
                        </List>
                    </Card>
                ))}
            </View>
        )
    };
    render() {
        let title =  this.props.navigation.getParam('title')
        return (
            <Container>
                <Header style={{ paddingTop: 10, flexDirection: 'row-reverse', backgroundColor: '#24314b', borderBottomWidth: 2, borderBottomColor: '#fff', }}>
                    <View style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={require('./img/icon/24.png')} style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
                        </Button>
                    </View>
                    <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV' }}>
                        الخدمـــــــات
                    </Text></View>
                </Header>

                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', }}>
                    <Content>
                        <View style={{ width: "90%", alignSelf: 'center' }}>
                            <ImageBackground source={require('./img/icon/bg2.png')}
                                style={{ width: '100%', height: '100%', marginTop: 20, alignSelf: 'center', marginBottom: 50, paddingBottom: 50 }}>
                                <View style={{ flexDirection: 'row-reverse', margin: 30, alignSelf: 'center' }}>
                                    <Text
                                        style={{
                                            color: '#f9d778',
                                            fontSize: 15, fontWeight: 'bold',
                                            textAlign: 'center', margin: 10
                                        }}>
                                        تقرير
                            </Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 15, fontWeight: 'bold',
                                        textAlign: 'center', margin: 10
                                    }}>
                                        {title}
                                    </Text>

                                </View>

                                {this.renderCardsFunction()}

                            </ImageBackground>
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

