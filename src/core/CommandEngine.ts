export interface Command{

    command:string;

    payload?:any;

}

export class CommandEngine{

    execute(command:Command){

        console.log("Executing",command);

    }

}

export const commandEngine=new CommandEngine();