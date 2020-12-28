import admin from '@/lib/admin'

export default async (req, res) => {
  try {
    const { userProfile } = req.body
    const userRef = admin
      .firestore()
      .collection('profiles')
      .doc(userProfile.uid)
    const result = await userRef.set(userProfile)

    res.statusCode = 200
    res.json(result)
  } catch {
    res.statusCode = 403
    res.json(null)
  }
}
