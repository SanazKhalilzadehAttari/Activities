import { action, observable, makeObservable, computed, configure,runInAction} from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { Activity } from "../models/Activity";
import {v4 as uuid} from 'uuid';


configure({enforceActions: 'always'});

export class ActivityStore{
  @observable activityRegistry= new Map();
 @observable activities:Activity[] = [];
 @observable loadingInitial = false;
 @observable selectedActivity:Activity|undefined ;
 @observable editMode= false;
 @observable submitting = false;
 @observable target = '';
 
 

 constructor() {
  makeObservable(this);
}
@computed get activitiesByDate(){
  return Array.from(this.activityRegistry.values()).sort(
    (a,b)=>Date.parse(a.date)-Date.parse(b.date)
    );
}
 @action loadactivities =async()=>{
     this.loadingInitial = true;
     try {
      const activities = await agent.Activities.list()
      runInAction( ()=> {
        activities.forEach((activity) => {
        activity.date = activity.date.split('.')[0];
        this.activityRegistry.set(activity.id,activity);
      });
      this.loadingInitial = false;
    })
      
     } catch (error) {
      runInAction(()=> {
        this.loadingInitial = false;
      });
       console.log(error);
     }
    
 };
  
 @action createActivity=async(activity:Activity)=>{
   this.submitting = true;
   activity.id = uuid();
  
   try {
    await agent.Activities.create(activity);
    runInAction(()=>{
      this.activityRegistry.set(activity.id,activity);
      this.editMode=false;
      this.submitting=false;
    });
   
   } catch (error) {
    runInAction(()=>{
     console.log(error);
     this.submitting=false;
    });
   }
 }
 @action editActivity=async(activity:Activity)=>{
  this.submitting = true;
  try {
  await agent.Activities.update(activity);
  runInAction(()=>{
  this.activityRegistry.set(activity.id,activity);
  this.selectedActivity = activity;
  this.editMode=false;
  this.submitting=false;
});
  } catch (error) {
    runInAction(()=>{
    console.log(error);
    this.submitting=false;
    });
  }
}
@action deleteActivity= async (event:SyntheticEvent<HTMLButtonElement>,id:string)=>{
this.submitting = true;
this.target = event.currentTarget.name;
try {
  await agent.Activities.delete(id);
  runInAction(()=>{
this.activityRegistry.delete(id);
this.submitting = false;
this.target ="";
  });
  
} catch (error) {
  runInAction(()=>{
  this.submitting = false;
  this.target = '';
  console.log(error);
  });
}
}
 @action selectActivity = (id:string)=>{
   this.selectedActivity=this.activityRegistry.get(id);
   this.editMode = false;
 }
 @action cancelSelectedActivity = ()=>{
  this.selectedActivity = undefined;
}
@action openForm = (id?:string)=>{
  id? this.selectActivity(id): this.cancelSelectedActivity();
  this.editMode = true;
}
@action closeForm = ()=>{
  this.editMode = false;
}
} 
export default createContext(new ActivityStore());


