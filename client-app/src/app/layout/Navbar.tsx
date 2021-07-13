import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import ActivityStore from "../stores/activityStore";

const  NavBar: React.FC =()=>{
const activityStore = useContext(ActivityStore);
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Reactivities"></Menu.Item>
                <Menu.Item>
                    <Button positive content="Create Activities" onClick={()=> activityStore.openForm()} />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
export default observer(NavBar);