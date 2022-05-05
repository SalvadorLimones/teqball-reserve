import React, { useState } from 'react'
import { createGroup } from '../api/groupActions';
import {useNavigate} from "react-router-dom"

const CreateGroup = () => {

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [message, setMessage] = useState('Please set a name and a description for your new group!');

    const navigate = useNavigate();

    const handleCreateGroup = () => {
      createGroup(groupName, groupDescription, setMessage);
      navigate('/');
      setTimeout(() => {
        navigate('/groups');
      }, 100)
    }

  return (
        <div className='CreateGroup'>
            <h2>Create a new group</h2>
            <p>{message}</p>
            <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Choose a name for your group!"/>
            <textarea name="description" id="description" cols="30" rows="10" onChange={(e) => setGroupDescription(e.target.value)} placeholder="Describe your group!"></textarea>
            <button onClick={() => handleCreateGroup()}>CREATE GROUP</button>
        </div>
  )
}

export default CreateGroup