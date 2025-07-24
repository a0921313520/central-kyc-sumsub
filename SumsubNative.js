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
            // === 背景 ===
            backgroundCommon: getColor("#f5f5f5", "#16151c"),
            bottomSheetBackground: getColor("#ffffff", "#333C4D"),
            bottomSheetHandle: getColor("#D1D6E1", "#FFFFFF"),
            backgroundNeutral: getColor("#EDEDED", "#2A2E39"),

            // === 文字 ===
            contentStrong: getColor("#333C4D", "#FFFFFF"),
            contentWeak: getColor("#94A0B8", "#999999"),
            contentNeutral: getColor("#5C6B8A", "#CCCCCC"),
            contentLink: getColor("#1693E9", "#4DA6FF"),
            contentInfo: getColor("#1693E9", "#4DA6FF"),
      
            // === 欄位 ===
            fieldBackground: getColor("#EDEDED", "#2A2E39"),
            fieldContent: getColor("#333C4D", "#FFFFFF"),
            fieldPlaceholder: getColor("#94A0B8", "#999999"),
            fieldTint: getColor("#1693E9", "#4DA6FF"),
      
            // === Primary 按鈕 ===
            primaryButtonBackground: getColor("#00A826", "#00A826"),
            primaryButtonContent: getColor("#FFFFFF", "#FFFFFF"),
            primaryButtonBackgroundDisabled: getColor("#A6DAB3", "#4C6E57"),
            primaryButtonContentDisabled: getColor("#444444", "#AAAAAA"),
            primaryButtonBackgroundHighlighted: getColor("#008F20", "#008F20"),
            primaryButtonContentHighlighted: getColor("#FFFFFF", "#FFFFFF"),
      
            // === Secondary 按鈕 ===
            secondaryButtonBackground: getColor("transparent", "transparent"),
            secondaryButtonContent: getColor("#1693E9", "#4DA6FF"),
            secondaryButtonContentDisabled: getColor("#A1D2F7", "#777777"),
            secondaryButtonContentHighlighted: getColor("#1693E9", "#4DA6FF"),
            secondaryButtonBackgroundHighlighted: getColor("#E8F4FD", "#072F4B"),
      
            // === 導覽列 / 提示 / List ===
            navigationBarItem: getColor("#94A0B8", "#AAAAAA"),
            alertTint: getColor("#1693E9", "#1485D1"),
            toolbarTint: getColor("#5C6B8A", "#CCCCCC"),
            listSeparator: getColor("#D1D6E1", "#555555"),
            listSelectedItemBackground: getColor("#EDEDED", "#2A2E39"),
          }
        }
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