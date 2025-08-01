import Sumsub from '@sumsub/react-native-mobilesdk-module';
import { Platform } from "react-native";

let loading = false
let sdkInstance = null;
let actionId = ''

const sumsubSDK = async (res = {}, tokenPromise = () => { return Promise.resolve('token') }, callBack = () => { }) => {
    const token = res.token || ''
    actionId = ''


    const getSDK = () => {
        const sdk = Sumsub
            .init(token, tokenPromise)
            .withHandlers({
                onStatusChanged: (res) => {
                    let status = res.newStatus
                    if (status.includes('Failed')) {
                        sdkInstance && sdkInstance.dismiss()
                    }
                    callBack('onStatusChanged', res)
                },
                onEvent: (event) => {
                    callBack('onEvent', event)
                },
                onLog: (event) => {
                    console.log('onLog ===>', JSON.stringify(event))
                    try {
                        const message = event?.message?.toString() || ''
                        if(Platform.OS === 'android') {
                            if(message.includes('applicantActionId')) {
                                const jsonData = JSON.parse(message.replace(/^WebSocketListener\.onMessage: text=/, ''))
                                actionId = jsonData.payload.applicantActionId
                                callBack('onActionIdExtracted', { actionId });
                                console.log('actionId in sumsub', actionId)
                            }
                        } else {
                            if(message.includes('actionId=')) {
                                const match = message?.match(/actionId=([^ ]+)/);
                                actionId = match ? match[1] : null;
                                callBack('onActionIdExtracted', { actionId });
                            }
                        }
                    } catch (error) { }
                },
            })
            .withLocale(res.lang || 'zh')
            .withDebug(true)
            .withTheme(res.style || {universal: {colors: {}}})            
            .build();
        sdkInstance = sdk;
        return sdk;
    };

    if (loading) { return }
    try {
        loading = true
        const sdk = getSDK()
        const result = await sdk.launch()
        let status = result.status
        if (status.includes('Failed')) {
            status = 'Failed'
        }
        callBack('onLaunch', {...result, actionId: actionId})

    } catch (error) {
        alert('err')
    } finally {
        setTimeout(() => {
            loading = false
        }, 2000);
    }
}

export default sumsubSDK