export default class RenderQueue{

  private queue:any[]=[];

  add(job:any){
    this.queue.push(job);
  }

  all(){
    return [...this.queue];
  }

  clear(){
    this.queue=[];
  }

}
