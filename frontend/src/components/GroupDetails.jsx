import React, { useEffect, useState } from 'react';
import { getMembers, acceptUser, refuseUser, joinGroup, leaveGroup } from '../api/groupActions';

const GroupDetails = ({group, reload}) => {
    const [members, setMembers] = useState([]);

    const handleGetMembers = async (id) => {
        setMembers(await getMembers(id));
    }

    const handleAccept = (memberId) => {
        console.log('accepting join request');
        acceptUser(group.id, memberId);
        // handleGetMembers(group.id);
    }

    const handleReject = (memberId) => {
        console.log('rejecting join request');
        refuseUser(group.id, memberId);
        // handleGetMembers(group.id);
    }

    const handleJoin = async () => {
        console.log('handlejoin has been called')
        await joinGroup(group.id);
        reload();
    }

    const handleLeave = async () => {
        console.log('handleleave has been called');
        await leaveGroup(group.id);
        reload();
    }

    useEffect(() => {
        console.log(group)
        if (group.status !== 'stranger') handleGetMembers(group.id)
        console.log(members)
    }, [])

  return (
    <div className='GroupDetails'>
        <h2>{group.name}</h2>
        <h4>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, modi ex, harum ipsam alias sunt tenetur temporibus, voluptas fuga in porro? Ab quis, exercitationem ad maxime quas incidunt optio assumenda?</h4>
        <p>Your role in this group: {group.status}</p>
        {group.status === 'stranger' && <button onClick={() => handleJoin()}>JOIN</button>}
        {
            (group.status === 'member' || group.status === 'admin' || group.status === 'pending') && <button onClick={() => handleLeave()}>LEAVE</button>
        }
        {group.status === 'banned' && <p>You have been permanently banned from this group. GTFO.</p>}
        {((group.status === 'owner') || (group.status === 'admin') || (group.status === 'member')) && 
        <div className='GroupDetails-members'>
            <h5>Members</h5>
            {members && members.map((m, i) => <div key={i}>{m.member_name} {(m.role === 'pending' && ((group.status === 'owner') || (group.status === 'admin'))) && <div><button onClick={() => handleAccept(m.member_id)}>accept</button><button onClick={() => handleReject(m.member_id)}>reject</button></div>}</div>)}
        </div>}
    </div>
  )
}

export default GroupDetails