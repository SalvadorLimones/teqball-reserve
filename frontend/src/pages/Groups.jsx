import React from 'react'
import Navbar from '../components/Navbar'
import CreateGroup from '../components/CreateGroup'
import ListGroups from '../components/ListGroups'

const Groups = () => {
  return (
    <div>
        <Navbar />
        <div className='group-actions'>
          <CreateGroup />
          <ListGroups />
        </div>
    </div>
  )
}

export default Groups