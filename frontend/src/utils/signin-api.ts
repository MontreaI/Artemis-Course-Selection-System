import Config from './config';
class SignInApi {

    public getUserPassword(username: string, password: string): Promise<boolean> {
      global.console.log(username);
      return this.fetchUrl(`${Config.serviceURL}${username}/${password}`);
    }

    public createAccount(username: string, password: string, email: string): Promise<boolean> {
      return this.fetchGetUrl(`${Config.loginURL}${username}/${email}/${password}`);
    }
    
    public getUserEmailSent(username: string, email: string): Promise<boolean> {
      return this.fetchUrl(`${Config.loginURL}${username}/${email}`);
    }

    private fetchUrl(urlString: string) {
        return fetch(urlString)
        .then(response => {
          global.console.log(response);
          if (response.ok) {
            return true;
          } else {
            return false;
          }
        });
    }

    private fetchGetUrl(urlString: string) {
      return fetch(urlString, {method: 'POST', mode: 'cors', headers: new Headers({
        'Content-Type': 'text/plain'
      })})
      .then(response => {
        global.console.log(response);
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      });
  }
}

export default SignInApi;