import React, { useEffect, useState } from 'react';
import { getMembers, acceptUser, refuseUser } from '../api/groupActions';

const GroupDetails = ({group}) => {
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

    useEffect(() => {
        console.log(group)
        handleGetMembers(group.id)
        console.log(members)
    }, [])

  return (
    <div className='GroupDetails'>
        <h2>{group.name}</h2>
        <h4>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, modi ex, harum ipsam alias sunt tenetur temporibus, voluptas fuga in porro? Ab quis, exercitationem ad maxime quas incidunt optio assumenda?</h4>
        <p>Your role in this group: {group.status}</p>
        {group.status === 'stranger' && <div>
            <p>this button doesn't work yet, use the one one the groups list please</p><button onClick={() => console.log('this should work as the join button')}>JOIN</button>
        </div>}
        {((group.status === 'owner') || (group.status === 'admin') || (group.status === 'member')) && <div className='GroupDetails-members'>
            <h5>Members</h5>
            {members && members.map((m) => <p>{m.member_name} {(m.role === 'pending' && ((group.status === 'owner') || (group.status === 'admin'))) && <div><button onClick={() => handleAccept(group.id)}>accept</button><button onClick={() => handleReject(group.id)}>reject</button></div>}</p>)}
        </div>}
    </div>
  )
}

export default GroupDetails