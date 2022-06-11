const init = () => {
    document.querySelector('form').addEventListener('submit', addList);
    document.querySelector('ul').addEventListener('click', removeItemFromList);
};

const addList = (event) => {
    event.preventDefault();
    let item = document.querySelector('input');
    if (item.value !== ''){
        let list = document.querySelector('ul');
        let newItem = document.createElement('li');
        newItem.innerHTML = `<label>${item.value}</label> <input type="button" value = "remove"/>`;
        list.appendChild(newItem);
        item.value = '';
    };
};

// remove button works
// problems
// 1. adding list is limited to two (addList or html)
// 2. button name "remove" overwrites on the listed item (addList.innterHTML)
const removeItemFromList = () => {
    let parent = document.querySelector('ul');
    let child = document.querySelector('li');
    let remove = parent.removeChild(child);
};

init();