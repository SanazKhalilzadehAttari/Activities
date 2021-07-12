import React from "react";
import { SyntheticEvent } from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface IProps{
    activities : Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void ;
    cancelSelectActivity: () => void ;
    editMode :boolean;
    openForm:(id :string) => void;
    closeForm:() => void;
    createOrEdit : (activity:Activity)=>void;
    deleteActivity:(e:SyntheticEvent<HTMLButtonElement>, id:string) => void;
    submitting: boolean,
    target:string
}

    const ActivityDashboard : React.FC<IProps> = ({target,activities,selectedActivity,selectActivity,
        cancelSelectActivity,editMode,openForm,closeForm,createOrEdit,deleteActivity,submitting})=>{
    return(
        <Grid>
            <GridColumn width="10">
                <ActivityList target={target} submitting={submitting} activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
            </GridColumn>
            <GridColumn width="6">
                {selectedActivity && !editMode  &&
                <ActivityDetails activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity}
                openForm = {openForm}
                />}
                {editMode &&
            <ActivityForm  submitting={submitting} key={selectedActivity?.id} createOrEdit={createOrEdit} closeForm={closeForm} activity ={selectedActivity}/>}
            </GridColumn>
        </Grid>
    )
}
export default ActivityDashboard;