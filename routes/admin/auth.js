'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../../models');
const admin = require('../../models/admin');
const findUser = require('../../middleware/finduser');
const adminDb = model.admin;

module.exports = async function (fastify, opts) {
  fastify.post('/register', async function (req, res) {
    const {username,password,rePassword,name} = req.body;
    const response = {message:'success', status:200, data:{}};
    const newData = {};
    newData.username = username;
    newData.password = await bcrypt.hash(password,10);
    newData.name = name;
    if(!username || !password || !rePassword || !name){
      // console.log(req.body);
      response.message = 'please complete your request';
      response.status = 201
    }else{
      if(password != rePassword){
      response.message = 'please check your password';
      response.status = 201
      }else{
        const user = await findUser(username);
        if(user){
          response.message = 'username has been registered, pleace choose another!';
          response.status = 201
        }else{
          createUser(newData).then((result)=>{
            console.log(result);
          })
        }
      }
    }
    res.send(response);
  })
}

const createUser = (regData) => new Promise ((resolve)=>{
  adminDb.create({
    username: regData.username,
    password: regData.password,
    name: regData.name,
    created_at: '2021-02-02 07:07',
    edited_at: '2021-02-02 07:07'
  }).then((result)=>{
    return resolve(result)
  })
})
