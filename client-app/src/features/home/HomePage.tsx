import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment,Image, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";



const HomePage = ()=>{
     const rootStore = useContext(RootStoreContext);
     const {isLoggedIn,user}= rootStore.userStore;
    return(
       <Segment inverted textAlign='center' vertical className="masthead">
        <Container text>
        <Header as='h1' inverted >
        <Image size="massive" src='/assets/logo.png' alt='logo' style={{marginBottom:12}}/>
            Reactivities
        </Header>  
        
        {isLoggedIn && user ?(
        <Fragment>
        <Header as='h2' inverted content={`Welcome back ${user.displayName}`}/>
        <Button as={Link} inverted to='/activities' size='huge' >
        Go to Activities
        </Button>
        </Fragment>
        
          ):(
        <Fragment>
        <Header as='h2' inverted content={`Welcome to Reactivities`}/>
        <Button as={Link} inverted to='/login' size='huge'>
       Login
       </Button>
        <Button as={Link} inverted to='/register' size='huge'>
      Register
      </Button>
    </Fragment>
          )}
        </Container>   
        </Segment>
    )

}
export default HomePage;