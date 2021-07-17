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
 @observable activity:Activity|null = null ;
 @observable editMode= false;
 @observable submitting = false;
 @observable target = '';
 
 

 constructor() {
  makeObservable(this);
}
@computed get activitiesByDate(){
  return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
}
groupActivitiesByDate(activities:Activity[]){
  const sortedActivities = activities.sort(
    (a,b)=>Date.parse(a.date)-Date.parse(b.date)

  )
  return Object.entries(sortedActivities.reduce((activities,activity)=>{
const date = activity.date.split('T')[0];
activities[date] = activities[date]?[...activities[date],activity]:[activity];
return activities;
  },{}as{[key:string]:Activity[]}));
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
  this.activity = activity;
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
 @action selectActivity =  (id?:string)=>{
   this.activity=this.activityRegistry.get(id);
   this.editMode = false;
 }
 @action cancelSelectedActivity = ()=>{
  this.activity = null;
}
@action openForm = (id?:string)=>{
  id? this.selectActivity(id): this.cancelSelectedActivity();
  this.editMode = true;
}
@action closeForm = ()=>{
  this.editMode = false;
}
@action loadActivity =async(id:string)=>{
  let activity = this.getActivity(id);
if(activity) {
 this.activity=activity;
}else{
this.loadingInitial = true;
try {
  activity = await agent.Activities.details(id);
  runInAction(()=>{
    this.selectActivity(activity.id);
    this.loadingInitial = false;
    this.submitting = false;
  });

} catch (error) {
  runInAction(()=>{
    this.loadingInitial = false;
  });
 console.log(error);
}


}

}

 getActivity =(id:string)=>{
  return this.activityRegistry.get(id);
  }
  @action clearActivity=()=>{
  this.activity = null;
  }
}

export default createContext(new ActivityStore());


