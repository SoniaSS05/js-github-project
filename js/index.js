function obtain(val){
    const url = `https://api.github.com/search/users?q=${val}`;
    const listDoggo = fetch(url,{
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "accept": "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(json =>{
        console.log(json);
        showUsers(json);
    })
    return listDoggo;
}

function obtainRepos(dire){
    const url = dire;
    const listDoggo = fetch(url,{
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "accept": "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(json =>{
        console.log(json);
        showRepos(json);
    })
    return listDoggo;

}

function showUsers(listUsers){
    const longitem = (listUsers.items).length;
    eraseChild();
    for(i=0; i<longitem; i++){
        const usuLogin = listUsers.items[i].login;
        const usuAvat = listUsers.items[i].avatar_url;
        const usuHtmlU = listUsers.items[i].html_url;
        const list = document.querySelector('#user-list');
        const li = document.createElement('li');
        li.style.cursor = 'pointer';
        li.innerHTML = usuLogin + ' '+ usuAvat + ' '+ usuHtmlU;
        li.style.height = '30px';
        li.addEventListener('click',(e)=>{
            e.preventDefault();
            const infoUser= li.innerHTML;
            const urlHttp = infoUser.indexOf(' ');
            const urlLog = infoUser.substr(0,urlHttp);
            const urlDir = `https://api.github.com/users/${urlLog}/repos`;
            const answRepo = obtainRepos(urlDir);
        })
        list.appendChild(li);
    }
}

function showRepos(listRepos){
    eraseChildRepo();
    const longitem = listRepos.length;
    for(i=0; i<longitem; i++){
        const list = document.querySelector('#repos-list');
        const li = document.createElement('li');
        li.innerHTML = listRepos[i].name;
        list.appendChild(li);
    }
   
    
 
}


function eraseChild(){
    let element1 = document.getElementById("user-list");
    while (element1.firstChild) {
        element1.removeChild(element1.firstChild);
    }
    let erase=true;
    return erase;
}

function eraseChildRepo(){
    console.log('entre a borrarRepo');
    let element1 = document.getElementById("repos-list");
    while (element1.firstChild) {
        element1.removeChild(element1.firstChild);
    }
    let erase=true;
    return erase;
}

document.addEventListener('DOMContentLoaded', function() {
    senSubmit = document.getElementById('searchBut')
    senSubmit.addEventListener('click', (e)=> {
        e.preventDefault();
        eraseChildRepo();
        obtain(search.value);
    })
        

});
