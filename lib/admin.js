import * as admin from 'firebase-admin'
import serviceAccount from './secretKey.json'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export default admin
