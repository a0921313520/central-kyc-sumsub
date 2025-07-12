import React, { Component } from 'react';
import snsWebSdk from '@sumsub/websdk';
class SumsubWeb extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.openSumsub()
    }
    openSumsub = () => {
        const {
            res = { token: 'token', theme: 'dark', lang: 'zh' },
            tokenPromise = () => { Promise.resolve('newAccessToken') },
            callBack = () => { },

        } = this.props
        let snsWebSdkInstance = snsWebSdk
            .init(
                res.token, tokenPromise,
            )
            .withConf({
                lang: res.lang,
                theme: res.theme,
            })
            .withOptions({ addViewportTag: false, adaptIframeHeight: true })
            .on("idCheck.onStepCompleted", (payload) => {
                callBack('onStepCompleted', payload)
            })
            .on("idCheck.onError", (error) => {
                callBack('onError', error)
            })
            .on("idCheck.onApplicantActionLoaded", (res) => {
                callBack('onApplicantActionLoaded', res)
            })
            .on("idCheck.onApplicantActionCompleted", (res) => {
                callBack('onApplicantActionCompleted', res)
            })
            .build();

        snsWebSdkInstance.launch("#sumsub-websdk-container");
    }
    render() {

        return (
            <div id="sumsub-websdk-container"></div>
        );
    }
}

export default SumsubWeb
