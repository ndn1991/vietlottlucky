const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.onAuthCreate = functions.auth.user().onCreate(async (user, context) => {
  const phoneNumber = user.phoneNumber ? (user.phoneNumber.startsWith('+') ? user.phoneNumber.substring(1) : user.phoneNumber) : null
  const db = admin.firestore()
  return db.collection('users').doc(user.uid).set({
      phoneNumber: user.phoneNumber,
      email: `${phoneNumber}@vietlottlucky.vn`
    }, 
    {merge: true}
  )
})

exports.onUserUpdate = functions.firestore.document('users/{userId}').onUpdate(async (change, context) => {
  const after = change.after.data()
  if (after.password && after.email && after.displayName) {
    await admin.auth().updateUser(context.params.userId, {
      displayName: after.displayName,
      email: after.email,
      password: after.password
    })
    await change.after.ref.update({
      registered: true,
      password: admin.firestore.FieldValue.delete()
    })
  }
})