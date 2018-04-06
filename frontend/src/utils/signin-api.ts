import Config from './config';
class SignInApi {

    public getUserPassword(username: string, password: string): Promise<boolean> {
      global.console.log(username);
      return this.fetchUrl(`${Config.serviceURL}${username}/${password}`);
    }

    public createAccount(username: string, password: string, email: string): Promise<boolean> {
      return this.fetchUrl(`${Config.loginURL}${username}/${password}/${email}`);
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
}

export default SignInApi;