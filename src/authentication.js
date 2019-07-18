let jwt = require('jsonwebtoken');
let fs = require('fs');

module.exports = {
    authentication: function (req, res, next) {
        let authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            res.status(401).send({
                error: 'No Authorization token provided. Please provide a valid JWT in your Authorization header.'
            });
        }
        let token = authorizationHeader.split(" ")[1];
        if (!token) {
            res.status(401).send({
                error: 'No Authorization token provided. Please provide a valid JWT in your Authorization header.'
            });
        }
        let publicKey = fs.readFileSync('public.key');
        // TODO return 401 if token verification fails
        let result = jwt.verify(token, publicKey, {algorithm: "RS256"});
        req.userId = result.userId;
        console.log(result);
        next();
    }
};
