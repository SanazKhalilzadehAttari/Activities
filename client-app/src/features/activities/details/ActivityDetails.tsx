import { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import ActivityStore from "../../../app/stores/activityStore";

const ActivityDetails = () =>{
  const activityStore = useContext(ActivityStore); 
  const {selectedActivity:activity, cancelSelectedActivity} = activityStore;
  if(!activity) return <LoadingComponent />;
  return(
        <Card fluid>
    <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span className='date'>{activity.date}</span>
      </Card.Meta>
      <Card.Description>
        {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group width='2'>
        <Button basic color='blue' content='Edit'onClick={()=> activityStore.openForm(activity.id)}/> 
        <Button basic color='grey' content='Cancel' onClick={cancelSelectedActivity}/>   
        </Button.Group>
    </Card.Content>
  </Card>
    )

}
export default ActivityDetails;