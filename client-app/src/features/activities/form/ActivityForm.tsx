import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";

const ActivityForm: React.FC = ()=>{
    const activityStore = useContext(ActivityStore);
   const{selectedActivity,createActivity,editActivity,submitting,closeForm} = activityStore;
    const initialState =() =>{
    if(selectedActivity){
        return selectedActivity;
    } else {
        return{
            id:'',
            title:'',
            category :'',
            description:'',
            date:'',
            city:'',
            venue:''   
        }  
    }
}
    const[activity,setActivity]= useState(initialState);
    function handelSubmit(){
        if(activity.id !== ''){
            editActivity(activity);
        }else{
            createActivity(activity);
        }
        
    }
    function handelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const{name,value}=event.target;
        setActivity({...activity,[name]:value})
    }
    return(
        <Segment clearing>
            <Form onSubmit={handelSubmit} autoCompelete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handelInputChange}/>
                <Form.TextArea placeholder='Description'value={activity.description} name='description' onChange={handelInputChange}/>
                <Form.Input placeholder='Category'value={activity.category} name='category' onChange={handelInputChange}/>
                <Form.Input placeholder='Date'value={activity.date} name='date' onChange={handelInputChange} type='datetime-local'/>
                <Form.Input placeholder='City'value={activity.city} name='city' onChange={handelInputChange}/>
                <Form.Input placeholder='Venue'value={activity.venue} name='venue' onChange={handelInputChange}/>
               <Button  loading={submitting} floated='right' positive type="submit" content="Submit" ></Button>
               <Button  floated='right'  type="submit" content="Cancel" onClick={closeForm}></Button>
            </Form>
        </Segment>
    )
}
export default observer(ActivityForm);
