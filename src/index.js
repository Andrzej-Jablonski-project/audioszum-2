import { toggleMobileMenu, mobileMenu } from "./js/menu.js";
import { loadBlogCards, sectionBlog } from "./js/createBlogCards";
import { sendForm, form } from "./js/form";

/*Service worker */
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}

console.log("EJ ALE WEŹ NIE PODGLĄDAJ, CO?");

document.addEventListener("DOMContentLoaded", loadScripts);

function loadScripts() {
    toggleMobileMenu.bind(mobileMenu);

    if (sectionBlog) {
        loadBlogCards();
    }
    if (form) {
        sendForm();
    }
}
