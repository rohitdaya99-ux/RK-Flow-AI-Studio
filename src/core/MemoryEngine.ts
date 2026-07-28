export class MemoryEngine{

    private memory = new Map<string,any>();

    set(key:string,value:any){

        this.memory.set(key,value);

    }

    get(key:string){

        return this.memory.get(key);

    }

    clear(){

        this.memory.clear();

    }

}

export const memoryEngine = new MemoryEngine();