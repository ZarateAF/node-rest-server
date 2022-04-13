function handleCredentialResponse(response) {
  fetch("http://localhost:9090/api/auth/google", {
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
      console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("email", user.email);
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
