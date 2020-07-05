const router = require('express').Router()
const expressSanitizer = require('express-sanitizer');
const User = require('../model/user')
const PrvateMessage = require('../model/PrivateMessage')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken')
const { registerValidation, loginValidation, updateValidation, messageValidation } = require('../validation');

router.post('/register', async (req, res) => {

  // validate incoming data
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // check if user already exists
  const emailExists = await User.findOne({ email: req.sanitize(req.body.email) })
  if (emailExists) return res.status(400).send('Email already exists')

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.sanitize(req.body.password), salt)

  // create user
  const user = new User({
    first_name: req.sanitize(req.body.first_name),
    last_name: req.sanitize(req.body.last_name),
    gender: req.sanitize(req.body.gender),
    dob: req.sanitize(req.body.dob),
    email: req.sanitize(req.body.email),
    password: req.sanitize(hashPassword)
  })

  // save user
  try {
    const savedUser = await user.save()
    res.status(200).send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }

})

router.post('/login', async (req, res) => {
  
  // validate incoming data
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // check if user exists
  const user = await User.findOne({ email: req.sanitize(req.body.email) })
  if (!user) return res.status(400).send('Email and/or password is wrong')
  
  const validPass = await bcrypt.compare(req.sanitize(req.body.password), user.password)
  if (!validPass) return res.status(400).send('Invalid password')

  // exp: Math.floor(Date.now() / 1000) + (60 * 5)

  const token = jwt.sign({
    id: user._id
  }, process.env.TOKEN_SECRET)

  res.header('Authorization', `Bearer ${token}`).send({
    token: token
  })
})

router.get('/user', verify, async (req, res) => {
  const user = await User.findOne({ _id: req.sanitize(req.user.id) })
  res.send({
    user: user
  })
})

router.get('/users', verify, async (req, res) => {
  User.find({}, function(err, users) {
    var activeUsers = {};

    users.forEach(function(user) {
      activeUsers[user._id] = {
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        dob: user.dob,
        uuid: user.uuid
      };
    });

    res.send(activeUsers);  
  });
})

router.patch('/update', verify, async (req, res) => {

  // validate incoming data
  const { error } = updateValidation(req.body) 
  if (error) return res.status(400).send(error.details[0].message)

  // update user
  const user = {
    first_name: req.sanitize(req.body.first_name),
    last_name: req.sanitize(req.body.last_name),
    gender: req.sanitize(req.body.gender),
    dob: req.sanitize(req.body.dob)
  }
  
  // update user
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, user, { runValidators: true, useFindAndModify: false, new: true });
    res.status(200).send(updatedUser)
  } catch (err) {
    res.status(400).send(err)
  }

})

router.delete('/delete', verify, async (req, res) => {

  // delete user
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.user.id });
    res.status(200).send(deletedUser)
  } catch (err) {
    res.status(400).send(err)
  }

})

router.post('/message/private/send', verify, async (req, res) => {

  // validate incoming data
  const { error } = messageValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // create message
  const privateMessage = new PrvateMessage({
    from: req.sanitize(req.body.from),
    to: req.sanitize(req.body.to),
    message: req.sanitize(req.body.message)
  })

  // save message
  try {
    const savedMessage = await privateMessage.save()
    res.status(200).send(savedMessage)
  } catch (err) {
    res.status(400).send(err)
  }

})

module.exports = router