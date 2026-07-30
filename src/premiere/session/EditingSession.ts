import SessionCache from "../cache/SessionCache";

export default class EditingSession{

  readonly cache=new SessionCache();

  start(){

    this.cache.clear();

    return{
      active:true
    };

  }

}
