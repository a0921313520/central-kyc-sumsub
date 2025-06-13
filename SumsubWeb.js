import React, { Component } from 'react';
import SumsubWebSdk from '@sumsub/websdk-react'
class SumsubWeb extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            res = {},
            callBack = () => { },
            tokenPromise = () => { },
        } = this.props
        return (
            <SumsubWebSdk
                accessToken={res.token || ''}
                expirationHandler={tokenPromise}
                config={{ lang: res.lang || "zh" }}
                options={{ addViewportTag: false, adaptIframeHeight: true }}
                onMessage={(type, payload) => {
                    callBack(type)
                }}
                onError={(error) => {
                    callBack(error)
                }}
                style={{ width: '100%', height: '100%' }}
            />
        );
    }
}

export default SumsubWeb
