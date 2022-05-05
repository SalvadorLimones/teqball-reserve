import React, { useEffect, useState } from "react";
import { listGroups } from "../api/listGroups";
import GroupListItem from "./GroupListItem";

const ListGroup = () => {
  const [groupResponse, setGroupResponse] = useState(null);
  const [reload, setReload] = useState(false);

  const rerender = () => {
    console.log('rerender has been called')
    setReload(!reload)
  }

  const listAllGroups = async () => {
    console.log('listallgroups has been called')
    const res = await listGroups();
    // console.log(res.data[0].name);
    setGroupResponse(res.data);
    console.log('groupResponse should be different now');
  };

  useEffect(() => {
    listAllGroups()
  }, [reload])

  return (
    <div className="ListGroup">
      {/* <button onClick={() => listAllGroups()}>LIST GROUPS</button> */}
      {/* {groupResponse && <h2>Groups</h2>} */}
      <h2>Groups</h2>
      {groupResponse &&
        groupResponse.map((group, i) => (
          <GroupListItem key={i} group={group} reload={rerender}/>
        ))}
    </div>
  );
};

export default ListGroup;
