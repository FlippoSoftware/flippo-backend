import * as jose from "jose";

window.onload = () => {
  google.accounts.id.initialize({
    client_id: "56332811871-78hk7pi2gn9fi4aqlhtoidhtr464oagu.apps.googleusercontent.com",
    callback: (response) => {
      console.log(response.credential);
      const credential = jose.decodeJwt(response.credential);
      console.log(credential);
    }
  });
  const button = document.getElementById("google");
  if (button) {
    google.accounts.id.renderButton(button, {
      type: "icon",
      theme: "outline",
      size: "large"
    });
  }
};

const client = google.accounts.oauth2.initCodeClient({
  client_id: "56332811871-78hk7pi2gn9fi4aqlhtoidhtr464oagu.apps.googleusercontent.com",
  ux_mode: "redirect",
  scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/email",
  redirect_uri: "http://localhost:3000/api/auth/callback"
});

export { client };

const loginGoogle = async () => {
  await fetch("");
};
