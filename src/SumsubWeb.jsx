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
            tokenPromise = () => { return Promise.resolve('token') },
        } = this.props
        return (
            <SumsubWebSdk
                accessToken={res.token || ''}
                expirationHandler={tokenPromise}
                config={{ lang: res.lang || "zh" }}
                options={{ addViewportTag: false, adaptIframeHeight: true }}
                onMessage={(type, payload) => {
                    // callBack({status: type})
                }}
                onError={(error) => {
                    callBack({status: 'Failed'})
                }}
                className='sumsub-websdk-container'
            />
        );
    }
}

export default SumsubWeb
