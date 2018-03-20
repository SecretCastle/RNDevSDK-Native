import React, { Component } from 'react';
import { 
    View,
    Dimensions, 
    Text, 
    TouchableWithoutFeedback,
    Button,
    Modal
} from 'react-native';
import Picker from 'react-native-picker';
import { TimeCreator, DateCreator } from '../utils/tools';

class Scroll extends Component {
    constructor(props) {
        super(props);
        const { type } = props;
    }
    componentDidMount () {
        const { type, okFn, cancelFn, currentTime, title } = this.props;
        const data = this.createDataByType(type);
        Picker.init({
            pickerData: data.data,
            selectedValue: currentTime,
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnColor: [111, 203, 185, 1],
            pickerCancelBtnColor: [111, 203, 185, 1],
            wheelFlex: [1,1,1],
            pickerBg: [255, 255, 255, 1],
            pickerToolBarBg: [255, 255, 255, 1],
            pickerTextEllipsisLen: 10,
            pickerTitleText: title,
            onPickerConfirm: data => {
                okFn(data);
            },
            onPickerCancel: data => {
                cancelFn(data);
            },
            onPickerSelect: data => {
                console.log('select');
            }
        });
    }

    createDataByType(type) {
        const obj = {};
        switch (type) {
            case 'Timer':
                obj['data'] = TimeCreator();
                break;
            case 'Date':
                obj['data'] = DateCreator();
                break;
            default:
                break;
        }
        console.log(obj);
        return obj;
    }

    showPicker() {
        Picker.show();
    }
    
    render () {
        return null;
    }
}

export default Scroll;