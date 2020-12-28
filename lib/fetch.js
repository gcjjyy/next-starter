import { firestore } from './firebase'
import { toJS } from 'mobx'
import * as _ from 'lodash'

function attachDocId(snapshot) {
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export async function fetchUserInfo(store, uid) {
  const cached = store.userProfile
  if (!_.isEmpty(toJS(cached))) {
    return cached
  }

  const userDoc = await firestore.collection('profiles').doc(uid).get()
  if (userDoc.exists) {
    const userProfile = userDoc.data()
    store.setUserProfile(userProfile)
    return userProfile
  } else {
    return null
  }
}

export async function fetchChannels(store) {
  const cached = store.channels
  if (!_.isEmpty(toJS(cached))) {
    return cached
  }

  const snapshot = await firestore.collection('channels').get()

  const channels = _.keyBy(attachDocId(snapshot), 'id')
  store.setChannels(channels)

  return channels
}
