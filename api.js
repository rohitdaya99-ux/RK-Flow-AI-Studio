try {
    const ppro = require("premierepro");

    window.PPRO = ppro;

    console.log("Premiere module loaded");
    console.log(ppro);
} catch (e) {
    console.error("API LOAD ERROR:", e);
}