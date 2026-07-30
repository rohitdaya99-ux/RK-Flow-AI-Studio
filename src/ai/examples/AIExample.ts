import Agent from "../planner/Agent";

(async()=>{

  const agent=new Agent();

  console.log(
    await agent.run(
      "Create a 30 second cinematic Indian wedding reel with beat sync smooth transitions and export for Instagram"
    )
  );

})();
