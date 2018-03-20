import React, { Component } from 'react'
import { View, Text, Button, Image, PixelRatio, Dimensions, TouchableOpacity } from 'react-native';
import Picker from 'react-native-picker';
import TouchButton from '../../components/TouchButton';
import Scroll from '../../components/poplayout';
import _sdk from '../../sdk/sdk';
// import Picker from 'react-native-picker';

const styles = {
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'rgb(111, 203, 185)',
        height: '100%'
    },
    bottomControl: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 114,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnIcon: {
        width: '30%',
        marginLeft: '1%',
        marginRight: '1%'
    }
}

class SocketPanel extends Component {
    state = {
        switch: 0,
        delaySwitch: 0,
        orderSwitch: 0,
        delayStatus: false,
        delaySelected: []
    }

    componentDidMount () {
        // _sdk.DataBridge.bindPushData(res => {
        //     this.renderDate(res);
        // });      
    }

    renderDate = (data) => {
        const power = Number(data.power);
        this.setState({
            switch: power
        })
    }

    ctrlFn = (target) => {
        switch(target) {
            case 0:
                const openstate = this.state.switch;
                openstate === 0 
                    ? this.setState({ switch: 1, delaySwitch: 0, orderSwitch: 0 })
                    : this.setState({ switch: 0, delaySwitch: 0, orderSwitch: 0 });
                _sdk.DataBridge.setDeviceStatus({
                    "power": this.state.switch === 0 ? "1" : "0"
                })
                break;
            case 1:
                // const delaystate = this.state.delaySwitch;
                const show = this.state.showModal;
                // delaystate === 0
                //     ? this.setState({ switch: 0, delaySwitch: 1, orderSwitch: 0 })
                //     : this.setState({ switch: 0, delaySwitch: 0, orderSwitch: 0 });
                this.scroll.showPicker();
                break;
            case 2:
                const orderstate = this.state.orderSwitch;
                orderstate === 0
                    ? this.setState({ switch: 0, delaySwitch: 0, orderSwitch: 1 })
                    : this.setState({ switch: 0, delaySwitch: 0, orderSwitch: 0 });
                break;
        }
    }
    okfn = (data) => {
        console.log(data);
        if (data) {
            this.setState({
                delayStatus: true,
                delaySelected: data
            })
        }
    }

    cancelfn = (data) => {
        console.log(data);
        
    }

    cancelDelay = () => {
        this.setState({
            delayStatus: false
        });
    }

    render () {
        const openImgUrl = this.state.switch === 0 
            ? require('../../assets/images/open.png') 
            : require('../../assets/images/openbright.png');
        const delaySwitchImgUrl = !this.state.delayStatus
            ? require('../../assets/images/delayClose.png') 
            : require('../../assets/images/delayClosegray.png');
        const orderSwitchImgUrl = this.state.orderSwitch === 0
            ? require('../../assets/images/orderSwitch.png')
            : require('../../assets/images/orderSwitchbright.png');
        return (
            <View style={styles.container}>
                <Scroll 
                    ref={picker => this.scroll = picker}
                    type={'Date'}
                    selectedValue={["00", "00"]}
                    okFn={this.okfn}
                    cancelFn={this.cancelfn}
                    title={'延迟关'}
                />
                <View>
                    <Image 
                        source={require('../../assets/images/socket.png')}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: Dimensions.get('window').height - 450
                        }}
                    />
                    <Image
                        source={require('../../assets/images/bg.png')}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height - 114
                        }}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 34, color: '#fff', lineHeight: 48 }}>
                        {
                            this.state.delayStatus
                            ? `${this.state.delaySelected[0]}小时${this.state.delaySelected[1]}后关闭`
                            : null
                        }
                    </Text>
                    {
                        this.state.delayStatus
                        ?   <TouchableOpacity onPress={this.cancelDelay}>
                                <Text style={{ textAlign: 'center', fontSize: 14 }}>取消延迟关闭</Text>
                            </TouchableOpacity>
                        :   null
                    }
                    
                </View>
                <View style={styles.bottomControl}>
                    <View style={styles.btnIcon}>
                        <TouchButton 
                            title="开关"
                            onPress={() => this.ctrlFn(0)}
                            img={openImgUrl}
                        />
                    </View>
                    <View style={styles.btnIcon}>
                        <TouchButton 
                            title="延时关"
                            onPress={() => this.ctrlFn(1)}
                            img={delaySwitchImgUrl}
                        />
                    </View>
                    <View style={styles.btnIcon}>
                        <TouchButton 
                            title="定时开关"
                            onPress={() => this.ctrlFn(2)}
                            img={orderSwitchImgUrl}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default SocketPanel;