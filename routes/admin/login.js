'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../../models');
const admin = require('../../models/admin');
const findUser = require('../../middleware/finduser');
const adminDb = model.admin;

module.exports = async function (fastify, opts) {
  fastify.post('/login', async function (req, res) {
    // console.log(req.body);
    const {username, password} = req.body;
    const response = {message:'failed', status:201, data:{}}
    if(!username || !password){
      // console.log('response failed semua')
        response.status = 401;
        response.message = "Masukkan Username dan password anda"
        return res.send(response)
    }
    const userData = await findUser(username)
    // .then((result)=>{
      if(!userData){
        response.message = 'username not found!';
        response.status = 201;
      }else{
        const comparedPassword = bcrypt.compare(userData.password, password);
        let token = '';
        if(!comparedPassword){
          response.message = ('wrong password');
          response.status = 201;
        }else{
          token = jwt.sign(
            {
              user: username,
              pass: password
            },
            process.env.JWT_ADMIN_AUTH,
            { expiresIn: process.env.JWT_ACCESS_TIME }
          );
          response.message = 'success';
          response.status = 200;
          response.data.auth_token = token;
        }
      }
      return res.send(response);
    // })
  })
}