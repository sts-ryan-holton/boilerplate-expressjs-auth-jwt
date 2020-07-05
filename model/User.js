const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    max: 128,
    default: uuidv4()
  },
  first_name: {
    type: String,
    required: true,
    max: 255
  },
  last_name: {
    type: String,
    required: true,
    max: 255
  },
  gender: {
    type: String,
    required: true,
    max: 25
  },
  dob: {
    type: String,
    required: true,
    max: 128
  },
  email: {
    type: String,
    required: true,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema, 'users')