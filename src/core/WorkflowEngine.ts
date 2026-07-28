export interface WorkflowTask{

    id:string;

    name:string;

    status:"waiting"|"running"|"done"|"error";

}

export class WorkflowEngine{

    private tasks:WorkflowTask[]=[];

    add(task:WorkflowTask){

        this.tasks.push(task);

    }

    getTasks(){

        return this.tasks;

    }

    clear(){

        this.tasks=[];

    }

}

export const workflowEngine=new WorkflowEngine();