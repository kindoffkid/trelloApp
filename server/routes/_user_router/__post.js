const {
  listSchema,
  boardSchema,
  taskSchema,
  userSchema
} = require('../../models')
const crypt = require('bcryptjs')

const path = require('express').Router()

path.post('/sign_up?', async (req, res) => {
  try {
    const { email, password, username } = req.query
    const checkUser = await userSchema.findOne({ email: email }).exec()
    if (checkUser) {
      res.status(200).json({
        method: 'POST',
        url: '/api/users/sign_up?',
        status: '200',
        data: checkUser
      })
    }
    if (!checkUser) {
      const saveUser_QUERY = await userSchema({
        username: username,
        email: email,
        password: await crypt.hash(password, 10)
      }).save()
      res.status(200).json({
        method: 'POST',
        url: '/api/users/sign_up?',
        status: '200',
        data: saveUser_QUERY
      })
    }
   } catch (error) {
    console.error(error)
    res.status(500).json({
      method: 'POST',
      url: '/api/users/sign_up?',
      status: '500',
      error: error,
      errorMessage: error.message
    })
  }
})

path.post('/sign_in?', async (req, res) => {
  try {
    const { email, password } = req.query
    const checkUser = await userSchema.findOne({ email: email }).exec()
    if (checkUser) {
      const comparePassword = await crypt.compare(password, checkUser.password)
      
      if (comparePassword) {
        res.status(200).json({
          method: 'POST',
          url: '/api/users/sign_in?',
          status: '200',
          data: {
            _id: checkUser._id,
            email: checkUser.email,
            username: checkUser.username
          }
        })
      }
    }
    res.status(404).json({
      method: 'POST',
      url: '/api/users/sign_in',
      status: '404',
      message: 'Try again'
    })
    // if (!checkUser) {
    //   const saveUser_QUERY = await userSchema({
    //     email: email,
    //     password: await crypt.hash(password, 10)
    //   }).save()
    //   res.status(200).json({
    //     method: 'POST',
    //     url: '/api/users/new?',
    //     status: '500',
    //     data: saveUser_QUERY
    //   })
    // }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      method: 'POST',
      url: '/api/users/new?',
      status: '500',
      error: error,
      errorMessage: error.message
    })
  }
})
module.exports = path

// const mongoose = require('mongoose');
// const crypt = require('bcryptjs');
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// exports.signup = (req, res) => {
//   User.findOne({
//     email: req.body.email
//   }, (err, result) => {
//     console.log(result, err);
//     if (!result) {
//       crypt.hash(req.body.password, 10, (err, new_hash) => {
//         if (err) throw err;
//         let newuser = new User({
//           email: req.body.email,
//           password: new_hash
//         });
//         newuser.save((err, result) => {
//           if (err) {
//             res.status(500).json({
//               error: err
//             });
//           } else {
//             res.status(201).json({
//               'Created user: ': {
//                 email: req.body.email,
//                 password: req.body.password,
//                 _id: result._id
//               }
//             });
//           }
//         });
//       });
//     } else {
//       res.status(422).json({
//         result: err,
//         message: result.email + ' already exists'
//       });
//     }
//   })
// }

// exports.login = (req, res) => {
//   User.findOne({
//     email: req.body.email
//   }, (err, result) => {
//     if (!result) {
//       res.status(401).json({
//         message: 'Failed to authenticate'
//       });
//     } else {
//       let pass = req.body.password;
//       crypt.compare(pass, result.password, (err, success) => {
//         if (err) {
//           res.status(401).json({
//             message: 'Failed to authenticate'
//           });
//         }
//         if (success) {
//           let token = jwt.sign({
//             email: result.email,
//             userId: result._id
//           },
//             process.env.S_KEY, {
//               expiresIn: '1hr'
//             });

//           res.status(200).json({
//             message: 'Successful',
//             token: token
//           });
//         } else {
//           res.status(401).json({
//             message: 'Failed to authenticate'
//           });
//         }
//       });
//     }
//   });
// }

// exports.delete = (req, res, next) => {
//   User.findOne({
//     _id: req.params.id
//   }, (err, result) => {
//     if (!result) {
//       res.status(404).json({
//         message: req.paramms.id + ' not found'
//       });
//     } else {
//       User.deleteOne(result, (err, response) => {
//         if (err) {
//           res.status(500).json({
//             message: 'Server side error',
//             error: err
//           });
//         } else {
//           res.status(200).json({
//             message: result.email + ' was removed from the database',
//             response: response
//           });
//         }
//       });
//     }
//   });
// }