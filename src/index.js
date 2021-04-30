import { toggleMobileMenu, mobileMenu } from "./js/menu.js";
import { buildBlogCards, sectionBlog, card } from "./js/blogCards";
import { sendForm } from "./js/form";

/*Service worker */
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}

console.log("EJ ALE WEŹ NIE PODGLĄDAJ, CO?");

document.addEventListener("DOMContentLoaded", loadScripts);

function loadScripts() {
    toggleMobileMenu.bind(mobileMenu);
    const loadAnimation = sectionBlog.querySelector(".sk-wave");

    window.addEventListener("scroll", displayDataLoadingAnimation);

    function displayDataLoadingAnimation() {
        const scrollPosition = window.scrollY;
        const elTopPosition = sectionBlog.offsetTop;
        if (scrollPosition + 500 > elTopPosition) {
            loadAnimation.style.display = "flex";
            setTimeout(() => {
                loadAnimation.style.display = "none";
                card.classList.add("box-on");
                card.classList.remove("box-off");
                sectionBlog.querySelector(".error-js").classList.add("box-on");
                sectionBlog
                    .querySelector(".error-js")
                    .classList.remove("box-off");
                window.removeEventListener(
                    "scroll",
                    displayDataLoadingAnimation,
                );
            }, 3000);
        }
    }
    buildBlogCards();
    sendForm();
}
