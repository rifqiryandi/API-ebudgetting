let CONF = require('../../config/config')

let verification = (verify_payload, validation_key) => {
    let params = verify_payload[0]
    return new Promise(async function (resolve) {
        try {
            let secretKey = CONF.ENV.SECRET.VALIDATION_KEY
            let arrObj = Object.values(params)
            let joinObj = secretKey + ',' + (arrObj.join())
            let buff = Buffer.from(joinObj, 'utf-8');
            let base64 = buff.toString('base64');
            if (base64 == validation_key) {
                resolve('valid')
            } else {
                resolve('invalid')
            }
        } catch (error) {
            resolve(false)
        }
    });
}

module.exports = { verification };