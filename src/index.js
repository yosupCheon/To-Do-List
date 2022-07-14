
const {ipcRenderer} = require('electron');
let fs = require('fs');
let str;

const init = () => {
    document.querySelector('form').addEventListener('submit', addList);
    document.querySelector('ol').addEventListener('click', removeItemFromList);
};


const loadList = () => {
    // this adds a saved list from the textfile to the app
    fs.readFile('scheduler.txt', (err, data)=>{
        if (err) {return console.error(err);}
            let arr = data.toString().split("\n");
            for(i in arr) {
                if (arr[i] !== ''){
                    let item = arr[i];
                    let list = document.querySelector('ol');
                    let newItem = document.createElement('li');
                    newItem.innerHTML = item;
                    list.appendChild(newItem);
                    item = '';
            }
        } // for loop ends
    });
};

const addList = (event) => {
    event.preventDefault();
    let item = document.querySelector('input');
    if (item.value !== ''){
        let list = document.querySelector('ol');
        let newListItem = document.createElement('li');
        
        let newItem = `<label>${item.value} <i>completed:</i></label>\
        <input type="checkbox" id="checker" unchecked="">\
        <input id="remove" type="submit" value="remove">
        `;
        
        // update html as <li> in <ol>
        newListItem.innerHTML = newItem;

        // pass to the main processor
        // save to file by node.js...?
        //ipcRenderer.send("item-from-renderer", item.value);
        ipcRenderer.send("item-from-renderer", newItem);
        list.appendChild(newListItem);
        
        //newListItem.className = "hi";

        item.value = '';
    };
};

const removeItemFromList = (event) => {
    //event.preventDefault();
    if (event.target.id == "remove"){
        let parent = document.querySelector('ol');
        let listItem = event.target.parentNode;
        let temp = listItem.innerHTML.split('<li>')[0];

        fs.readFile('scheduler.txt', 'utf8', (err, data) => {
            if (err) {return console.log(err);}
            let result = data.replace(temp, '');
            fs.writeFile('scheduler.txt', result, (err) => {
                if (err) {return console.log(err);}
            });
        });

        parent.removeChild(listItem);
    }//if ends
    else {
        checkBoxSwitch(event);      
    }

};

function checkBoxSwitch(event) {
    //event.preventDefault();
    if (event.target.id == "checker"){
        str = event.target.parentNode.innerHTML.split('<li>')[0];
        if (event.target.checked == true){      
            checkBoxSwitchHelper("unchecked", 'checked');
        }
        else {
            checkBoxSwitchHelper("checked","unchecked");
        } 
    }
};

function checkBoxSwitchHelper(fromTxt, toTxt) {        
    fs.readFile('scheduler.txt', 'utf8', (err, data) => {
        if (err) {return console.log(err);}
        let result = data.replace(str, str.replace(fromTxt, toTxt));
        fs.writeFile('scheduler.txt', result, (err) => {
            if (err) {return console.log(err);}
        });
    });

    event.target.parentNode.getElementsByTagName('input')[0].removeAttribute(fromTxt);
    event.target.parentNode.getElementsByTagName('input')[0].setAttribute(toTxt,""); 
};

init();
loadList();
