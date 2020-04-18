const admin = require('firebase-admin')

if (!admin.apps.length) {
  console.info('initializing app ...')
  admin.initializeApp()
}

exports.src = require('./src')