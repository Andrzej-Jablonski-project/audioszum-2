import 'normalize.css';
import '/style/index.scss';
console.log("hello world!");

document.addEventListener('DOMContentLoaded', (e) => {

    const menuMobile = {
        button: document.querySelector('#btn-open-menu-mobile'),
        buttonOnList: document.querySelector('#btn-close-menu-mobile'),
        boxMenu: document.querySelector('#mobile-menu'),
        menuLinks: [...document.querySelectorAll('#list-menu-mobile>li')],

        isToggle(btn) {
            btn.addEventListener('click', () => {
                this.boxMenu.classList.toggle('hidden')
            })
        },

        isCloseLink() {
            this.menuLinks.forEach(li => {
                li.addEventListener('click', () => {
                    this.boxMenu.classList.add('hidden');
                })

            })
        }

    }
    menuMobile.isToggle(menuMobile.button);
    menuMobile.isToggle(menuMobile.buttonOnList);
    menuMobile.isCloseLink();

})

const data = 'https://digi-chip.pl/wp-json/wp/v2/posts?';

fetch(data, {
    method: 'GET',
})
    .then(response => response.json())
    .then(response => {

        const card = document.querySelector('.blog-list');

        function createCard(link, categories, title, image) {

            const category = {
                153: 'Audio-Video',
                154: 'Komputery',
                155: 'Oprogramowanie',
                158: 'Programowanie',
                160: 'Projekty',

                isNumber() {
                    const [value] = categories
                    return value
                }
            }

            card.innerHTML += `<li class= "w-full mb-4 text-lg bg-mercury sm:rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-150 ease-in-out" >
                <a href="${link}"><img class="m-auto bg-cover bg-center" src="${image}" alt=""></a><h3 class="p-6 text-sm text-astral font-semibold tracking-tight">${category[category.isNumber()]}</h3 >
                <a class="hover:underline" href="${link}"><p class="px-6 pb-6 text-xl font-extrabold text-fiord">${title}</p></a></li > `;
        }

        for (let posts of response) {

            const { link, title, categories, images } = posts;

            createCard(link, categories, title.rendered, images.large);
        }

        function countCard(numberOfCard) {

            const cards = document.querySelectorAll('.blog-list>li');

            for (let i = 0; i < cards.length; i++) {
                if (i > numberOfCard - 1) {
                    cards[i].classList.add('hidden');
                }
            }
        }
        countCard(6);
    })

    .catch(err => {
        console.log('Nie udało się pobrać danych');
        console.log(err)
    })