const mongoose = require('mongoose')

const privateMessageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    max: 128
  },
  to: {
    type: String,
    required: true,
    max: 128
  },
  message: {
    type: String,
    required: true,
    max: 3000
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('PrvateMessage', privateMessageSchema, 'private_messages')