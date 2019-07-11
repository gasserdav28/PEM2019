let jwt = require('jsonwebtoken');
let fs = require('fs');

module.exports = {
    authentication: function(req, res, next) {
        let token = req.headers.authorization;
        if (!token) {
            token = req.cookies.token;
            if (!token) {
                res.redirect('/g17/login');
            } else {
                let publicKey = fs.readFileSync('public.key');
                let result = jwt.verify(token, publicKey, {algorithm:  "RS256"});
                req.userId = result.userId;
                console.log(result);
                next();
            }
        }
    }
};