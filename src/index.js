import { toggleMobileMenu } from "./js/menu.js";
import { buildBlogCards } from "./js/blogCards";
import { sendForm } from "./js/form";

/*Service worker */
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}

console.log("EJ ALE WEŹ NIE PODGLĄDAJ, CO?");

document.addEventListener("DOMContentLoaded", toggleMobileMenu);
document.addEventListener("DOMContentLoaded", loadScripts);

function loadScripts() {
    buildBlogCards();
    sendForm();
}
