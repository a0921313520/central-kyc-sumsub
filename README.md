# central-kyc-sumsub

# web
- import Sumsub from 'central-kyc-sumsub/SumsubWeb'
- <Sumsub res={{token: '', lang: 'zh'}} tokenPromise={() => {}} callBack={() => {}} />

# app
- import Sumsub from 'central-kyc-sumsub/SumsubNative'
- Sumsub({token: '', lang: 'zh'}, tokenPromise={() => {}}, callBack={() => {}})


- callBack时候去call api检查是否完成验证，tokenPromise放get token api Promise，return Promise.resolve(token)，用于刷新token
