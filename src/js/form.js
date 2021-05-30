import { Email } from "./libraries/smtp";

class Validation {
    constructor(boxStatus) {
        this.boxStatus = boxStatus;
        // eslint-disable-next-line no-useless-escape
        this.regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.char = 3;
        this.isEmail = false;
        this.isMessage = false;
    }

    checkInput(element, event) {
        element.addEventListener(event, (e) => {
            this.isEmail = this.checkIsEmail(e.target.value);
            this.showInfo(false);
        });
    }

    checkTextArea(element, event) {
        element.addEventListener(event, (e) => {
            this.isMessage = this.checkIsMessage(e);
            this.showInfo(false);
        });
    }

    showInfo(isOk) {
        const message = {
            phrase: "Hej, zanim wyślesz:",
            wrongEmail: " wpisz poprawny adres email",
            emptyEmail: " wpisz swój email",
            emptyTextArea: " napisz wiadomość",
            sendMessageIsOk: " Wiadomość została wysłana",
            sendMessageNotOk: "Uzupełnij prawidłowo formularz",
        };

        if (!this.isEmail && !this.isMessage) {
            this.boxStatus.textContent = `${message.phrase}${message.wrongEmail} i ${message.emptyTextArea}`;
        } else if (!this.isMessage) {
            this.boxStatus.textContent = message.phrase + message.emptyTextArea;
        } else if (!this.isEmail) {
            this.boxStatus.textContent = message.phrase + message.wrongEmail;
        } else {
            this.boxStatus.textContent = "";
        }

        return isOk ? message.sendMessageIsOk : message.sendMessageNotOk;
    }

    checkIsMessage(e) {
        return e.target.value.length > this.char;
    }

    checkIsEmail(value) {
        return this.regexpEmail.test(value);
    }
}

const boxStatus = document.querySelector("#form-info-text");
let isValidated = false;
const formValid = new Validation(boxStatus);

function sendForm() {
    const btnForm = document.querySelector("#btn-form");

    if (btnForm) {
        const emailInput = document.querySelector("#email-to");
        const textArea = document.querySelector("#text-area-form");

        const form = document.querySelector("#contact-form");

        formValid.checkInput(emailInput, "click");
        formValid.checkInput(emailInput, "keyup");
        formValid.checkTextArea(textArea, "click");
        formValid.checkTextArea(textArea, "keyup");

        btnForm.addEventListener("click", (e) => {
            e.preventDefault();

            const emailValue = document.querySelector("#email-to").value;
            const textAreaValue = document.querySelector("#text-area-form")
                .value;
            const To = "";
            const token = "";

            isValidated = formValid.isEmail && formValid.isMessage;

            if (isValidated) {
                Email.send({
                    SecureToken: token,
                    To,
                    From: `${emailValue}`,
                    Subject: "Wiadomość z formularza audioszum.pl",
                    Body: `${textAreaValue}`,
                }).then((message) => console.log(message));

                boxStatus.textContent = `${formValid.showInfo(true)} `;
                formValid.isEmail = false;
                formValid.isMessage = false;
                form.reset();
            } else {
                boxStatus.textContent = `${formValid.showInfo(false)} `;
            }
        });
    }
}

export { sendForm };
