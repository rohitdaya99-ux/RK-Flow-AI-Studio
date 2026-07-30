export class UXPInspector {

  async inspectEverything() {

    console.clear();

    const PPRO = (window as any).PPRO;

    const project = await PPRO.Project.getActiveProject();
    const sequence = await project.getActiveSequence();
    const editor = PPRO.SequenceEditor.getEditor(sequence);

    const desc = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(editor),
      "createAddItemAction"
    );

    console.log("Descriptor:", desc);

    console.log(
      "Extensible:",
      Object.isExtensible(editor)
    );

  }

}

export const inspector = new UXPInspector();
