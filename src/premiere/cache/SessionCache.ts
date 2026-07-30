export default class SessionCache{

  private store=new Map<string,any>();

  set(key:string,value:any){
    this.store.set(key,value);
  }

  get(key:string){
    return this.store.get(key);
  }

  clear(){
    this.store.clear();
  }

}
