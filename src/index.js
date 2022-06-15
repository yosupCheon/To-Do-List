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
        //newItem.innerHTML = `<input type="button" value = "remove"/><label>${item.value}</label>`;
        //newItem.innerHTML = `<label>${item.value}</label>`;
        newItem.innerHTML = `<label>${item.value}</label><input type="checkbox"><input id ="remove" type="submit" value="remove">`;
        list.appendChild(newItem);
        item.value = '';
    };
};

// remove button works
// problems
// 1. remove button always deletes the first list not the targeted one
const removeItemFromList = (event) => {
    //console.log("test\n");
    if (event.target.id == "remove"){
        console.log(`${event}`);
        //let parent = document.querySelector('ol');
        //let child = document.querySelector('li');
        //parent.removeChild(child);
        document.querySelector('ol').removeChild(document.querySelector('li'));
    }
};

init();