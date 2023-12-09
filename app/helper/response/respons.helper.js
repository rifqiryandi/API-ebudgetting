function responCheck(params, res) {
    let code = params[0].code
    let message = params[0].message
    let result = params[0].result

    switch (code) {
        case 200: // responCode
            res.status(200).json({
                'responCode': 200,
                'environment': process.env.NODE_ENV,
                'message': message,
                'data': result
            })
            break;

        case 400: // responCode
            res.status(400).json({
                'responCode': 400,
                'environment': process.env.NODE_ENV,
                'message': message,
                'data': result
            })
            break;
    }
}

module.exports = { responCheck }