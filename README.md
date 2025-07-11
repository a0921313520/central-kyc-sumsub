# central-kyc-sumsub




# web
- import Sumsub from 'central-kyc-sumsub/SumsubWeb'
- <Sumsub res={{token: '', lang: 'zh'}} tokenPromise callBack />
- tokenPromise=() => { Promise，return API Promise.resolve(token) } 放get token api Promise，return Promise.resolve(token)，用于刷新token
- callBack=({status: type, payload}) => {}

# app
- import Sumsub from 'central-kyc-sumsub/SumsubNative'
- Sumsub({token: '', lang: 'zh'}, tokenPromise, callBack)
- tokenPromise=() => { Promise，return API Promise.resolve(token) } 放get token api Promise，return Promise.resolve(token)，用于刷新token
- callBack=(type, res) => {}

