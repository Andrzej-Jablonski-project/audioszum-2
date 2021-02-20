import { isMenuMobile } from "./js/menu.js"
import { buildBlogCards } from "./js/blogCards"

/*Service worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./js/service-worker.js');
}

console.log("EJ ALE WEŹ NIE PODGLĄDAJ, CO?");

isMenuMobile();
buildBlogCards();


