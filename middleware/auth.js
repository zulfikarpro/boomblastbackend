const jwt = require('jsonwebtoken');
const findUser = require('./finduser')
module.exports  = (req, res, next) => {
    const header = req.headers;
    const token = header.authorization.split(' ')[1];
    if (!token) {
      return res.code(200).send({
        status: 400,
        message: 'not authorized',
      });
    }else{
        jwt.verify(token, process.env.JWT_ADMIN_AUTH, (err, decode_one) => {
            if(!decode_one){
                return res.code(200).send({
                    status: 400,
                    message: 'not authorized',
                })
            }else{
                // console.log(decode_one.user)
                const user = findUser(decode_one.user);
                req.id = user.id;
                // next(req)
            }
        })
    }
    return next;
};

// module.exports = (req, res, next) => {
//     const header = req.headers;
//     if (!header.authorization) {
//       return res.code(200).send({
//         status: 400,
//         message: 'not authorized',
//       });
//     }
//     // // if (header.apipassword !== '123456') {
//     //   return res.code(200).send({
//     //     status: 400,
//     //     message: 'not authorized',
//     //   });
//     // // }
//     return next;
//   };
  