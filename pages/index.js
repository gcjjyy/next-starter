import { INITIAL_COUNT_VALUE } from '@/common/constants'
import { GLayout } from '@/gcjjyy'
import { Button, Container, Heading } from '@chakra-ui/react'
import { inject, observer } from 'mobx-react'

export async function getServerSideProps(context) {
  const { cookie } = context.req.headers

  return {
    props: {
      initialState: {
        count: INITIAL_COUNT_VALUE
      },
      cookies: cookie ?? ''
    }
  }
}

function Home(props) {
  return (
    <GLayout>
      <Container>
        <Heading my={4}>Count: {props.store.count}</Heading>
        <Button
          onClick={() => props.store.setCount(props.store.count + 10)}
          children={'Add Count 10'}
        />
      </Container>
    </GLayout>
  )
}

export default inject('store')(observer(Home))
