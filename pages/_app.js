import { useStore } from '@/common/store'
import { fetchUserProfile } from '@/lib/fetch'
import { auth } from '@/lib/firebase'
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager
} from '@chakra-ui/react'
import { Provider } from 'mobx-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialState)
  const router = useRouter()

  const colorModeManager =
    typeof pageProps.cookies === 'string'
      ? cookieStorageManager(pageProps.cookies)
      : localStorageManager

  useEffect(() => {
    auth.onIdTokenChanged(async (user) => {
      if (!user) {
        store.setUser(null)
        store.setUserProfile(null)
      } else {
        store.setUser(user)
        const userProfile = await fetchUserProfile(store, user.uid)
        if (!userProfile) {
          router.push('/signup')
        }
      }
    })
  }, [])

  return (
    <Provider store={store}>
      <ChakraProvider colorModeManager={colorModeManager}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
