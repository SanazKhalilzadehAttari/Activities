import React from "react";
import{Segment,Button,Header,Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const NotFound =()=>{
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>

        oops we have look every where but cant find it.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' >
                    Return to activity Page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}
export default NotFound;