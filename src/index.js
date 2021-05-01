import { toggleMobileMenu, mobileMenu } from "./js/menu.js";
import { createBlogCards, sectionBlog, animation } from "./js/createBlogCards";
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
        window.addEventListener("scroll", displayDataLoadingAnimation);
    }

    sendForm();
}

function displayDataLoadingAnimation() {
    const scrollPosition = window.scrollY;
    const elTopPosition = sectionBlog.offsetTop;
    if (scrollPosition + 500 > elTopPosition) {
        animation.style.display = "flex";
        createBlogCards();
        window.removeEventListener("scroll", displayDataLoadingAnimation);
    }
}
