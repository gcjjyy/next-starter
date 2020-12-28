import { useColorMode, IconButton } from '@chakra-ui/react'
import { BsMoon, BsSun } from 'react-icons/bs'

function GColorModeSwitch(props) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      {...props}
      variant="outline"
      icon={colorMode === 'light' ? <BsMoon /> : <BsSun />}
      onClick={toggleColorMode}
    />
  )
}

export default GColorModeSwitch
