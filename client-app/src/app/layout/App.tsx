import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';



const App = () => {
  const[activities,setActivities]= useState<Activity[]>([]);
  const[selectedActivity,setSelectedActivity]= useState<Activity | undefined>(undefined);
  const[editMode,setEditMode]=useState(false);
  const[loading,setLoading]=useState(true);
  const[submitting,setSubmitting]= useState(false);
  const[target,setTarget]=useState('');
  useEffect(()=> {
    setSubmitting(true);
    agent.Activities.list()
   .then(Response =>{
    let activities:Activity[] =[]; 
    Response.forEach((activity) => {
      activity.date = activity.date.split('.')[0];
      activities.push(activity)
    })
    setActivities(activities);
    }).then(()=> setLoading(false)).then(()=> setSubmitting(false));
  },[])

  function handleSelectActivity(id:string){
  
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id? :string){
    id? handleSelectActivity(id):handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity: Activity){

   setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(x=>x.id !== activity.id),activity]);
      setEditMode(false);
      setSelectedActivity(activity);
    }).then(()=> setSubmitting(false));
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
      setActivities([...activities,activity]);
      setEditMode(false);
      setSelectedActivity(activity);
    }).then(()=> setSubmitting(false));
    }
 
    
    }
    function handleDeleteActivity(event:SyntheticEvent<HTMLButtonElement>,id:string){
      setSubmitting(true);
      setTarget(event.currentTarget.name);
      agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x =>x.id !== id)])
      
    }).then(()=> setSubmitting(false));
    }
    if(loading) return <LoadingComponent content='Loading activities...'/>
  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container  style={{marginTop:'7em'}}>
     <ActivityDashboard 
     activities={activities}
       selectedActivity={selectedActivity}
       selectActivity={handleSelectActivity}
       cancelSelectActivity={handleCancelSelectActivity}
       editMode={editMode}
       openForm ={handleFormOpen}
       closeForm ={handleFormClose}
       createOrEdit={handleCreateOrEditActivity}
       deleteActivity={handleDeleteActivity}
       submitting={submitting}
       target={target}
       />
    
    </Container>
    </>
  );
}

export default App;
