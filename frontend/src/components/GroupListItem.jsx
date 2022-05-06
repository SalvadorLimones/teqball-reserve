import React, { useState } from 'react'
import GroupDetails from './GroupDetails';

const GroupListItem = ({group, reload}) => {
    const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='groupDiv'>
        <div>Group: {group.name}</div> <div>Your status: {group.status}</div> 
        <button onClick={() => setShowDetails(!showDetails)}>open group</button>
        {showDetails && <GroupDetails group={group} reload={reload}/>}
    </div>
  )
}

export default GroupListItem