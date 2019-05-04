
import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, ActivityIndicator, ScrollView, AsyncStorage } from 'react-native';
import { Header, Button, Container, Content, Card, List } from 'native-base';
import NavigationService from '../NavigationService';

export default class RecentArtical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            isLoading: true,
            dataSource: [],
            categoriesData: [],
            category_type: 'all',
            page: 1,
            api_token:null,
            backgroundColorCategoy: '#24314b',
        }
    }
    

    async componentDidMount() {
        let apiToken = await AsyncStorage.getItem('api_token');
        this.setState({api_token:apiToken})
        fetch('https://drabraj.com/Apis/articles?api_token='+this.state.api_token+'&page='+this.state.page)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.warn(responseJson.articles.count)
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.articles.data,
                    categoriesData: responseJson.article_subjects,
                })
            })
            .catch((error) => {
                // console.warn(error)
            })
    }

    check_category_type(item, key) {
        const regex = /(?:&nbsp;|<br>|<p>|<\/p>|<br \/>|&rlm;|&lrm;|&apm;|<p style="text-align:right">)/g;
        if (this.state.category_type == item.article_subject_id) {
            return (
                <Card key={key} style={{ padding: 15, width: '90%', alignSelf: 'center', backgroundColor: '#192a4a', borderRadius: 30, }}>
                    <View style={{ flexDirection: 'row-reverse', }} >
                        <View style={{ flexDirection: 'column', flex: 2 }}>
                            <Text style={{ color: '#fff', fontFamily: 'STV-Bold' }}>
                                {item.title}
                            </Text>
                            <Text style={{ color: '#aaa', fontSize: 12, fontFamily: 'STV' }} note>
                                1 ساعه
                         </Text>
                            <Text style={{ color: '#fff', fontFamily: 'STV' }} note>
                                {item.body.substring(0, 200).replace(regex, '')}....
                        </Text>
                            <Button onPress={() => NavigationService.navigate('ArticalDetails', {
                                share_url : item.share_url, title: item.title,
                                body : item.body.replace(regex, ''),
                                article_id : item.id,
                                atricalImage : item.media.url,
                                comments : item.comments,
                                api_token : this.state.api_token
                            })} transparent style={{
                                borderColor: '#fff',
                                borderWidth: 1, borderRadius: 20, padding: 10, marginLeft: 5
                            }}>
                                <Text style={{ color: '#f9d778', textAlign: 'center', fontFamily: 'STV-Bold' }}>المزيــد</Text>
                            </Button>
                        </View>
                        <View style={{}}>
                            <Image source={{ uri: item.media.url }} style={{ width: 120, height: 160 }} />
                        </View>
                    </View>
                </Card>
            )
        }
    }

    renderAricalsFunction() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size="large" color="#f9d778" style={{ marginTop: 250, alignSelf: 'center', justifyContent: 'space-around', alignItems: 'center' }} />
            )
        }
        else {
            return (
                <Content>
                    {this.renderCategoriesFunction()}
                    {this.state.dataSource.map((item, key) => (
                        <View key={key}>
                            {this.check_category_type(item, key)}
                        </View>
                    ))}
                    {this.pagniation()}
                </Content>
            )
        }
    };

    renderCategoriesFunction() {
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
               
                {this.state.categoriesData.map((item, key) => (
                    <Button key={key} onPress={() => this.setState({ category_type: item.id, backgroundColorCategoy: '#ff3333' })}
                        style={{
                            backgroundColor: '#24314b', borderWidth: 1, borderColor: '#fff', borderRadius: 50, padding: 5, marginHorizontal: 10, marginVertical: 40,
                            justifyContent: 'center'
                        }}>
                        <Text style={{ color: '#f9d778', fontWeight: 'bold', textAlign: 'center', fontFamily: 'STV-Bold' }}> {item.name} </Text>
                    </Button>
                ))}
                 <Button onPress={() => this.setState({ category_type: 'all', backgroundColorCategoy: '#ff3333' })}
                    style={{
                        backgroundColor: '#24314b', borderWidth: 1, borderColor: '#fff', borderRadius: 50, padding: 5, marginHorizontal: 10, marginVertical: 40,
                        justifyContent: 'center'
                    }}>
                    <Text style={{ color: '#f9d778', fontWeight: 'bold', textAlign: 'center', fontFamily: 'STV-Bold' }}>عرض الكل</Text>
                </Button>
            </ScrollView>
        )
    };
    renderAll() {
        const regex = /(?:&nbsp;|<br>|<p>|<\/p>|<br \/>|&rlm;|&lrm;|&apm;|<p style="text-align:right">)/g
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size="large" color="#f9d778" style={{ marginTop: 250, alignSelf: 'center', justifyContent: 'space-around', alignItems: 'center' }} />
            )
        }
        else {
            return (
                <Content>
                    {this.renderCategoriesFunction()}
                    {this.state.dataSource.map((item, key) => (
                        <View key={key}>
                            <Card style={{ padding: 15, width: '90%', alignSelf: 'center', backgroundColor: '#192a4a', borderRadius: 30, }}>
                                <View style={{ flexDirection: 'row-reverse', }} >
                                    <View style={{ flexDirection: 'column', flex: 2 }}>
                                        <Text style={{ color: '#fff', fontFamily: 'STV-Bold' }}>
                                            {item.title}
                                        </Text>
                                        <Text style={{ color: '#aaa', fontSize: 12, fontFamily: 'STV' }} note>
                                            1 ساعه </Text>
                                        <Text style={{ color: '#fff', fontFamily: 'STV' }} note>
                                            {item.body.substring(0, 200).replace(regex, '')}....</Text>
                                        <Button onPress={() => NavigationService.navigate('ArticalDetails', {
                                            share_url: item.share_url, title: item.title,
                                            body: item.body.replace(regex, ''),
                                            article_id: item.id,
                                            atricalImage: item.media.url,
                                            comments: item.comments,
                                            api_token : this.state.api_token
                                        })} transparent style={{
                                            borderColor: '#fff',
                                            borderWidth: 1, borderRadius: 20, padding: 10, marginLeft: 5
                                        }}>
                                            <Text style={{ color: '#f9d778', textAlign: 'center', fontFamily: 'STV-Bold' }}>المزيــد</Text>
                                        </Button>
                                    </View>
                                    <View style={{}}>
                                        <Image source={{ uri: item.media.url }} style={{ width: 120, height: 160 }} />
                                    </View>
                                </View>
                            </Card>
                        </View>
                    ))}
                    {this.pagniation()}
                </Content>
            )
        }
    }
    renderArticals() {
        if (this.state.category_type == 'all') {
            return(
                <View>
            { this.renderAll() }
            </View>
            )
        } else {
            return(
                <View>
            { this.renderAricalsFunction() }
            </View>
            )
        }
    }

    pagniation() {
        return (
            <View style={{ flexDirection: 'row-reverse' }}>
                <Button onPress={() => this.next()} transparent style={{
                    borderColor: '#fff',
                    borderWidth: 1, borderRadius: 20, padding: 10, marginLeft: 5
                }}>
                    <Text style={{ color: '#f9d778', textAlign: 'center', fontFamily: 'STV-Bold' }}>التالية</Text>
                </Button>

                <Button onPress={() => this.back()} transparent style={{
                    borderColor: '#fff', marginRight: '65%',
                    borderWidth: 1, borderRadius: 20, padding: 10, marginLeft: 5
                }}>
                    <Text style={{ color: '#f9d778', textAlign: 'center', fontFamily: 'STV-Bold' }}>السابقة</Text>
                </Button>
            </View>
        )
    }

    next() {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.componentDidMount();
        })

    }

    back() {
        this.setState({
            page: this.state.page - 1,
        }, () => {
            this.componentDidMount();
        })
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
                        أحـــدث المقـــالات
                    </Text></View>
                </Header>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center' }}>
                    <Content>
                        {this.renderArticals()}
                    </Content>
                </ImageBackground>
            </Container>
        );
    }

}

