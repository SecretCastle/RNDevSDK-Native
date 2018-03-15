import React, { Component } from 'react'
import { TouchableWithoutFeedback, Text, View, Image } from 'react-native';

class TouchButton extends Component {
    render () {
        return (
            <TouchableWithoutFeedback
                onPress={this.props.onPress}
            >
                <View
                    style={{
                        alignItems: 'center',
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 5,
                        paddingRight: 5,
                        borderRadius: 10
                    }}
                >
                    <Image source={this.props.img} />
                    <Text style={{ lineHeight: 28 }}>{this.props.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default TouchButton;