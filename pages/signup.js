import { GLayout } from '@/gcjjyy'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea
} from '@chakra-ui/react'
import Axios from 'axios'
import { inject, observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

function SignUp(props) {
  const router = useRouter()

  const [userName, setUserName] = useState('')
  const [gender, setGender] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const submitSignUp = async () => {
    const user = props.store.user
    if (user) {
      const userProfile = {
        uid: user.uid,
        userName,
        gender,
        description,
        createdAt: new Date().toISOString()
      }
      const res = await Axios.post('/api/signup', { userProfile })
      if (res.status === 200) {
        props.store.setUserProfile(userProfile)
        router.replace('/')
      }
    }
  }

  return (
    <GLayout>
      <Box p={4}>
        <form>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Choose gender"
              onChange={(event) => setGender(event.target.value)}
            >
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={loading}
              placeholder="(Optional)"
              size="md"
            />
            <FormHelperText>Describe yourself.</FormHelperText>
          </FormControl>
          <Box textAlign="right">
            <Button onClick={() => submitSignUp()}>Submit</Button>
          </Box>
        </form>
      </Box>
    </GLayout>
  )
}

export default inject('store')(observer(SignUp))
