
import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, Linking, AsyncStorage,Platform , Share } from 'react-native';
import { Spinner, Header, Button, Container, Content, Card, CardItem, Left, List, ListItem, Item, Input } from 'native-base';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class ArticalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            api_token: '',
            article_id: '',
            share_url: this.props.navigation.getParam('share_url'),
            user_id: '',
            likeimg: require('./img/icon/45.png'),
            body: '',
            backgroundColorComment: '#ddd',
            pressed: 0
        }
    }

    LoadInitialState = async () => {
        let value = await AsyncStorage.getItem('user_id');
        let api_token = await AsyncStorage.getItem('api_token');
        let article_id = this.props.navigation.getParam('article_id');
        this.setState({ api_token: api_token, user_id: value ,article_id:article_id})
    }

    updateValue(text, field) {
        if (field == 'comment') {
            this.setState({
                body: text,
                backgroundColorComment: '#ddd'
            })
        }
    }
    

    componentDidMount(){
        let api_token =  this.props.navigation.getParam('api_token');
        let article_id = this.props.navigation.getParam('article_id');
        this.setState({ api_token: api_token,article_id:article_id})
        
        fetch('https://drabraj.com/Apis/comments?api_token=' + api_token + '&article_id=' + article_id)
         .then((response) => response.json())
         .then((responseJson) => {
            if (responseJson.status == 200) {
                this.setState({
                    comments: responseJson.comments
                })
            }  
         })
         .catch((error) => {
            // console.warn(error)
         })
        { this.LoadInitialState() }
    }


    renderCommentsFunction() {
        return (
            <View style={{ flexDirection: 'row-reverse' }}>
                <List style={{ width: '100%' }}>
                    {this.state.comments.map((item, key) => (
                        <ListItem key={key} style={{ borderBottomWidth: 0, flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end' }}>
                                <View style={{ backgroundColor: "#fff", borderRadius: 40, width: 40, height: 40, padding: 5 }}>
                                    <Image source={{ uri: item.image_url }} style={{ width: 25, height: 25 }} />
                                </View>
                                <View style={{ flexDirection: 'column', margin: 5 }}>
                                    <Text style={{ color: '#fff', fontSize: 14, fontFamily: "STV" }}> {item.username}  </Text>
                                    <Text style={{ color: '#aaa', fontFamily: "STV" }} note>    </Text>
                                </View>
                            </View>
                            <View style={{ color: '#fff', borderColor: "#fff", borderWidth: 1, padding: 10, borderRadius: 10, width: '100%' }}>
                                <Text style={{ color: '#fff', fontFamily: "STV" }}>  {item.body}  </Text>
                            </View>
                        </ListItem>
                    ))}
                </List>
            </View>
        )
    };

    like() {
        let formData = {}
        formData.user_id = this.state.user_id;
        formData.article_id = this.state.article_id;
        formData.api_token = this.state.api_token;
        if (this.state.pressed == 0) {
            var url = 'https://drabraj.com/Apis/articles/like';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    // console.warn(response);
                    if (response.status == 200) {
                        this.setState({
                            likeimg: require('./img/icon/48.png'),
                            pressed: 1
                        });
                    } else {
                        this.setState({
                            likeimg: require('./img/icon/45.png')
                        });
                    }
                })
                .catch(error => {
                    // console.warn('error');
                });
        }
    };

    comment() {
        let formData = {}
        formData.body = this.state.body;
        formData.user_id = this.state.user_id;
        formData.article_id = this.state.article_id;
        formData.api_token = this.state.api_token;
        // console.warn(formData);
        if (formData.body == "") {
            this.setState({ backgroundColorComment: "#660000" })
        } else {
            var url = 'https://drabraj.com/Apis/comments';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    this.refs.toast.show(response.message, DURATION.LENGTH_LONG);
                    this.setState({
                        body: ''
                    });
                    this.componentWillMount();
                })
                .catch(error => {
                    // console.warn('error');
                });
        }
    };

    share = () => {
         Share.share({message: this.state.share_url , title:"Dr-Abrag"})
         .then( )
         .catch( );
    }

    render() {
        let title = this.props.navigation.getParam('title');
        let body = this.props.navigation.getParam('body');
        let image = this.props.navigation.getParam('atricalImage');
        return (
            <Container>
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
                    <View style={{ flex: 2, }}><Text style={{ color: '#fff', marginTop: 15, marginRight: 18, fontFamily: 'STV-Bold' }}>
                        أحـــدث المقـــالات
                    </Text></View>
                </Header>
                <ImageBackground source={require('./img/icon/bg3.png')} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center' }}>
                    <Content>
                        <View style={{
                            width: '90%', alignSelf: 'center',
                            backgroundColor: '#192a4a', borderRadius: 30, padding: 10,
                            marginTop: 50,
                            borderColor: '#fff',
                            borderWidth: 1
                        }}>
                            <Image source={require('./img/icon/43.png')} style={{ width: 32, height: 32, alignSelf: 'flex-end' }} />
                            <View style={{ alignSelf: 'center', margin: 10 }}>
                                <Image source={{ uri: image }} style={{ height: 300, width: 300 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ color: '#fff' }}>
                                    {title}
                                </Text>
                                <Text style={{ color: '#aaa', fontSize: 12, fontFamily: "STV" }} note>
                                    1 ساعه
                                </Text>
                                <Text style={{ color: '#fff', }} note>
                                    {body}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', padding: 10, borderTopWidth: 1, borderTopColor: '#fff' }}>
                                <Button onPress={() => this.like()} transparent style={{ flexDirection: 'row-reverse', marginHorizontal: 20 }}>
                                    <Text style={{ color: '#fff', fontFamily: "STV" }}>اعجبنى</Text>
                                    <Image source={this.state.likeimg} style={{ width: 25, height: 25, margin: 3 }} />
                                </Button>
                                <Button transparent style={{ flexDirection: 'row-reverse', marginHorizontal: 20 }}>
                                    <Text style={{ color: '#fff', fontFamily: "STV" }}>تعليق</Text>
                                    <Image source={require('./img/icon/46.png')} style={{ width: 25, height: 25, margin: 3 }} />
                                </Button>
                                <Button onPress={() => this.share()} transparent style={{ flexDirection: 'row-reverse', marginHorizontal: 20 }}>
                                    <Text style={{ color: '#fff', fontFamily: "STV" }}>مشاركة</Text>
                                    <Image source={require('./img/icon/47.png')} style={{ width: 25, height: 25, margin: 3 }} />
                                </Button>
                            </View>

                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Item style={{ flexDirection: 'row-reverse', borderBottomWidth: 0, flex: 9 }}>
                                    <Input onChangeText={(text) => this.updateValue(text, 'comment')} value={this.state.body}
                                        style={{ padding: 10, flexDirection: 'row-reverse', backgroundColor: this.state.backgroundColorComment, borderRadius: 10 }} placeholder="اكتـب تعليـق" />
                                </Item>
                                <Button onPress={() => this.comment()} style={{ backgroundColor: '#ddd', padding: 10, flex: 1, margin: 10 }}><Text>نشـر</Text></Button>
                            </View>

                            {/*  */}
                            {this.renderCommentsFunction()}
                            {/*  */}
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}