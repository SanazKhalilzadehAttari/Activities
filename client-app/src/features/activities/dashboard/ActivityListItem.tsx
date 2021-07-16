import { useContext } from "react";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { Activity } from "../../../app/models/Activity";


const ActivityListItem: React.FC<{ activity: Activity }> = ({ activity }) => {
    const activityStore = useContext(ActivityStore);
    const { deleteActivity, target, submitting } = activityStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>

                <Item key={activity.id}>
                    <Item.Image size='tiny' circular src='/assets/user.png' />
                    <Item.Content>
                        <Item.Header as="a">{activity.title}</Item.Header>

                        <Item.Description>
                            Hosted by bob
                        </Item.Description>
                      
                    </Item.Content>

                </Item>
                </Item.Group>
               
            </Segment>
            <Segment>
                <Icon name="clock" />{activity.date}
                <Icon name="marker" />{activity.venue},{activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go there
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
            </Segment>
        </Segment.Group>


    )
}
export default observer(ActivityListItem);