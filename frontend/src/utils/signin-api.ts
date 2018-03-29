import Config from './config';

class SignInApi {

    public getUserPassword(username: string, password: string, email: string) {
        return this.fetchUrl('/');
    }

    private fetchUrl(urlString: string) {
        return fetch(urlString);
    }
}

export default SignInApi;