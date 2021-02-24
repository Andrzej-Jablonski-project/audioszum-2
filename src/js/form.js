function sendForm() {
    const btnForm = document.querySelector('#btn-form');

    const message = {
        phrase: 'Hej, zanim wyślesz:',
        wrongEmail: ' wpisz poprawny adres',
        emptyEmail: ' wpisz swój email',
        emptyTextArea: ' napisz wiadomość',
        statusSendMessageIsOk: ' Wiadomość została wysłana',
        statusSendMessageNotOk: 'Uzupełnij prawidłowo formularz',
        boxStatus: document.querySelector('#form-info-text'),

        viewMessage(state) {
            switch (state) {
                case 'emptyEmail': this.boxStatus.textContent = `${this.phrase} ${this.emptyEmail}`;
                    break;
                case 'wrongEmail': this.boxStatus.textContent = `${this.phrase} ${this.wrongEmail}`;
                    break;
                case 'emptyTextArea': this.boxStatus.textContent = `${this.phrase} ${this.emptyTextArea}`;
                    break;
                case 'emptyTextAreaAndEmptyEmail': this.boxStatus.textContent = `${this.phrase} ${this.emptyEmail} i ${this.emptyTextArea}`;
                    break;
                case 'emptyTextAreaAndWrongEmail': this.boxStatus.textContent = `${this.phrase} ${this.wrongEmail} i ${this.emptyTextArea}`;
                    break;
                default: this.boxStatus.textContent = '';
            }
        }
    }

    if (btnForm) {
        const emailInput = document.querySelector('#email-to');
        const textArea = document.querySelector('#text-area-form');

        const stateValidation = {
            isValidated: false,
            isEmptyEmail: 'emptyEmail',
            isWrongEmail: '',
            isEmptyMessage: 'emptyTextArea'
        }



        function checkIsEmpty(value) {
            return !value
        }



        function checkIsEmail(value) {
            const patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return patternEmail.test(value)
        }



        const checkEmail = (e) => {

            if (checkIsEmpty(e.target.value)) {
                message.viewMessage(stateValidation.isEmptyEmail);
                stateValidation.isEmptyEmail = 'emptyEmail';
                stateValidation.isValidated = false;

            } else if (!checkIsEmail(e.target.value)) {
                stateValidation.isWrongEmail = 'wrongEmail';
                stateValidation.isEmptyEmail = 'false';
                stateValidation.isValidated = false;
                message.viewMessage(stateValidation.isWrongEmail);

            } else {

                if (stateValidation.isEmptyMessage === 'false') {
                    stateValidation.isValidated = true;
                } else {
                    stateValidation.isValidated = false;
                }

                stateValidation.isEmptyEmail = 'false';
                stateValidation.isWrongEmail = 'false';
                message.viewMessage('');
            }
        }



        const checkTextArea = (e) => {

            if (checkIsEmpty(e.target.value) && stateValidation.isEmptyEmail === 'emptyEmail') {
                stateValidation.isEmptyMessage = 'emptyTextAreaAndEmptyEmail';
                stateValidation.isValidated = false;
                message.viewMessage(stateValidation.isEmptyMessage);

            } else if (checkIsEmpty(e.target.value) && stateValidation.isWrongEmail === 'wrongEmail') {
                stateValidation.isEmptyMessage = 'emptyTextAreaAndWrongEmail';
                stateValidation.isValidated = false;
                message.viewMessage(stateValidation.isEmptyMessage);

            } else if (checkIsEmpty(e.target.value) && stateValidation.isWrongEmail !== 'wrongEmail') {
                stateValidation.isEmptyMessage = 'emptyTextArea';
                stateValidation.isValidated = false;
                message.viewMessage(stateValidation.isEmptyMessage);

            } else if (!checkIsEmpty(e.target.value) && stateValidation.isEmptyEmail === 'emptyEmail') {
                stateValidation.isEmptyMessage = 'false';
                stateValidation.isValidated = false;
                message.viewMessage(stateValidation.isEmptyEmail);

            } else if (!checkIsEmpty(e.target.value) && stateValidation.isWrongEmail === 'wrongEmail') {
                stateValidation.isWrongMessage = 'false';
                stateValidation.isValidated = false;
                message.viewMessage(stateValidation.isWrongEmail);

            } else {
                stateValidation.isValidated = true;
                stateValidation.isEmptyMessage = 'false';
                message.viewMessage(stateValidation.isEmptyMessage);
            }
        }

        emailInput.addEventListener('click', checkEmail);
        emailInput.addEventListener('keyup', checkEmail);

        textArea.addEventListener('click', checkTextArea);
        textArea.addEventListener('keyup', checkTextArea);


        const form = document.querySelector('#contact-form');

        btnForm.addEventListener('click', (e) => {

            e.preventDefault();

            const emailValue = document.querySelector('#email-to').value;
            const textAreaValue = document.querySelector('#text-area-form').value;
            const To = "";
            const token = "";

            if (stateValidation.isValidated) {

                Email.send({
                    SecureToken: token,
                    To,
                    From: `${emailValue}`,
                    Subject: "Wiadomość z formularza audioszum.pl",
                    Body: `${textAreaValue}`
                }).then(
                    message => console.log(message)
                );

                message.boxStatus.textContent = `${message.statusSendMessageIsOk} `;
                stateValidation.isValidated = false;
                form.reset();

            } else {
                message.boxStatus.textContent = `${message.statusSendMessageNotOk} `;
            }
        })
    }
}

export { sendForm };