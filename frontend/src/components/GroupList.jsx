import React, { useEffect, useState } from 'react';
// import { privatePage } from '../api/renderPrivatePublic';

const GroupList = () => {
    const [groups, setGroups] = useState([]);

    // useEffect(() => {
    //     const getGroups = async () => {
    //         console.log('logging groups during first render');
    //         console.log(groups)
    //         setGroups(await privatePage());
    //         console.log('groups should now be what privatepage returned');
    //         console.log(groups);
    //     };
    //     getGroups();
    // }, [])

  return (
    <div>
        <h2>there should be a list of groups here I think</h2>
        {/* {groups.map((g) => {
            return <div>{g.name}<button>JOIN</button></div>
        })} */}
    </div>
  )
}

export default GroupList