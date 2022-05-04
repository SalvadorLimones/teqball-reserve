import React, { useState } from "react";
import { listGroups } from "../api/listGroups";
import { joinGroup } from "../api/groupActions";

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
            Group:{group.name} Your status:{group.status} {group.status === 'stranger' && <button onClick={() => joinGroup(group.id)}>JOIN</button>}
          </div>
        ))}
    </div>
  );
};

export default ListGroup;
