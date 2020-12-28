import { auth, firebase } from '@/lib/firebase'
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text
} from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import GColorModeSwitch from './GColorModeSwitch'

function GAppbar(props) {
  const { userProfile, isSigned } = props.store

  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(provider)
  }

  const signOut = async () => {
    await auth.signOut()
  }

  const appBarBg = useColorModeValue('gray.200', 'gray.700')

  return (
    <Flex flexDir="row" p={2} bg={appBarBg} alignItems="center">
      <Link href="/">
        <Text cursor="pointer">Next Starter</Text>
      </Link>
      <Spacer />
      <GColorModeSwitch mr={2} />
      {!isSigned && <Button onClick={() => signIn()}>Sign in</Button>}
      {isSigned && (
        <Menu>
          <MenuButton>
            <Icon as={BsPerson} w="24px" h="24px" />
          </MenuButton>
          <MenuList>
            <Text px={3}>{`Signed in as ${userProfile.userName}`}</Text>
            <MenuDivider />
            <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  )
}

export default inject('store')(observer(GAppbar))
