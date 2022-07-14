/* for timer option has been taken out for save and load features
newItem.innerHTML = `
    <input type = "time">
    <label>${item} <i>completed:</i></label><input type="checkbox"><input id ="remove" type="submit" value="remove">
    `;
*/

const {ipcRenderer} = require('electron');
//let fs = require('fs');

const init = () => {
    
    document.querySelector('form').addEventListener('submit', addList);
    document.querySelector('ol').addEventListener('click', removeItemFromList);
    document.querySelector('ol').addEventListener('click', checkTest);
    //document.querySelector('ol').addEventListener('click', removeItemFromList);    
    
    // need to be in the function later
    // to complete
    // receive the data from the main
    // save the data for the checkbox
    // so the next time when the app opens
    // i could see what i have done
    // June 28 Tue
    // check box works with inline "onclick" without the security tag
    // resolve this to complete
    /*
    ipcRenderer.on("item-from-main", (event,data)=>{
        if (data){
            const item = "test";
            ipcRenderer.send("item-from-renderer", test);
        }
    })
    */ 
};

const loadList = () => {
    // this adds a saved list from the textfile to the app
    let fs = require('fs');
    fs.readFile('scheduler.txt', (err, data)=>{
        if (err) {return console.error(err);}
            let arr = data.toString().split("\n");
            for(i in arr) {
                if (arr[i] !== ''){
                    let item = arr[i];
                    let list = document.querySelector('ol');
                    let newItem = document.createElement('li');
                    if (1) {
                        
                        newItem.innerHTML = `
                        <label>${item} <i>completed:</i></label><input type="checkbox" id = "checker"><input id ="remove" type="submit" value="remove">
                        `;
                        //newItem.innerHTML = item;
                        console.log(item);
                    }
                    else {
                        newItem.innerHTML = `
                        <label>${item} <i>completed:</i></label><input type="checkbox" id = "checker"><input id ="remove" type="submit" value="remove">
                        `;
                    }
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
        let newItem = document.createElement('li');


        //newItem.innerHTML = `
        //<label>${item.value} <i>completed:</i></label><input type="checkbox" id = "checker" checked="false"><input id ="remove" type="submit" value="remove">
        //`;
        
        let test = `
        <label>${item.value} <i>completed:</i></label><input type="checkbox" id = "checker" checked="false"><input id ="remove" type="submit" value="remove">
        `;
     
        newItem.innerHTML = test;

        // pass to the main processor
        // save to file by node.js...?
        ipcRenderer.send("item-from-renderer", item.value);
        //ipcRenderer.send("item-from-renderer", test);
        list.appendChild(newItem);
        item.value = '';
    };
};


const removeItemFromList = (event) => {
    console.log(event);
    if (event.target.id == "remove"){
        let parent = document.querySelector('ol');
        let listItem = event.target.parentNode;
        
        //remove from the text file as well
        //  find the word to delete
        let temp = listItem.getElementsByTagName("label")[0].innerHTML.split(' ')[0];
        
        //temp = temp.substring(1)
        //temp = temp.split(" ")[0];
        //temp = temp.slice(0, temp.length - 1);
        console.log(temp);
        //  delete from the text file but...
        //  conner case: when list is ends with 2 space at the end
        let fs = require('fs')
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

/*
1. complete change attributes for each item
2. update the textfile base on the check list 
*/
const checkTest = (event) => {
    console.log(event);
    if (event.target.id == "checker"){
        //let listItem = event.traget.;
        //let temp = listItem.getElementsByTagName("input");//[0];//.innerHTML.split('><input')[0];
        
        console.log(event.target.id);

        if (event.target.checked == true){
            //document.getElementByAttri('checker').id = 'false';
            console.log("true!!!\n");
        }
        else {
            //document.getElementById("checker").setAttribute("checked", "true");
            console.log("false...\n");
        }
    }
};

init();
loadList();