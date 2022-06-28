/* for timer option has been taken out for save and load features
newItem.innerHTML = `
    <input type = "time">
    <label>${item} <i>completed:</i></label><input type="checkbox"><input id ="remove" type="submit" value="remove">
    `;
*/

const {ipcRenderer} = require('electron');
const init = () => {
    // this adds text to the app
    // for better readability
    // this needs to be function
    let fs = require('fs');
    fs.readFile('scheduler.txt', (err, data)=>{
        if (err) {
            console.error(err);
            return;
            }
            let arr = data.toString().split("\n");
            for(i in arr) {
                if (arr[i] !== ''){
                    let item = arr[i];
                    let list = document.querySelector('ol');
                    let newItem = document.createElement('li');
                    newItem.innerHTML = `
                    <label>${item} <i>completed:</i></label><input type="checkbox"><input id ="remove" type="submit" value="remove">
                    `;
                    list.appendChild(newItem);
                    item = '';
            }
        }
    });
    
    document.querySelector('form').addEventListener('submit', addList);
    document.querySelector('ol').addEventListener('click', removeItemFromList);
};

const addList = (event) => {
    event.preventDefault();
    let item = document.querySelector('input');
    if (item.value !== ''){
        let list = document.querySelector('ol');
        let newItem = document.createElement('li');
        newItem.innerHTML = `
        <label>${item.value} <i>completed:</i></label><input type="checkbox"><input id ="remove" type="submit" value="remove">
        `;
        ipcRenderer.send("item-from-renderer", item.value);
        list.appendChild(newItem);
        item.value = '';
    };
};

const removeItemFromList = (event) => {
    if (event.target.id == "remove"){
        let parent = document.querySelector('ol');
        let listItem = event.target.parentNode;
        parent.removeChild(listItem);
    }
};

init();
