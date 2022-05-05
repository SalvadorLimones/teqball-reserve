import React, { useState } from 'react'
import { getMembers, joinGroup, leaveGroup } from '../api/groupActions'

const GroupListItem = ({group, reload}) => {

    const [adminTools, setAdminTools] = useState(false);
    const [members, setMembers] = useState([]);

    const handleLeave = async () => {
        console.log('handleleave has been called');
        await leaveGroup(group.id);
        reload();
    }

    const handleJoin = async () => {
        console.log('handlejoin has been called')
        await joinGroup(group.id);
        reload();
    }

    const handleGetMembers = async (id) => {
        setAdminTools(!adminTools)
        if (adminTools) {
            setMembers(await getMembers(id))
        }
        if (members === []) {
            console.log(members)
        }
    }

  return (
    <div>
        {/* <button onClick={() => console.log(group)}>click here</button> */}
        {group.status === 'owner' && <button onClick={() => handleGetMembers(group.id)}>Members</button>}
        Group:{group.name} Your status:{group.status} {group.status === 'stranger' && <button onClick={() => handleJoin()}>JOIN</button>} 
        {
            (group.status === 'member' || group.status === 'admin' || group.status === 'pending') && <button onClick={() => handleLeave()}>LEAVE</button>
        }
        {adminTools && members && members.map((m, i) => m.member_name && <div key={i}>{m.member_name} {m.role}</div>)}
    </div>
  )
}

export default GroupListItem