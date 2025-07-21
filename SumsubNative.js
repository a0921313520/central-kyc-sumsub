import Sumsub from '@sumsub/react-native-mobilesdk-module';
import { Platform } from "react-native";

let loading = false
let sdkInstance = null;
let actionId = ''

const sumsubSDK = async (res = {}, tokenPromise = () => { return Promise.resolve('token') }, callBack = () => { }) => {
    const token = res.token || ''
    actionId = ''

    const getColor = (light, dark) => res.theme === 'light' ? light : dark;
    const theme = {
      universal: {
        colors: {
          backgroundCommon: getColor("#f5f5f5", "#16151c"),
          navigationBarItem: getColor("#94A0B8", "#FFFFFF"),
          alertTint: getColor("#1693E9", "#1485D1"),
          toolbarTint: getColor("#5C6B8A", "#FFFFFF"),
          backgroundInfo: getColor("#E8F4FD", "#072F4B"),
          bottomSheetBackground: getColor("#FFFFFF", "#333C4D"),
          bottomSheetHandle: getColor("#D1D6E1", "#FFFFFF"),
          contentLink: getColor("#1693E9", "#1485D1"),
          contentInfo: getColor("#1693E9", "#1485D1"),
          contentNeutral: getColor("#5C6B8A", "#FFFFFF"),
          contentStrong: getColor("#333C4D", "#FFFFFF"),
          fieldBackground: getColor("#F6F7F9", "#FFFFFF"),
          fieldContent: getColor("#333C4D", "#FFFFFF"),
          fieldPlaceholder: getColor("#94A0B8", "#FFFFFF"),
          fieldTint: getColor("#1693E9", "#1485D1"),
          primaryButtonBackground: getColor("#1693E9", "#1485D1"),
          primaryButtonBackgroundDisabled: getColor("#A1D2F7", "#072F4B"),
          primaryButtonBackgroundHighlighted: getColor("#1485D1", "#0B4A75"),
          primaryButtonContentDisabled: getColor("#FFFFFF", "#0B4A75"),
          secondaryButtonBackgroundHighlighted: getColor("#E8F4FD", "#072F4B"),
          secondaryButtonContent: getColor("#1693E9", "#1485D1"),
          secondaryButtonContentDisabled: getColor("#A1D2F7", "#0B4A75"),
          secondaryButtonContentHighlighted: getColor("#1693E9", "#1485D1"),
        }
      },
    };
    
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
                            }
                        } else {
                            if(message.includes('actionId=')) {
                                const match = message?.match(/actionId=([^ ]+)/);
                                actionId = match ? match[1] : null;
                            }
                        }
                    } catch (error) { }
                },
            })
            .withLocale(res.lang || 'zh')
            .withDebug(true)
            .withTheme(theme)            
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