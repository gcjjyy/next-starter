import GAppBar from './GAppBar'

function GLayout(props) {
  return (
    <>
      <GAppBar />
      {props.children}
    </>
  )
}

export default GLayout
