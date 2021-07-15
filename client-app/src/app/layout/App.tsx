import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';




const App :React.FC<RouteComponentProps>=({location}) => {

  return (
    <>
    <Route exact path='/' component={HomePage}/>
    <Route path={'/(.+)'} render={()=>(
      <>
       <NavBar />
       <Container  style={{marginTop:'7em'}}>
       <Route exact path='/' component={HomePage}/>
       <Route exact path='/activities' component={ActivityDashboard}/>
       <Route path='/activities/:id' component={ActivityDetails}/>
       <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
       </Container>
       </>
    )} />
     
    </>
  );
}

export default withRouter(observer(App));
