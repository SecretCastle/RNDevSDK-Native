import React, { Component } from 'react';
import { 
    View,
    Dimensions, 
    Text, 
    TouchableWithoutFeedback,
    Button,
    Modal
} from 'react-native';

const styles = {
    bgBox: {
        position: 'relative'
    },
    container: {
        width: Dimensions.get('window').width,
        height: 300,
        backgroundColor: '#fff',
        zIndex: 999,
        top: Dimensions.get('window').height - 300
    },
    shadow: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#000',
        opacity: 0.5,
        top: 0,
        left: 0,
        zIndex: 100
    },
    showModal: {
        display: 'flex'
    },
    hideModal: {
        display: 'none'
    }
}

class Scroll extends Component {
    render () {
        const { show, okFn, cancelFn } = this.props;
        return (
            <Modal
                visible={show}
                transparent={true}
                animationType={"slide"}
                onRequestClose={cancelFn}
            >
                <View
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        position: 'relative', 
                        height:  Dimensions.get('window').height
                    }}
                >
                    <View style={styles.container}>
                        {this.props.children}
                        {
                            this.props.footer
                            ?   (<View style={{height: null, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <View style={{ width: 150 }}><Button title="确定" onPress={okFn} /></View>
                                    <View style={{ width: 150 }}><Button title={"取消"} onPress={cancelFn} /></View>
                                </View>)
                            :   null
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}

export default Scroll;