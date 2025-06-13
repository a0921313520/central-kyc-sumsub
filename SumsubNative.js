import Sumsub from '@sumsub/react-native-mobilesdk-module';

const sumsubSDK = (res = {}, tokenPromise = () => { }, callBack = () => { }) => {
    const token = res.token || ''

    const expirationHandler = () => {
        // 这里可以实现token过期时的刷新逻辑，暂时直接返回Promise.resolve(token)
        return Promise.resolve(token);
    };

    const getSDK = () => {
        return Sumsub
            .init(token, tokenPromise)
            .withHandlers({
                onStatusChanged: (status) => {
                    if (status.newStatus == 'Failed') {
                        // 访问过期
                        callBack(status)
                    }
                }
            })
            .withLocale(res.lang || 'zh')
            .withDebug(true)
            .build();
    };

    const startIDCardVerification = async () => {
        try {
            const sdk = getSDK();
            const result = await sdk.launch();
            callBack(result)
            console.log('验证结果:', result);

        } catch (error) {
            callBack(error)
            console.log('Error:', error);
        }
    };

    return startIDCardVerification
}

export default sumsubSDK