import { action, observable, computed, runInAction, makeObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
import { INITIAL_COUNT_VALUE } from './constants'

enableStaticRendering(typeof window === 'undefined')

let store

class Store {
  constructor() {
    makeObservable(this)
  }

  @observable count = INITIAL_COUNT_VALUE
  @observable user = null
  @observable userProfile = null
  @observable channels = {}

  @action hydrate = (data) => {
    if (!data) return

    // When page is changing, getServerSideProps function
    // can be called. At that time, the new initial data is coming.
    // So, we need to keep current data and attach new data.
    this.count = data.count ?? this.count
    this.user = data.user ?? this.user
    this.userProfile = data.uesrInfo ?? this.userProfile
    this.channels = data.channels ?? this.channels
  }

  @action setCount(count) {
    this.count = count
  }

  @action setUser(user) {
    this.user = user
  }

  @action setUserProfile(userProfile) {
    this.userProfile = userProfile
  }

  @action setChannels(channels) {
    this.channels = channels
  }

  @computed get isSigned() {
    return this.user && this.userProfile
  }
}

function initializeStore(initialData = null) {
  const _store = store ?? new Store()

  if (initialData) {
    _store.hydrate(initialData)
  }

  if (typeof window === 'undefined') return _store

  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
