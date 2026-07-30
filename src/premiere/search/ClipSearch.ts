export default class ClipSearch{

  byName(clips:any[],query:string){

    return clips.filter(c=>
      String(c.name??"")
      .toLowerCase()
      .includes(query.toLowerCase())
    );

  }

}
