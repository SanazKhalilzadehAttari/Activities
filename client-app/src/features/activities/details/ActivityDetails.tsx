import React from "react";
import { useContext } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import{RouteComponentProps} from 'react-router';
import ActivityStore from "../../../app/stores/activityStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSideBar from "./ActivityDetailsSideBar";
interface DetailParams{
  id:string
}
const ActivityDetails : React.FC<RouteComponentProps<DetailParams>> = ({match}) =>{
  const activityStore = useContext(ActivityStore); 
  const {activity,loadActivity,loadingInitial} = activityStore;

  useEffect(() => {
    loadActivity(match.params.id)
  }, [loadActivity,match.params.id]);
  if(loadingInitial || !activity) return <LoadingComponent content="loading activity ..."/>;
  return(
    <Grid>
      <Grid.Column width={10}>
      <ActivityDetailHeader activity={activity}/>
      <ActivityDetailInfo  activity={activity}/>
      <ActivityDetailedChat/>
      </Grid.Column>
     <Grid.Column width={6}>
     <ActivityDetailedSideBar/>
     </Grid.Column>
     </Grid>
       
    )

}
export default observer(ActivityDetails);