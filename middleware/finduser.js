
const model = require('../models');
const adminDb = model.admin;

const findUser = (username) =>((resolve) =>{
    adminDb.findOne({
      where:{username}
    }).then(user=>{
      return resolve(user);
    })
  })

module.exports = findUser