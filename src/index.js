import 'normalize.css';
import '/style/index.scss';
console.log("hello world!");

document.addEventListener('DOMContentLoaded', (e) => {

    const menuMobile = {
        button: document.querySelector('#btn-open-menu-mobile'),
        buttonOnList: document.querySelector('#btn-close-menu-mobile'),
        boxMenu: document.querySelector('#menu-mobile'),
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