function buildBlogCards() {
    const card = document.querySelector(".blog-list");

    if (card) {
        const data = "https://digi-chip.pl/wp-json/wp/v2/posts?";

        fetch(data, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((response) => {
                function createCard(link, categories, title, image) {
                    const category = {
                        153: "Audio-Video",
                        154: "Komputery",
                        155: "Oprogramowanie",
                        158: "Programowanie",
                        160: "Projekty",
                    };

                    const structureOfCard = `<li class= "w-full mb-4 text-lg bg-mercury rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-150 ease-in-out">
                        <a href="${link}"><img class="m-auto object-cover w-full h-48" src="${image}" loading="lazy" alt=""></a><h3 class="p-6 text-sm text-astral font-semibold tracking-tight">${category[categories]}</h3>
                        <a class="hover:underline" href="${link}"><p class="px-6 pb-6 text-xl font-extrabold text-fiord">${title}</p></a></li >`;

                    card.innerHTML += structureOfCard;
                }

                for (let posts of response) {
                    const { link, title, categories, images } = posts;

                    createCard(link, categories, title.rendered, images.large);
                }

                function displayingCards(numberOfCard) {
                    const cards = document.querySelectorAll(".blog-list>li");

                    cards.forEach((card, index) =>
                        index > numberOfCard - 1
                            ? card.classList.add("hidden")
                            : null,
                    );
                }

                const numberOfCards = 6;

                displayingCards(numberOfCards);
            })

            .catch((err) => {
                console.log("Nie udało się pobrać danych");
                console.log(err);
            });
    }
}

export { buildBlogCards };
