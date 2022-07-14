/* for timer option has been taken out for save and load features
newItem.innerHTML = `
    <input type = "time">
    <label>${item} <i>completed:</i></label><input type="checkbox"><input id ="remove" type="submit" value="remove">
    `;
*/

const {ipcRenderer} = require('electron');
let fs = require('fs');

const init = () => {
    
    document.querySelector('form').addEventListener('submit', addList);
    document.querySelector('ol').addEventListener('click', removeItemFromList);
    document.querySelector('ol').addEventListener('click', checkTest);
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
    }
};

const checkTest = (event) => {
    //event.preventDefault();
    if (event.target.id == "checker"){

        let str = event.target.parentNode.innerHTML.split('<li>')[0];          

        if (event.target.checked == true){      
            fs.readFile('scheduler.txt', 'utf8', (err, data) => {
                if (err) {return console.log(err);}
                let result = data.replace(str, str.replace("unchecked", 'checked'));
                fs.writeFile('scheduler.txt', result, (err) => {
                    if (err) {return console.log(err);}
                });
            });
            // this updates current checkbox but not saved on to the text file
            //event.target.parentNode.getElementsByTagName('input')[0].removeAttribute("unchecked");
            //event.target.parentNode.getElementsByTagName('input')[0].setAttribute("checked",""); 
        }
        else {
            fs.readFile('scheduler.txt', 'utf8', (err, data) => {
                if (err) {return console.log(err);}
                let result = data.replace(str, str.replace("checked","unchecked"));
                fs.writeFile('scheduler.txt', result, (err) => {
                    if (err) {return console.log(err);}
                });
            });
            //event.target.parentNode.getElementsByTagName('input')[0].removeAttribute("checked");
            //event.target.parentNode.getElementsByTagName('input')[0].setAttribute("unchecked",""); 
        } // else ends
    }// outer if ends
    str = '';
};

init();
loadList();