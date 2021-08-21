import { Email } from "./libraries/smtp";
class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.formErrors = [false, false];
        this.isValid = false;
    }

    initialize() {
        this.validateOnEntry();
        this.validateOnSubmit();
    }

    validateOnSubmit() {
        let self = this;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            self.fields.forEach((field) => {
                const input = document.querySelector(`.${field}`);
                self.validateFields(input);
                this.isValid = this.formErrors.includes(false);
            });

            const errorMessage = document.querySelector(".error-message-js");
            const To = "";
            const token = "";

            if (!this.isValid) {
                Email.send({
                    SecureToken: token,
                    To,
                    From: document.querySelector(`.${self.fields[0]}`).value,
                    Subject: "Wiadomość z formularza audioszum.pl",
                    Body: document.querySelector(`.${self.fields[1]}`).value,
                }).then((message) => {
                    if (message === "OK") {
                        form.reset();
                        this.isValid = false;
                        errorMessage.textContent = "Hej, wysłałeś/aś wiadomość";
                    } else {
                        errorMessage.textContent =
                            "Hej, coś poszło nie tak, spróbuj wysłać ponownie";
                    }
                });
            }
        });
    }

    validateOnEntry() {
        let self = this;
        this.fields.forEach((field) => {
            const input = document.querySelector(`.${field}`);

            // eslint-disable-next-line no-unused-vars
            input.addEventListener("input", (event) => {
                self.validateFields(input);
                this.isValid = this.formErrors.includes(false);
            });
        });
    }

    validateFields(field) {
        let self = this;
        // check for a valid massage
        if (field.name === "message") {
            if (field.value.trim() === "") {
                self.setStatus("napisz wiadomość", "error");
                this.formErrors[0] = false;
            } else {
                self.setStatus(null, "success");
                this.formErrors[0] = true;
            }
        }

        // check for a valid email address
        if (field.type === "email") {
            // eslint-disable-next-line no-useless-escape
            const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (regExp.test(field.value)) {
                self.setStatus(null, "success");
                this.formErrors[1] = true;
            } else {
                self.setStatus("wprowadź poprawny adres email", "error");
                this.formErrors[1] = false;
            }
        }
    }

    setStatus(message, status) {
        const errorMessage = document.querySelector(".error-message-js");

        if (status === "success") {
            errorMessage.textContent = message;

            if (errorMessage.textContent === "" && this.isValid) {
                errorMessage.textContent =
                    "Hej, zanim wyślesz: wypełnij poprawnie formularz";
            }
        }

        if (status === "error") {
            errorMessage.textContent = `Hej, zanim wyślesz: ${message}`;
        }
    }
}

const form = document.querySelector(".form-js");
const fields = ["email-js", "msg-js"];

const validator = new FormValidator(form, fields);

function sendForm() {
    form.setAttribute("novalidate", true);
    validator.initialize();
}

export { sendForm, form };
