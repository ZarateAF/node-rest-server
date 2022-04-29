const URL = 'http://localhost:9090/api/auth'
const myForm = document.querySelector('form');


myForm.addEventListener('submit', ev => {
  ev.preventDefault()

  let formData = {}
  for(let el of myForm){
    if(el.name.length > 0)
      formData[el.name] = el.value;
  }

  fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then(({ msg, entry }) => {
      localStorage.setItem("token", entry.token);
      window.location = 'chat.html';
    })
    .catch(err => {
      console.error(err)
    });
  console.log(formData)
})

function handleCredentialResponse(response) {
  fetch(`${URL}/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_token: response.credential,
    }),
  })
    .then((res) => res.json())
    .then(({ user, token }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("email", user.email);
      window.location = 'chat.html';
    });
}

const button = document.getElementById("sign-out");
button.onclick = () => {
  google.accounts.id.disableAutoSelect();

  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    console.log("done", done);
    localStorage.clear();
    location.reload();
  });
};
