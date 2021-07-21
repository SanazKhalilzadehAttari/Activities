import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import{RouteComponentProps} from 'react-router';
import { useEffect } from "react";
import { ActivityFormValues } from "../../../app/models/Activity";
import {Form as FinalForm,Field} from 'react-final-form'
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/CategoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import Time from "../../../app/common/form/TimeInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from "revalidate";
const validate = combineValidators({
    title: isRequired({message:'event Title is required'}),
    category: isRequired({message:'category'}),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message:'Description needs to be at least 5 characters'})
    )(),
    city : isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});
interface DetailParams{
    id:string
  }
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({match,history})=>{
    const activityStore = useContext(ActivityStore);
   const{submitting,loadActivity,editActivity,createActivity} = activityStore;
 
    const[loading,setLoading]= useState(false);
    const[activity,setActivity]= useState(new ActivityFormValues());

    useEffect(()=>{
        if(match.params.id){
           setLoading(true);
         loadActivity(match.params.id)
         .then((activity)=> setActivity(new ActivityFormValues(activity)))
         .finally(()=> setLoading(false));
         
        
        }
    
    },[match.params.id,loadActivity]);
     /*function handelSubmit=()=>{
        if(activity.id !== ''){
            editActivity(activity).then(()=> history.push(`/activities/${activity.id}`));;
        }else{
            createActivity(activity).then(()=> history.push(`/activities/${activity.id}`));
        }
        
    } 
   /* function handelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const{name,value}=event.target;
        setActivity({...activity,[name]:value})
    }*/
    const handleFinalFormSubmit = (values: any)=>{
        const dateAndTime = combineDateAndTime(values.date,values.time);
        const {date,time,...activity}= values;
        activity.date= dateAndTime;
        if(activity.id!){
            editActivity(activity);
        }else{
            createActivity(activity);
        }
    }
    return(
        <Grid>
            <Grid.Column width={10}>
            <Segment clearing>
                <FinalForm 
                validate={validate}
                initialValues={activity}
                onSubmit={handleFinalFormSubmit}
                render ={({handleSubmit, invalid,pristine })=>(

                    <Form onSubmit={handleSubmit} autocompelete='off' loading={loading}>
                    <Field placeholder='Title' value={activity.title} name='title' component={TextInput} />
                    <Field placeholder='Description'value={activity.description} name='description' rows={3} component={TextAreaInput}/>
                    <Field placeholder='Category'value={activity.category} name='category' options={category} component={SelectInput}/>
                    <Form.Group widths='equal' className="flex space-x-2 w-full">
                    <Field placeholder='Date'value={activity.date} name='date'  component={DateInput} />
                    <Field placeholder='Time'value={activity.date} name='time'  component={Time} />
                    </Form.Group >
                    <Field placeholder='City'value={activity.city} name='city' component={TextInput} />
                    <Field placeholder='Venue'value={activity.venue} name='venue' component={TextInput} /> 
                   <Button  disabled={loading} loading={submitting} floated='right' positive type="submit" content="Submit" ></Button>
                   <Button  disabled={loading || invalid || pristine} floated='right'  type="submit" content="Cancel" onClick={activity.id! ? ()=>history.push(`/activities/${activity.id}`) : ()=>history.push(`/activities`)}></Button>
                </Form>
                )}
                />
           
        </Segment>
            </Grid.Column>
        </Grid>
        
    )
}
export default observer(ActivityForm);
