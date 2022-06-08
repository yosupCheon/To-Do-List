const init = () => {
    document.querySelector('form').addEventListener('submit', addList);
};

const addList = (event) => {
    event.preventDefault();
    let item = document.querySelector('input');
    if (item.value !== ''){
        let list = document.querySelector('ul');
        let newItem = document.createElement('li');
        newItem.innerHTML = `<label>${item.value}</label>`;
        list.appendChild(newItem);
        item.value = '';
    };
};

init();