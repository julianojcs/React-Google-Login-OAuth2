var express = require('express');
var router = express.Router();
var db = require('../db');
const config = require('../config');
var bcrypt = require('bcrypt');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

/* POST new user. */
router.post('/register', (req, res, next)  => {
    const { name, email, password } = req.body.userData;

    const hash = bcrypt.hashSync(password, config.SALT_ROUNDS);
    const dataToInsert = {
        name,
        email,
        password: hash
    }

    const handler = (err, result) => {
        if (!err) {
            res.json({
                success: true,
                message: 'User registered.',
                data: result
            });
        } else {
            res.json({
                success: false,
                message: 'User not registered.',
                error: err
            });
        }
    }
    db.register(dataToInsert, handler);
});
  

module.exports = router;
