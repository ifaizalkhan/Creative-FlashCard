"use strict";

let creativeArray = [];
let colorSearchArray = []
let colorArray = [];

(async function yo() {
    await fetch("https://random-flat-colors.vercel.app/api/random?count=6")
        .then((blob) => blob.json())
        .then((data) => colorArray.push(...data.colors))
        .then(applyChanges);
}())
// yo();
console.log(colorArray);



function applyChanges() {
    let j = document.getElementsByClassName("color-bar");
    for (let i = 0; i <= 11; i++) {
        if (i < 6) {
            j[i].style.backgroundColor = colorArray[i];
            j[i].setAttribute("data-color", colorArray[i]);
        } else {
            j[i].style.backgroundColor = colorArray[i - 6];
            j[i].setAttribute("data-color", colorArray[i - 6]);
        }
    }
}




let finalBackground;
let preid;
let colorChoose;
let colorHighlight;

function showChanges(did) {                     //Color Click    
    colorChoose = document.getElementById(did);
    colorHighlight = colorChoose.parentNode;
    if (finalBackground === undefined) {
        colorHighlight.classList.add("special-class5")
        finalBackground = colorChoose.dataset.color;
        preid = did;
    }
    else if (did === preid) {
        finalBackground = undefined;
        document.getElementById(did).parentNode.classList.remove("special-class5")
    }
    else {

        document.getElementById(preid).parentNode.classList.remove("special-class5")
        colorHighlight.classList.add("special-class5")
        finalBackground = colorChoose.dataset.color;
        preid = did;
    }

    let si=document.getElementById("searchInput");
    if (did <= 6) {
        if (finalBackground !== undefined) {
            colorSearchArray = colorMatches(finalBackground, creativeArray);
            if(si.value !== null){
                handleOnChange(si.value);
                // addCreativeToDom(colorSearchArray);
            }
            else{
                addCreativeToDom(colorSearchArray);
            }
            // addCreativeToDom(colorSearchArray);
        }
        else {
            if(si.value !== null){
                handleOnChange(si.value);
                // addCreativeToDom(colorSearchArray);
            }
            else{
                addCreativeToDom(creativeArray);
            }
            //addCreativeToDom(creativeArray);
        }
    }
}




let i = 0;
let mc = document.querySelector(".main-container");
let msc = document.querySelector(".main-side-container");
let ab = document.querySelector("#add-button");
let bb = document.getElementById('bb');


function changeProgress() {                                                  //Add Creative button
    let si=document.getElementById("searchInput");                          
    mc.classList.toggle("special-class1");
    msc.classList.toggle("special-class2");
    ab.disabled = true;
    bb.classList.toggle("special-class4");
    si.disabled=true;
    if (colorHighlight !== undefined) {
        colorHighlight.classList.remove("special-class5")
    }
    finalBackground = undefined;
    si.value="";
    addCreativeToDom(creativeArray);
}




let titleDiv = document.getElementById("title");
let subTitleDiv = document.getElementById("sub-title");

const validate = () => {                                         //Form Check
    let titleCon = titleDiv.value;
    let subTitleCon = subTitleDiv.value;
    if (finalBackground !== undefined && titleCon !== "" && subTitleCon !== "") {
        check(titleCon, subTitleCon);
    }
    else {
        alert("All fields are compulsory")
    }
}




let result = document.getElementById("results");

const check = (titleCon, subTitleCon) => {                          //Form Submit
    let progress = document.querySelectorAll(".progress-child");
    let counter = document.querySelector("#counter");
    if (i < 5) {
        progress[i++].style.backgroundColor = "black";
        counter.innerHTML = parseInt(counter.innerHTML) + 1;
        if (i === 5) {
            ab.disabled = true;
        }
    }

    let bob = document.createElement('div');
    bob.className = "list-card";
    let html = `
      <h2 data-color="${finalBackground}" class="card-title">${titleCon}</h2>
        <h4 class="card-subtitle">${subTitleCon}</h4>
    `;

    let obj1 = {
        title: titleCon,
        subtitle: subTitleCon,
        htmls: html,
        bgc: finalBackground
    }

    creativeArray.push(obj1);
    bob.innerHTML = html;
    bob.style.backgroundColor = finalBackground;
    result.appendChild(bob);
    justCloseIt();
}

function justCloseIt() {                                                         //handleclose
    let si=document.getElementById("searchInput");                                   
    msc.classList.add("special-class3");
    msc.classList.toggle("special-class2");
    setTimeout(() => {
        mc.classList.toggle("special-class1");
        msc.classList.remove('special-class3')
    }, 50);
    titleDiv.value = "";
    subTitleDiv.value = "";
    if (colorHighlight !== undefined) {
        // colorHighlight.style.border = "none";
        colorHighlight.classList.remove("special-class5")
    }
    finalBackground = undefined;
    if (i === 5) {
        ab.disabled = true;
    }
    else {
        ab.disabled = false;
    }

    bb.classList.toggle("special-class4");
    si.disabled=false;
}



let searchArray;

async function handleOnChange(evt) {
    let filterValue;
    if(evt instanceof Object){
        filterValue = evt.target.value;
        console.log("inside");
    }
    else{
        filterValue=evt;
    }

    if (finalBackground !== undefined) {
        searchArray = findMatches(filterValue, colorSearchArray);
    }
    else {
        searchArray = findMatches(filterValue, creativeArray);
    }


    if(creativeArray.length===0 && searchArray.length===0){
        q.innerHTML = "Try Adding Some Creatives!!";
    }


    else if (filterValue === "") {
        if (finalBackground !== undefined) {
            addCreativeToDom(colorSearchArray);
            if(colorSearchArray.length === 0){
                q.innerHTML = "No Results Found!!";
            }
        }
        else {
            addCreativeToDom(creativeArray);
            if(creativeArray.length === 0){
                q.innerHTML = "No Results Found!!";
            }
        }
    }

    else {
        addCreativeToDom(searchArray);
        if(searchArray.length === 0){
            q.innerHTML = "No Results Found!!";
        }
    }
    //q.innerHTML = "";
}


function findMatches(wordToMatch, ca) {
    return ca.filter((pro) => {
        const regex = new RegExp(wordToMatch, 'gi')
        return (pro["title"].match(regex) || pro["subtitle"].match(regex));
    })
}

function colorMatches(colorToMatch, ca) {
    return ca.filter((pro) => {
        return (pro["bgc"].match(colorToMatch));
    })
}
let q = document.getElementById("results");
function addCreativeToDom(arr) {
    
    q.innerHTML = "";
    for (let s = 0; s < arr.length; s++) {
        let bob = document.createElement('div');
        bob.className = "list-card";
        bob.innerHTML = arr[s].htmls;
        bob.style.backgroundColor = arr[s].bgc;
        q.appendChild(bob);
    }
}

