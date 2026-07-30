function listMethods(obj: any): string[] {
  if (!obj) return [];

  const methods = new Set<string>();

  let proto = obj;
  while (proto && proto !== Object.prototype) {
    for (const name of Object.getOwnPropertyNames(proto)) {
      if (
        typeof (obj as any)[name] === "function" &&
        name !== "constructor"
      ) {
        methods.add(name);
      }
    }
    proto = Object.getPrototypeOf(proto);
  }

  return [...methods].sort();
}

export async function inspectPremiereAPI() {

  console.log("STEP 1");
  const PPRO = (window as any).PPRO;
  console.log("PPRO =", PPRO);

  if (!PPRO) {
    console.error("PPRO API not found.");
    return;
  }

  console.log("STEP 2");
  const project = await PPRO.Project.getActiveProject();
  console.log("PROJECT =", project);

  if (!project) {
    console.error("No active project.");
    return;
  }

  console.log("STEP 4");
    const sequence = await project.getActiveSequence();
    console.log("SEQUENCE =", sequence);

  console.group("RK Flow UXP Inspector");

  console.log("=== Project Methods ===");
  console.table(listMethods(project));

  console.log("=== Sequence Methods ===");
  console.table(listMethods(sequence));

  console.log("STEP 5");
    const selection = await sequence.getSelection();
    console.log("SELECTION =", selection);
  console.log("=== Selection Methods ===");
  console.table(listMethods(selection));

  console.log("STEP 6");
    const items = await selection.getTrackItems();
    console.log("ITEMS =", items);

  if (items.length) {
    console.log("=== First Selected Clip Methods ===");
    console.table(listMethods(items[0]));
  } else {
    console.warn("No selected clips.");
  }

  console.groupEnd();
}


export async function testMoveAction() {

  console.log("STEP 1");
  const PPRO = (window as any).PPRO;
  console.log("PPRO =", PPRO);

  console.log("STEP 2");
  const project = await PPRO.Project.getActiveProject();
  console.log("PROJECT =", project);

  console.log("STEP 3");
  await project.lockedAccess(async () => {
    console.log("INSIDE LOCK");

    console.log("STEP 4");
    const sequence = await project.getActiveSequence();
    console.log("SEQUENCE =", sequence);
    console.log("STEP 5");
    const selection = await sequence.getSelection();
    console.log("SELECTION =", selection);
    console.log("STEP 6");
    const items = await selection.getTrackItems();
    console.log("ITEMS =", items);

    if (!items.length) {
      console.log("No clip selected");
      return;
    }

    const clip = items[0];

    console.log("===== CLIP =====");
    console.table(Object.getOwnPropertyNames(Object.getPrototypeOf(clip)));

    console.log("createMoveAction =", clip.createMoveAction);
    console.log("createMoveAction.length =", clip.createMoveAction.length);
    console.log("createMoveAction.toString =", clip.createMoveAction.toString());

    try {
      const tick = PPRO.TickTime.createWithSeconds(1);

      console.log("Tick =", tick);

      const action = clip.createMoveAction(tick);

      console.log("===== ACTION =====");
      console.log(action);

      console.log("ACTION PROTOTYPE");
      console.table(Object.getOwnPropertyNames(Object.getPrototypeOf(action)));

      console.log("ACTION KEYS");
      console.table(Object.keys(action));

      console.log("ACTION ALL PROPERTIES");
      console.log(Reflect.ownKeys(action));

      return action;

    } catch (e) {
      console.error("createMoveAction ERROR:", e);
    }

  });

}
