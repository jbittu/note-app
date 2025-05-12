import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import NoteArea from '../noteArea/NoteArea'
import './Home.css'
import { useEffect, useState } from 'react';

const Home = () => {
    const[groups, setGroups] = useState(() => {
        const savedGroups = localStorage.getItem('groups');
        return savedGroups ? JSON.parse(savedGroups) : [];
    });
const [currentGroupId, setCurrentGroupId] = useState(null);
    useEffect(() => {
      localStorage.setItem('groups', JSON.stringify(groups));
    },[groups]);
    const currentGroup = groups.find(group => group.id === currentGroupId);
  return (
    <div className='home'>
        <Sidebar 
        groups={groups}
        setGroups = {setGroups}
        currentGroupId = {currentGroupId}
        setCurrentGroupId = {setCurrentGroupId}/>

        <NoteArea
        group = {currentGroup}
        setGroups = {setGroups}
        groups = {groups} />

    </div>
  )
}

export default Home