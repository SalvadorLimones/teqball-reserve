import React, { useState } from "react";
import { listGroups } from "../api/listGroups";
import { joinGroup } from "../api/groupActions";
import { leaveGroup } from "../api/groupActions";
import { getMembers } from "../api/groupActions";

const ListGroup = () => {
  const [groupResponse, setGroupResponse] = useState(null);

  const listAllGroups = async () => {
    const res = await listGroups();
    // console.log(res.data[0].name);
    setGroupResponse(res.data);
  };

  return (
    <div className="ListGroup">
      <button onClick={() => listAllGroups()}>LIST GROUPS</button>
      {groupResponse && <h2>Groups</h2>}
      {groupResponse &&
        groupResponse.map((group, i) => (
          <div key={i}>
            {group.status === 'owner' && <button onClick={() => getMembers(group.id)}>Members</button>}
            Group:{group.name} Your status:{group.status} {group.status === 'stranger' && <button onClick={() => joinGroup(group.id)}>JOIN</button>} 
            {
              (group.status === 'member' || group.status === 'admin' || group.status === 'pending') && <button onClick={() => leaveGroup(group.id)}>LEAVE</button>
            }
          </div>
        ))}
    </div>
  );
};

export default ListGroup;
