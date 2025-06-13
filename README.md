# central-kyc-sumsub

# web
- import Sumsub from 'central-kyc-sumsub/SumsubWeb'
- <Sumsub res={{token: '', lang: 'zh'}} tokenPromise={() => {}} callBack={() => {}} />

# app
- import Sumsub from 'central-kyc-sumsub/SumsubNative'
- Sumsub({token: '', lang: 'zh'}, tokenPromise=() => {}, callBack=() => {})


- tokenPromise=() => { Promise，return API Promise.resolve(token) }
- tokenPromise放get token api Promise，return Promise.resolve(token)，用于刷新token

- callBack=({status: 'Failed'}) => {} status = 'Failed' token可能无效重新进入，(app Sumsub关闭会调用callBack)
