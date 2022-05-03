import React, { useState } from 'react'
import { createGroup } from '../api/createGroup';

const CreateGroup = () => {

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    // for testing purposes
    // const logStuff = () => {
    //     const token = localStorage.getItem('token');
    //     if (!token) console.log('please log in first!');
    //     if (token) console.log(`creating a group called ${groupName}, with the description of ${groupDescription}. token is ${token}`);
    // }

  return (
    <div className='CreateGroup'>
        <h2>Create a new group</h2>
        <input value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        <textarea name="description" id="description" cols="30" rows="10" onChange={(e) => setGroupDescription(e.target.value)} placeholder="Describe your group!"></textarea>
        {/* <button onClick={() => logStuff()}>CREATE GROUP</button> */}
        <button onClick={() => createGroup(groupName, groupDescription)}>CREATE GROUP</button>
    </div>
  )
}

export default CreateGroup