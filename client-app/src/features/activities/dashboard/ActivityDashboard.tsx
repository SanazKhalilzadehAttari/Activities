import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {RootStoreContext } from "../../../app/stores/rootStore";
import ActivityList from "./ActivityList";



    const ActivityDashboard : React.FC = ()=>{
        const rootStore =useContext(RootStoreContext);
        const{loadactivities,loadingInitial} = rootStore.activityStore;
        useEffect(()=> {
         loadactivities();
        },[loadactivities])
          
        if(loadingInitial)
        return <LoadingComponent content='LoadingActivities' />
        return(
        <Grid>
            <GridColumn width="10">
                <ActivityList />
            </GridColumn>
            <GridColumn width="6">
              <h1>activity filter</h1>
            </GridColumn>
        </Grid>
    )
}
export default observer(ActivityDashboard);