import React from 'react'
import Navbar from '../components/Navbar'
import CreateGroup from '../components/CreateGroup'
import GroupList from '../components/GroupList'

const Groups = () => {
  return (
    <div>
        <Navbar />
        <CreateGroup />
        <GroupList />
    </div>
  )
}

export default Groups