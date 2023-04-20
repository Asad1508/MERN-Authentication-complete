import React from 'react'
import { useSelector } from 'react-redux'
const Home = () => {
  const mydata=useSelector(state=>state.user)
  return (
    <>
    <h1>Home page {mydata.name}</h1>
    </>
  )
}

export default Home