import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const[activities,setActivities]= useState<Activity[]>([]);
  useEffect(()=> {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(Response =>{
      console.log(Response);
      setActivities(Response.data);
    })
  },[])
  return (
    <>
      <NavBar/>
      <Container  style={{marginTop:'7em'}}>
     <ActivityDashboard activities={activities}></ActivityDashboard>
    </Container>
    </>
  );
}

export default App;
