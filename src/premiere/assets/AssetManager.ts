export default class AssetManager{

  private assets:any[]=[];

  add(asset:any){
    this.assets.push(asset);
  }

  list(){
    return [...this.assets];
  }

}
