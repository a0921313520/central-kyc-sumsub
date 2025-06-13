import Sumsub from '@sumsub/react-native-mobilesdk-module';

let loading = false
let sdkInstance = null;

const sumsubSDK = async (res = {}, tokenPromise = () => { return Promise.resolve('token') }, callBack = () => { }) => {
    const token = res.token || ''

    const getSDK = () => {
        const sdk = Sumsub
            .init(token, tokenPromise)
            .withHandlers({
                onStatusChanged: (res) => {
                    let status = res.newStatus
                    if (status.includes('Failed')) {
                        sdkInstance && sdkInstance.dismiss()
                    }
                }
            })
            .withLocale(res.lang || 'zh')
            .withDebug(false)
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
        callBack({ status })

    } catch (error) {
        alert('err')
    } finally {
        setTimeout(() => {
            loading = false
        }, 2000);
    }
}

export default sumsubSDK