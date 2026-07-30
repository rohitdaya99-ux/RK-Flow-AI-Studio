export default class PremiereHistory{

  private history:string[]=[];

  add(action:string){
    this.history.push(action);
  }

  all(){
    return [...this.history];
  }

  clear(){
    this.history=[];
  }

}
