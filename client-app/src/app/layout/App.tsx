import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const[activities,setActivities]= useState<Activity[]>([]);
  const[selectedActivity,setSelectedActivity]= useState<Activity | undefined>(undefined);
  useEffect(()=> {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(Response =>{
      setActivities(Response.data);
    })
  },[])
  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x => x.id === id));
  }
  function handelCancelSelectActivity(){
    setSelectedActivity(undefined);
  }
  return (
    <>
      <NavBar/>
      <Container  style={{marginTop:'7em'}}>
     <ActivityDashboard 
     activities={activities}
       selectedActivity={selectedActivity}
       selectActivity={handleSelectActivity}
       cancelSelectActivity={handelCancelSelectActivity}/>
    
    </Container>
    </>
  );
}

export default App;
