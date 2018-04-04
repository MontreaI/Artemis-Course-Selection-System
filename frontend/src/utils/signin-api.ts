import Config from './config';
class SignInApi {

    public getUserPassword(username: string, password: string, email: string): Promise<boolean> {
      global.console.log(username);
      return this.fetchUrl('/login/username/password');
    }

    public createAccount(username: string, password: string, email: string): Promise<boolean> {
      return this.fetchUrl('/login/username/password/email');
    }
    
    private fetchUrl(urlString: string) {
        return fetch(urlString)
        .then(response => {
          if (response.ok) {
            return true;
          } else {
            return false;
          }
        });
    }
}

export default SignInApi;
// if (u.username == req.params.username) {
//    this.context.router.history.push({
///        pathname: '/course-outline',
//        state: {
//            authenticated: true
//        }
//    });
// }
// else {
// this.context.router.history.push({
//    pathname: '/signin',
//    state: {
//        authenticated: false
//    }
// });