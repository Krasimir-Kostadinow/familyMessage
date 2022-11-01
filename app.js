import * as api from './data.js';
window.addEventListener('load', () => {

    const messages = document.querySelector('#messages');
    const control = document.querySelector('#controls');

    const [author, content, btnSend, btnRefresh, btnDelete] = control.querySelectorAll('input');
    let date = new Date();
    console.log(date);
    let today = moment(new Date()).format('DD.MM.YYYY / HH.mm');
    console.log(today);
    async function sendMessage() {

        if (author.value !== '' && content.value !== '') {
            try {
                let data = await api.requests('POST', { author: author.value, content: content.value, today: moment(new Date()).format('DD.MM.YYYY / HH.mm') });
                author.value = '';
                content.value = '';
                author.style.borderColor = '#ccc';
                content.style.borderColor = '#ccc';
                refreshMessages();
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        } else {
            if (author.value === '') {
                author.style.borderColor = 'red';
            } else {
                author.style.borderColor = '#ccc';
            }

            if (content.value === '') {
                content.style.borderColor = 'red';
            } else {
                content.style.borderColor = '#ccc';
            }
            alert('All fields are required!');
        }

    }

    async function refreshMessages() {
        try {
            let data = await api.requests('GET');
            if (data !== null) {
                let arrayMessages = Object.values(data)
                let contentMessages = arrayMessages.reduce((acc, message) => {
                    let { author, content, today } = message;
                    acc.push(`${today} - ${author}: ${content}`);
                    return acc;
                }, []);
                messages.value = contentMessages.join('\n');
            } else {
                messages.value = '';
            }

        } catch (error) {
            console.error(error);
            alert(error.message);
        }

    }

    async function deleteMessages() {
        try {
            let data = await api.requests('DELETE');
            refreshMessages();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }
    btnSend.addEventListener('click', sendMessage);
    btnRefresh.addEventListener('click', refreshMessages);
    btnDelete.addEventListener('click', deleteMessages)











});