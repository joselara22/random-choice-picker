const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');
const respin = document.querySelector('.respin');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
    if (respin.hasChildNodes()) {
        respin.innerHTML = "";
    }

    createTags(e.target.value);


    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)
        randomSelect()
    }
});

function createTags(input) {
    const tags = input.split(',').filter(tag => tag.trim() 
        !== '').map(tag => tag.trim());
    
    tagsEl.innerText = '';

    tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = tag;
        tagsEl.appendChild(tagEl);
    })
}

function randomSelect() {
    const times = 30;

    const interval = setInterval(() => {
        const randomTag = pickRandomTag();
        
        highlightTag(randomTag);

        setTimeout(() => {
            unhighlightTag(randomTag);
        }, 100)
    }, 100);

    setTimeout(() => {
        clearInterval(interval);

        setTimeout(() => {
            const randomTag = pickRandomTag();

            highlightTag(randomTag);

            const respinButton = document.createElement('button');
            respinButton.classList.add('respinBtn');
            respinButton.innerText = 'Respin';
            respin.appendChild(respinButton);

            respinButton.addEventListener('click', () => {
                respin.removeChild(respinButton);
                randomSelect();
            });

        }, 100)
    }, times * 100);
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
    tag.classList.add('highlight');
}
function unhighlightTag(tag) {
    tag.classList.remove('highlight');
}
