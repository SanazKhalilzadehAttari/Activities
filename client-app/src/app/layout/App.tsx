import { observer } from 'mobx-react-lite';
import {  useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useContext } from 'react';
import ActivityStore from '../stores/activityStore';




const App = () => {
  const activityStore =useContext(ActivityStore);
  useEffect(()=> {
   activityStore.loadactivities();
  },[activityStore])

  return (
    <>
      <NavBar />
      <Container  style={{marginTop:'7em'}}>
     <ActivityDashboard />
    </Container>
    </>
  );
}

export default observer(App);
