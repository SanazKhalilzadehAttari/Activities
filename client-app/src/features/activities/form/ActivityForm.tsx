import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import{RouteComponentProps} from 'react-router';
import { useEffect } from "react";
import { Activity } from "../../../app/models/Activity";
interface DetailParams{
    id:string
  }
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({match,history})=>{
    const activityStore = useContext(ActivityStore);
   const{
       activity:initialFormState,
       createActivity,
       editActivity,
       submitting,
       loadActivity,
    clearActivity} = activityStore;
   useEffect(()=>{
       if(match.params.id){
        loadActivity(match.params.id).then(()=> initialFormState && setActivity(initialFormState))  
       }
   return()=>{
       clearActivity()
   }
   },[clearActivity,match.params.id,loadActivity,initialFormState]);

    const[activity,setActivity]= useState<Activity>({
        id:'',
        title:'',
        category :'',
        description:'',
        date:'',
        city:'',
        venue:''  
    });
    function handelSubmit(){
        if(activity.id !== ''){
            editActivity(activity).then(()=> history.push(`/activities/${activity.id}`));;
        }else{
            createActivity(activity).then(()=> history.push(`/activities/${activity.id}`));
        }
        
    }
    function handelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const{name,value}=event.target;
        setActivity({...activity,[name]:value})
    }
    return(
        <Segment clearing>
            <Form onSubmit={handelSubmit} autocompelete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handelInputChange}/>
                <Form.TextArea placeholder='Description'value={activity.description} name='description' onChange={handelInputChange}/>
                <Form.Input placeholder='Category'value={activity.category} name='category' onChange={handelInputChange}/>
                <Form.Input placeholder='Date'value={activity.date} name='date' onChange={handelInputChange} type='datetime-local'/>
                <Form.Input placeholder='City'value={activity.city} name='city' onChange={handelInputChange}/>
                <Form.Input placeholder='Venue'value={activity.venue} name='venue' onChange={handelInputChange}/>
               <Button  loading={submitting} floated='right' positive type="submit" content="Submit" ></Button>
               <Button  floated='right'  type="submit" content="Cancel" onClick={()=>history.push(`/activities`)}></Button>
            </Form>
        </Segment>
    )
}
export default observer(ActivityForm);
