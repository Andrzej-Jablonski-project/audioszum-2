const sectionBlog = document.querySelector("#blog");
const cards = document.querySelector(".blog-list");
const animation = document.querySelector(".sk-wave");
const errorMessage = document.querySelector(".error-js");
const URL = "https://digi-chip.pl/wp-json/wp/v2/posts?";

async function createBlogCards() {
    if (cards) {
        try {
            const res = await fetch(URL);

            if (!res.ok) {
                throw new Error(`Http error: ${res.status}`);
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

            setTimeout(() => {
                animation.style.display = "none";
                cards.classList.add("box-on");
                cards.classList.remove("box-off");
            }, 1000);
        } catch (err) {
            console.error(err);
            const btn = sectionBlog.querySelector("div > button");

            btn.addEventListener("click", () => {
                animation.style.display = "flex";
                errorMessage.style.display = "none";
                createBlogCards();
            });

            setTimeout(() => {
                animation.style.display = "none";
                errorMessage.style.display = "flex";
                sectionBlog.querySelector(".error-js").classList.add("box-on");
                sectionBlog
                    .querySelector(".error-js")
                    .classList.remove("box-off");
            }, 1000);
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

export { createBlogCards, sectionBlog, animation };
