const mobileMenu = {
    self: document.querySelector("#mobile-menu"),
    btns: [
        document.querySelector("#btn-open-menu-mobile"),
        document.querySelector("#btn-close-menu-mobile"),
    ],
    list: [...document.querySelectorAll("#list-menu-mobile>li")],
};

mobileMenu.btns.forEach((btn) => {
    if (btn) {
        btn.addEventListener("click", toggleMobileMenu.bind(mobileMenu));
    }
});

mobileMenu.list.forEach((li) => {
    if (li) {
        li.addEventListener("click", toggleMobileMenu.bind(mobileMenu));
    }
});

function toggleMobileMenu() {
    if (this.self) {
        this.self.classList.toggle("hidden");
        this.btns.forEach((btn) => btn.classList.toggle("hidden"));
    }
}

export { toggleMobileMenu };
