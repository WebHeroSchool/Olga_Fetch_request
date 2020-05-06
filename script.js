
const url = window.location.toString();
let getUserName = function(url){
	let urlPart = url.split('=');
  let userName = urlPart[1];
	if (userName  == undefined) {
        userName = 'OlgaVinogradova';
     }
     return userName;
}

let getDate = new Promise((resolve, reject) => {
  let date = new Date();
  setTimeout(() => date ? resolve(date) : reject ('Ошибка вычисления времени'), 3000)
})

let name = getUserName(url);
let getRequest = fetch('https://api.github.com/users/' + name)
    
Promise.all([getRequest, getDate])
    .then(([request, date]) => {
    requestInfo = request;
    requestDate = date;
  })

    .then(res => requestInfo.json())
    .then(json => {
      let getName = () => {
        let user_name = document.querySelector('.user_name');
          user_name.innerHTML = json.login;
        let link = document.querySelector('.link');
          link.href = json.html_url;
      }

      let getAvatar = () => {
        let avatar = document.querySelector('.avatar');
          avatar.src = json.avatar_url;
      }

      let getInfo = () => {
      let user_info = document.querySelector('.user_info');
        user_info.innerHTML = json.bio;
      }

      let addDate = () => {
      let time = document.getElementById('time');
        time.innerHTML = requestDate;
      }

      let preloader = document.getElementById('cube-loader');
        preloader.style.display = 'none';
        
      getName();
      getAvatar();
      getInfo();
      addDate();
    })
    
    .catch(err => document.body.innerHTML = 'Информация о пользователе не доступна');