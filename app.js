import * as api from './data.js';
window.addEventListener('load', () => {

    const messages = document.querySelector('#messages');
    const control = document.querySelector('#controls');

    const [author, content, btnSend, btnRefresh, btnDelete] = control.querySelectorAll('input');

    function inputStyle(e) {

        if (e.target.value.length <= 0) {
            e.target.style.borderColor = 'red';
        } else {
            e.target.style.borderColor = '#ccc';
        }
    }
    author.addEventListener('input', inputStyle);
    content.addEventListener('input', inputStyle);

    async function sendMessage() {

        if (author.value !== '' && content.value !== '') {
            try {
                let data = await api.requests('POST', { author: author.value, content: content.value, today: moment(new Date()).format('DD.MM.YYYY / HH:mm') });
                author.value = '';
                content.value = '';
            } catch (error) {
                console.error(error);
                alert(error.message); n
            }
        } else {
            alert('All fields are required!');
            if (author.value === '') {
                author.style.borderColor = 'red';
            }
            if (content.value === '') {
                content.style.borderColor = 'red';
            }

        }



        refreshMessages();
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