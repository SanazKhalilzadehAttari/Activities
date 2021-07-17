
import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

const  NavBar: React.FC =()=>{
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Reactivities" as={NavLink} to="/Activities"></Menu.Item>
                <Menu.Item name="Errors" as={NavLink} to="/errors"></Menu.Item>
                <Menu.Item>
                    <Button positive content="Create Activities"  as={NavLink} to="/createActivity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
export default observer(NavBar);