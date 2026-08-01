export class UXPInspector {

    async inspectEverything() {
        return this.inspectSequenceEditor();
    }

    async inspectSequenceEditor() {
        const PPRO = (window as any).PPRO;
        const p = PPRO.SequenceEditor.prototype;

        const methods = [
            "createAddItemAction",
            "createAddItemsAction",
            "createInsertProjectItemAction",
            "createOverwriteItemAction",
            "createCloneTrackItemAction",
            "createRemoveItemsAction"
        ];

        for (const m of methods) {
            console.log("\n======================");
            console.log(m);

            try {
                console.log(p[m].toString());
            } catch (e) {
                console.error(e);
            }
        }
    }
}

export const inspector = new UXPInspector();

(window as any).inspectSequenceEditor = () => inspector.inspectSequenceEditor();
(window as any).inspectEverything = () => inspector.inspectEverything();
