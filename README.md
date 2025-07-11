# central-kyc-sumsub




# web
- import Sumsub from 'central-kyc-sumsub/SumsubWeb'
- <Sumsub res={{token: '', lang: 'zh', theme: 'dark'}} tokenPromise callBack /> theme = "dark" | "light",
- tokenPromise=() => { Promise，return API Promise.resolve(token) } 放get token api Promise，return Promise.resolve(token)，用于刷新token
- callBack=(type, res) => {}

# app
- import Sumsub from 'central-kyc-sumsub/SumsubNative'
- Sumsub({token: '', lang: 'zh'}, tokenPromise, callBack)
- tokenPromise=() => { Promise，return API Promise.resolve(token) } 放get token api Promise，return Promise.resolve(token)，用于刷新token
- callBack=(type, res) => {}

