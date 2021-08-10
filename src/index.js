import { toggleMobileMenu, mobileMenu } from "./js/menu.js";
import { loadBlogCards, sectionBlog } from "./js/createBlogCards";
import { sendForm } from "./js/form";

/*Service worker */
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}

console.log("EJ ALE WEŹ NIE PODGLĄDAJ, CO?");

document.addEventListener("DOMContentLoaded", loadScripts);

function loadScripts() {
    toggleMobileMenu.bind(mobileMenu);

    if (sectionBlog) {
        window.addEventListener("scroll", loadBlogCards);
    }

    sendForm();
}
