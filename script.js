const getRepoBtn = document.querySelector('.get-repo');
const getRepoBtnXml = document.querySelector('.get-repoXml');
const getInfoBtn = document.querySelector('.get-all-info');
const selectResults = document.getElementById('results');
const infoWrap = document.querySelector('.info-wrapper');
const topReposWrap = document.querySelector('.top-repo');
const recurseWrap = document.querySelector('.recursion-wrapper');
const recurseBtn = document.querySelector('.recursion-btn');
    
getRepoBtn.addEventListener('click', getRepos);
getRepoBtnXml.addEventListener('click', getReposXMl);
getInfoBtn.addEventListener('click', getAllInfo);
recurseBtn.addEventListener('click', getRecursion);

async function getRepos() {
   const url = 'https://api.github.com/users/DanikLebedev/repos';
   const response = await fetch(url);
   const results = await response.json();
   results.sort(function(a,b) {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
   });
   results.forEach(repos => {
      let repoDate = repos.created_at;
      const listItem = document.createElement('option');
      listItem.innerHTML = `${repos.name} <br> ${repoDate}`;
      selectResults.appendChild(listItem);
   });


}



function getReposXMl() {
   const url  = "https://api.github.com/users/DanikLebedev/repos";
   const xhr  = new XMLHttpRequest()
   xhr.open('GET', url, true)
   xhr.onload = function () {
      let repos = JSON.parse(xhr.response);
      if (xhr.readyState == 4 && xhr.status == "200") {
         const maxObject = repos.reduce((prev, current) => prev.stargazers_count > current.stargazers_count ? prev : current);
         const maxObjStars = parseInt(maxObject.stargazers_count);
        repos.forEach(item => {
           item.stargazers_count == maxObjStars ?  topReposWrap.innerHTML = `name :${item.name} <br> stars: ${item.stargazers_count}` : null;
        })

      } else {
         console.error(repos);
      }
   }
   xhr.send(null);
}

async function getAllInfo() {
   const url = 'https://api.github.com/users/DanikLebedev/repos';
   const response = await fetch(url);
   const results = await response.json();
   const maxObject = results.reduce((prev, current) => prev.stargazers_count > current.stargazers_count ? prev : current);
   const maxObjStars = parseInt(maxObject.stargazers_count);
   results.forEach(repos => {
      if (repos.stargazers_count == maxObjStars) {
         for (let key in repos) {
            const list = document.createElement('span');
            list.innerHTML = `${repos[key]} <br>`;
            infoWrap.appendChild(list);
         }
      } return null;
   })

}

function getRecursion() {
   setTimeout(function () {
      fetch('https://api.github.com/users/DanikLebedev/repos').then(function (response) {
         return response.json()
      }).then(function (data) {
         recurseWrap.textContent = data.length;

      }).catch(function (error) {
         console.log(error)
      })
   }, 2000)
   setTimeout(getRecursion)
}


function send() {
   fetch(url,)
}
