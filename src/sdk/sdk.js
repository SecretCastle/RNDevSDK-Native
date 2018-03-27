import { NativeModules, NativeEventEmitter } from 'react-native';

/**
 *
 * PLATFORM
 *
 * localhost: 本地调试
 * Native: app调试
 */
const PLATFORM = "localhost"; // localhost | Native


const HOST = "192.168.19.118";
const PORT = "9901";


const client = new WebSocket(`ws://${HOST}:${PORT}`);
client.onopen = function() {
    console.log('WebSocket Connect Success');
}

client.onerror = function() {
    console.log('发生错误');
}

client.onclose = function() {
    console.log('客户端关闭');
}

/**
 * 工具类方法
 */
const Tools = {
    paramTransfor(type, data) {
        /**
         * 下发数据格式转换函数
         *
         * 上报的结构
         * {
         *      "dp_key_array": ["WorkMode", "Power"],
         *      "dp_value": {
         *          "WorkMode": "1",
         *          "Power": "1"
         *      }
         * }
         *
         * 下发的结构
         *
         * {
         *      "WorkMode": "1",
         *      "Power": "1"
         * }
         */

            // 接收到的上报数据
        const innerReceviedFactory = (data) => {
                // 这里只接受dp_value
                if (data.dp_value) {
                    return data.dp_value;
                }
                return {};
            }

        // 下发的数据
        const innerSendFactory = (data) => {
            const keys = this._keys(data);
            // const sendData = {
            //     'dp_key_array': keys,
            //     'dp_value': data
            // }
            return [data];
        }

        // 判断是上报还是下发

        if (!type) {
            throw new Error('please select type');
        }

        if (type === 'received') {
            return innerReceviedFactory(data);
        } else if (type === 'send') {
            return innerSendFactory(data);
        }
    },
    _keys(obj) {
        const hasProperty = Object.prototype.hasOwnProperty;
        const keys = [];
        if (toString.call(obj) !== '[object Object]') {
            return obj;
        }
        for (let item in obj) {
            if (hasProperty.call(obj, item)) {
                keys.push(item);
            }
        }
        return keys;
    }
}

const helper = {
    packageForData: (data) => {
        const result = {
            dp_key_array: [],
            dp_value: {},
        };
        for (let key in data) {
            result.dp_key_array.push(key);
            result.dp_value[key] = data[key];
        }
        return result;
    },
};

/**
 * SDK 遵循ali接口定义规范
 */

const bridge = NativeModules.RNDataBridge;
const bridgeEmitter = new NativeEventEmitter(bridge);
const SDK = {
    Bridge: bridge,
    BridgeEmitter: bridgeEmitter,
    DataBridge: {
        /**
         * 绑定数据接口
         * @param {*} callback
         */
        bindPushData(callback) {
            if (PLATFORM === 'localhost') {
                client.onmessage = function(data) {
                    const receivedData = JSON.parse(data.data).data.data;
                    if (data) {
                        const transData = Tools.paramTransfor('received', receivedData);
                        callback(transData);
                    }
                }
            } else if (PLATFORM === 'Native') {
                SDK.BridgeEmitter.addListener('notification', (payload) => {
                    if (payload.type === 'devicestatuts') {
                        callback(payload.data);
                    }
                });
            }
        },
        /**
         * 下发数据接口
         * @param {*} data
         */
        setDeviceStatus: (data) => {
            console.log('PLATFORM', PLATFORM, data);
            const targetData = helper.packageForData(data);
            console.log('targetData', targetData);

            if (PLATFORM === 'localhost') {
                if (data) {
                    client.send(JSON.stringify(targetData));
                }
            } else if (PLATFORM === 'Native') {
                SDK.Bridge.send({
                    type: 'command',
                    data: targetData
                });
            }
        },
        back: () => {
            console.log('back!!!');
            SDK.Bridge.send({
                type: 'back',
                data: {},
            });
        },
        loadPage: (pageName) => {
            console.log('@SDK call loadPage function');
            SDK.Bridge.send({
                type: 'loadPage',
                data: {
                    name: pageName,
                },
            });
        },
    },
    page: {
        deviceDetail: 'deviceDetail',
        timing: 'timing',
    },
};

export default SDK;