const init = () => {
    document.querySelector('form').addEventListener('submit', addList);
    document.querySelector('ol').addEventListener('click', removeItemFromList);
};

const addList = (event) => {
    event.preventDefault();
    let item = document.querySelector('input');
    if (item.value !== ''){
        let list = document.querySelector('ol');
        let newItem = document.createElement('li');
        newItem.innerHTML = `<label>${item.value} <i>completed:</i></label><input type="checkbox"><input id ="remove" type="submit" value="remove">`;
        list.appendChild(newItem);
        item.value = '';
    };
};

const removeItemFromList = (event) => {
    if (event.target.id == "remove"){
        let parent = document.querySelector('ol');
        let listItem = event.target.parentNode; // li
        parent.removeChild(listItem);
        //event.target.remove();
    }
};

init();