import React, { useEffect, useState } from "react";
import {
  getMembers,
  acceptUser,
  refuseUser,
  joinGroup,
  leaveGroup,
  changeStatus,
} from "../api/groupActions";
import Events from "./Events";

const GroupDetails = ({ group, reload }) => {
  const [members, setMembers] = useState([]);
  const [rank, setRank] = useState("");

  const handleGetMembers = async (id) => {
    setMembers(await getMembers(id));
  };

  const handleAccept = (memberId) => {
    console.log("accepting join request");
    acceptUser(group.id, memberId);
    handleGetMembers(group.id);
  };

  const handleReject = (memberId) => {
    console.log("rejecting join request");
    refuseUser(group.id, memberId);
    handleGetMembers(group.id);
  };

  const handleJoin = async () => {
    console.log("handlejoin has been called");
    await joinGroup(group.id);
    reload();
  };

  const handleLeave = async () => {
    console.log("handleleave has been called");
    await leaveGroup(group.id);
    reload();
  };

  const handleChangeStatus = async (memberId) => {
    await changeStatus(group.id, memberId, rank);
    handleGetMembers(group.id);
  };

  useEffect(() => {
    console.log(group);
    if (group.status !== "stranger" && group.status !== "banned")
      handleGetMembers(group.id);
    console.log(members);
  }, []);

  return (
    <div className="GroupDetails">
      <h2>{group.name}</h2>
      <p>Your role in this group: {group.status}</p>
      {group.status === "stranger" && (
        <button onClick={() => handleJoin()}>JOIN</button>
      )}
      {(group.status === "member" ||
        group.status === "admin" ||
        group.status === "pending") && (
        <button onClick={() => handleLeave()}>LEAVE</button>
      )}
      {group.status === "banned" && (
        <p>You have been permanently banned from this group. GTFO.</p>
      )}
      {(group.status === "owner" ||
        group.status === "admin" ||
        group.status === "member") && (
        <div className="GroupDetails-members">
          <h5>Members</h5>
          {members &&
            members.map((m, i) => (
              <div key={i}>
                {m.role !== "owner" && `${m.member_name} - rank: ${m.role}`}{" "}
                {m.role === "pending" &&
                  (group.status === "owner" || group.status === "admin") && (
                    <div>
                      <button onClick={() => handleAccept(m.member_id)}>
                        accept
                      </button>
                      <button onClick={() => handleReject(m.member_id)}>
                        reject
                      </button>
                    </div>
                  )}
                {group.status === "owner" &&
                  m.role !== "owner" &&
                  m.role !== "pending" && (
                    <div>
                      <p>change the rank of this user: </p>
                      <select
                        name="setrank"
                        id="setrank"
                        onChange={(e) => setRank(e.target.value)}
                      >
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                        <option value="banned">Banned</option>
                      </select>
                      <button onClick={() => handleChangeStatus(m.member_id)}>
                        change rank
                      </button>
                    </div>
                  )}
              </div>
            ))}
        </div>
      )}
      <div>
        {(group.status === "owner" ||
          group.status === "admin" ||
          group.status === "member") && (
          <Events group_id={group.id} my_status={group.status} />
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
