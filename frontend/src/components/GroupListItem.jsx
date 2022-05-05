import React, { useState } from 'react'
import { getMembers, joinGroup, leaveGroup, acceptUser, refuseUser } from '../api/groupActions'
import GroupDetails from './GroupDetails';

const GroupListItem = ({group, reload}) => {
    // const [adminTools, setAdminTools] = useState(false);
    // const [members, setMembers] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

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

    // const handleGetMembers = async (id) => {
    //     setMembers(await getMembers(id))
    // }

    // const handleAccept = (memberId) => {
    //     console.log('accepting join request');
    //     acceptUser(group.id, memberId);
    //     // handleGetMembers(group.id);
    // }

    // const handleReject = (memberId) => {
    //     console.log('rejecting join request');
    //     refuseUser(group.id, memberId);
    //     // handleGetMembers(group.id);
    // }

  return (
    <div>
        {/* <button onClick={() => console.log(group)}>click here</button> */}
        {/* {group.status === 'owner' && <button onClick={() => handleGetMembers(group.id)}>requests</button>} */}
        Group:{group.name} Your status:{group.status} 
        {/* {group.status === 'stranger' && <button onClick={() => handleJoin()}>JOIN</button>}  */}
        {/* {
            (group.status === 'member' || group.status === 'admin' || group.status === 'pending') && <button onClick={() => handleLeave()}>LEAVE</button>
        } */}
        <button onClick={() => setShowDetails(!showDetails)}>open group</button>
        {showDetails && <GroupDetails group={group} reload={reload}/>}
        {/* {members && members.map((m, i) => m.member_name && <div key={i}>{m.member_name} {m.role} {m.role === 'pending' && <div><button onClick={() => handleAccept(m.member_id)}>accept</button><button onClick={() => handleReject(m.member_id)}>reject</button></div>}</div>)} */}
    </div>
  )
}

export default GroupListItem