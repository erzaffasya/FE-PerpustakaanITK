import Auth from "../apis/Auth";

let users = JSON.parse(localStorage.getItem("users"));

export function configureFakeBackend() {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // authenticate
        if (url.endsWith("/users/authenticate") && opts.method === "POST") {
          // get parameters from post request
          let params = JSON.parse(opts.body);

          Auth.login(params)
            .then((response) => {
              console.log(response, "fakebacked");
              if (response.data.code == 200) {
                let user = response.data.data;
                let responseJson = {
                  nim: user.nim,
                  name: user.name,
                  email: user.email,
                  token: user.token,
                  role: user.role,
                };

                resolve({
                  ok: true,
                  text: () => Promise.resolve(JSON.stringify(responseJson)),
                });
              } else if (response.data.code == 401) {
                reject("These credentials do not match our records.");
              } else {
                // else return error
                reject("These credentials do not match our records.1");
              }
            })
            .catch(() => {
              reject("Tidak ada Koneksi");
            });

          return;
        }

        // get users
        if (url.endsWith("/users") && opts.method === "GET") {
          // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          if (users) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(users)),
            });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // get user by id
        if (url.match(/\/users\/\d+$/) && opts.method === "GET") {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            // find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            let matchedUsers = users.filter((user) => {
              return user.id === id;
            });
            let user = matchedUsers.length ? matchedUsers[0] : null;

            // respond 200 OK with user
            resolve({ ok: true, text: () => JSON.stringify(user) });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // register user
        if (url.endsWith("/users/register") && opts.method === "POST") {
          // get new user object from post body
          let newUser = JSON.parse(opts.body);
          // validation
          let duplicateUser = users.filter((user) => {
            return user.username === newUser.username;
          }).length;
          if (duplicateUser) {
            reject("Username '" + newUser.username + "' is already taken");
            return;
          }

          // save new user
          newUser.id = users.length
            ? Math.max(...users.map((user) => user.id)) + 1
            : 1;
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));

          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() });

          return;
        }

        // pass through any requests not handled above
        realFetch(url, opts).then((response) => resolve(response));
      }, 500);
    });
  };
}
