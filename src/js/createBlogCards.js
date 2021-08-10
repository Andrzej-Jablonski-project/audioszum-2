const sectionBlog = document.querySelector("#blog");
const cards = document.querySelector(".blog-list");
const loadAnimation = document.querySelector(".sk-wave");
const errorMessage = document.querySelector(".error-js");
const wrapperBlog = document.querySelector(".wrapper-blog");
const btn = document.querySelector(".reload-button-js");
const API = "https://digi-chip.pl/wp-json/wp/v2/posts?";

let isLoader = true;

function loadBlogCards() {
    const scrollPosition = window.scrollY;
    const elTopPosition = sectionBlog.offsetTop;
    if (scrollPosition + 500 > elTopPosition) {
        loader(loadAnimation);
        createBlogCards();
        window.removeEventListener("scroll", loadBlogCards);
    }
}

async function createBlogCards() {
    if (cards) {
        try {
            const res = await fetch(API, { method: "GET" });

            if (!res.ok) {
                throw new Error(`Error request, status: ${res.status}`);
            }
            const json = await res.json();

            for (const posts of json) {
                const {
                    link,
                    title: { rendered },
                    categories,
                    images: { large },
                } = posts;
                createCard(link, categories, rendered, large);
            }
            const numberOfCards = 6;

            displayingCards(numberOfCards);
            cards.classList.add("box-on");
            cards.classList.remove("box-off");
            wrapperBlog.style.height = "auto";
        } catch (err) {
            console.error(err);
            errorMessage.style.display = "flex";
            errorMessage.classList.add("box-on");
            errorMessage.classList.remove("box-off");
            reloadBlogCards();
        } finally {
            isLoader = false;
            loader(loadAnimation);
        }
    }
}

function createCard(link, categories, title, image) {
    const category = {
        153: "Audio-Video",
        154: "Komputery",
        156: "Perełki Youtuba",
        155: "Oprogramowanie",
        158: "Programowanie",
        160: "Projekty",
    };

    const structureOfCard = `<li class= "w-full mb-4 text-lg bg-mercury rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-150 ease-in-out">
        <a href="${link}"><img class="m-auto object-cover w-full h-48" src="${image}" loading="lazy" alt=""></a><h3 class="p-6 text-sm text-astral font-semibold tracking-tight">${category[categories]}</h3>
        <a class="hover:underline" href="${link}"><p class="px-6 pb-6 text-xl font-extrabold text-fiord">${title}</p></a></li >`;

    cards.innerHTML += structureOfCard;
}

function displayingCards(numberOfCard) {
    const cards = document.querySelectorAll(".blog-list>li");
    cards.forEach((card, index) => {
        if (index > numberOfCard - 1) {
            card.classList.add("hidden");
        }
    });
}

function loader(el) {
    if (isLoader) {
        el.style.display = "flex";
    } else {
        el.style.display = "none";
    }
}

function reloadBlogCards() {
    const heightBoxError = errorMessage.offsetHeight.toString();
    console.log(heightBoxError);
    btn.addEventListener("click", () => {
        isLoader = true;
        errorMessage.style.display = "none";
        wrapperBlog.style.position = "relative";
        wrapperBlog.style.height = `${heightBoxError}px`;
        loadAnimation.classList.add("load-position");
        loader(loadAnimation);
        setTimeout(createBlogCards, 500);
    });
}

export { loadBlogCards, sectionBlog };
