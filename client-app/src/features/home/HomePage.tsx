import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment,Image, Button } from "semantic-ui-react";


const HomePage = ()=>{
    return(
       <Segment inverted textAlign='center' vertical className="masthead">
        <Container text>
        <Header as='h1' inverted>
        <Image size="massive" src='/assets/logo.png' alt='logo' style={{marginBottom:12}}/>
            Reactivities
        </Header>  
        <Header as='h2' inverted content='Welcome to Reactivity'/>
        <Button as={Link} inverted to='/activities' size='huge' >
        Take me to the Activities
        </Button>  
        </Container>   
        </Segment>
    )

}
export default HomePage;