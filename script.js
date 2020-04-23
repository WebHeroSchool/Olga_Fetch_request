
let getUserName = function(url){
	let userName = url.pathname;
	if (userName  == undefined) {
        userName = 'OlgaVinogradova';
     }
     return userName;
}
const url = window.location.toString();
let name = getUserName(url);

fetch('https://api.github.com/users/' + name)
    .then(response => {
      if (response.status != 200) {
          return null;
      } else {
          return response.json();
      }
    })

    .then(json => {
      let user_name = document.querySelector('.user_name');
        user_name.innerHTML = json.login;
      let link = document.querySelector('.link');
        link.href = json.html_url;

      let avatar = document.querySelector('.avatar');
        avatar.src = json.avatar_url;

      let user_info = document.querySelector('.user_info');
        user_info.innerHTML = json.bio;
    })

    .catch(err => document.body.innerHTML = 'Информация о пользователе не доступна');