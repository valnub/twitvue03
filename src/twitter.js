import QueryString from './querystring';
import store from './store.js';
import util from './util.js'

var twitter = {};
var cb = new Codebird;
twitter.cb = cb;

// Change this to your values!! Get tokens at apps.twitter.com
cb.setConsumerKey("YOUR OAUTH TOKOEN", "YOUR TOKEN SECRET");

var oauth_token = QueryString.oauth_token;
var oauth_verifier = QueryString.oauth_verifier;
// localStorage.clear();

function saveTokens (oauth_token, oauth_token_secret) {
  localStorage.setItem('oauth_token', oauth_token);
  localStorage.setItem('oauth_token_secret', oauth_token_secret);
}

if (oauth_token && oauth_verifier) {
  cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

  cb.__call(
      "oauth_accessToken",
      {
          oauth_verifier: oauth_verifier
      },
      function (reply, rate, err) {
          if (err) {
              console.log("error response or timeout exceeded" + err.error);
              store.loggedIn = false;
              window.f7.loginScreen();
          }
          else if (reply) {
              cb.setToken(reply.oauth_token, reply.oauth_token_secret);
              saveTokens(reply.oauth_token, reply.oauth_token_secret);
              location.href = "/";
          }
      }
  );
}
else {
  if (!localStorage.getItem('oauth_token') || !localStorage.getItem('oauth_token_secret')){
    store.loggedIn = false;
    document.addEventListener('DOMContentLoaded', () => {window.f7.loginScreen();});
  }
  else {
    cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));
    cb.__call(
        "statuses_homeTimeline",
        {},
        function (reply, rate, err) {
            if (err && err.errors.length > 0) {
              store.loggedIn = false;
            }
            else {
              console.log(reply);
              store.loggedIn = true;
              store.tweets.length = 0;
              store.tweets.push(...reply);
            }
        }
    );
  }  
}

twitter.login = function () {
  cb.__call(
      "oauth_requestToken",
      {oauth_callback: "http://localhost:8080/"},
      function (reply,rate,err) {
          if (err) {
              console.log("error response or timeout exceeded" + err.error);
          }
          if (reply) {
              // stores it
              cb.setToken(reply.oauth_token, reply.oauth_token_secret);
              saveTokens(reply.oauth_token, reply.oauth_token_secret);

              // gets the authorize screen URL
              cb.__call(
                  "oauth_authorize",
                  {},
                  function (auth_url) {
                      // window.codebird_auth = window.open(auth_url);
                      location.href = auth_url;
                  }
              );
          }
      }
  );  
}

export default twitter;