import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from './NotFound';
import LoginForm from '../../features/user/LoginForm';




const App :React.FC<RouteComponentProps>=({location}) => {

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
    <Route exact path='/' component={HomePage}/>
    <Route path={'/(.+)'} render={()=>(
      <>
       <NavBar />
       
      <Container  style={{marginTop:'7em'}}>
      <Switch>
      <Route exact path='/' component={HomePage}/>
       <Route exact path='/activities' component={ActivityDashboard}/>
       <Route path='/activities/:id' component={ActivityDetails}/>
       <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
      <Route path='/errors' component={TestErrors}/>
      <Route path='/login' component={LoginForm}/>
      <Route component={NotFound}></Route>
      </Switch>

       </Container>
       </>
    )} />
     
    </>
  );
}

export default withRouter(observer(App));
