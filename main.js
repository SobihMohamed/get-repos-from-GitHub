// ?    Variables
let TheInp=document.querySelector("input");
let Button=document.querySelector(".but-GitRepo");
let Show_Data=document.querySelector(".Data-Show");


// ? on click
Button.onclick=function(){
    getRepos();
};

// ? function get repos
function getRepos() {
    if(TheInp.value==""){
        Show_Data.innerHTML="<span>Please Enter The Github Username. </span>";
    }
    else{
        Show_Data.innerHTML="";
        let LoadFetch=`https://api.github.com/users/${TheInp.value}/repos`;
        fetch(LoadFetch)
        .then((response)=>{
            // ? check if responsed
            if(!response.ok){
                Show_Data.innerHTML=`<span>User ${TheInp.value} Not Found. </span>`;              
                throw new Error(`User ${TheInp.value} Not Found`);
            }
            else{
                return response.json(); 
            }
        })
        .then((data)=>{
            // ? check if there are repos
            if(data.length==0){
                Show_Data.innerHTML=`<span>User ${TheInp.value} Has No Repos. </span>`;
            }
            else{
                // ? call function to show repos
                console.log("Done");
                console.log(data);
                
                ShowRepo(data,TheInp.value);
            }
        })
        .catch((erorr)=>{
            Show_Data.innerHTML=`<span> ${erorr.message} - Something Wrong. </span>`;
        })
    }
    
}


function ShowRepo(data,TheinpVal) {
    // ? loop on data
    let i=1;
    data.forEach(repo => {
        // ? create div
        let mainDev=document.createElement("div");
        // ? add class
        mainDev.classList.add("maindiv");
        // ?href
        let href=`https://github.com/${TheinpVal}/${repo.name}`
        // ? create text inside it
        mainDev.innerHTML=`
        <h3>${i}- Name: ${repo.name}</h3>
        <a href=${href} target="_blank">Visit The Repo.</a><br>
        <h5>Watches: ${repo.watchers_count}</h5>
        <h5>Stars: ${repo.stargazers_count}</h5>
        <h5>The ID: ${repo.id}</h5>
        `
        // ?append main dev
        Show_Data.appendChild(mainDev);
    i++;
});
}