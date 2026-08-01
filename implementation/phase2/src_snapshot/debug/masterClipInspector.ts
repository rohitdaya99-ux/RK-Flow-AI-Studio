export function inspectMasterClip(masterClip: any) {
    if (!masterClip) {
        console.log("MasterClip: NULL");
        return;
    }

    const visited = new Set<any>();
    let proto: any = masterClip;
    let level = 0;

    while (proto && !visited.has(proto)) {
        visited.add(proto);

        console.log("\n========================================");
        console.log("MASTERCLIP LEVEL", level);
        console.log("========================================");

        const props = Object.getOwnPropertyNames(proto).sort();

        for (const p of props) {
            try {
                const v = proto[p];
                console.log(`${typeof v === "function" ? "FUNC" : "PROP"} ${p}`);
            } catch {
                console.log(`PROP ${p}`);
            }
        }

        proto = Object.getPrototypeOf(proto);
        level++;
    }
}
