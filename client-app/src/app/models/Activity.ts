export interface Activity {
        id: string;
        title: string;
        date: Date ;
        description: string;
        category: string;
        city: string;
        venue: string;
    }
export interface IActivityFormValues extends Partial<Activity>{
    time?:Date
}

export class ActivityFormValues implements IActivityFormValues{
    id?: string = undefined;
    title: string = '';
    category :  string = '';
    description: string = '';
    date? :Date = undefined;
    time? : Date= undefined;
    city: string = '';
    venue:string= '' ;
    constructor(init?: IActivityFormValues){
        console.log(init);
        if(init && init.date){
            init.time= init.date;
        }
        Object.assign(this,init);
    }
}