import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityStore from '../../../app/stores/activityStore';
import ActivityList from "./ActivityList";



    const ActivityDashboard : React.FC = ()=>{
        const activityStore =useContext(ActivityStore);
        useEffect(()=> {
         activityStore.loadactivities();
        },[activityStore])
          
        
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