import React from 'react';
import { Button, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon, Left } from 'native-base';

class MyBackButton extends React.Component {
    render() {
        return (
            <Left style={{flex:1}}>
                <Icon onPress={() => { this.props.navigation.goBack() }} >
                    <Image source={require('../img/icon/23.png')} style={{ width: 30, height: 30 }} />
                </Icon>
            </Left>
        )
    }
}
export default withNavigation(MyBackButton);