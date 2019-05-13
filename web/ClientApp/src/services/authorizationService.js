import * as Msal from 'msal';

export default class AuthorizationService {
    constructor() {
        let redirectUri = window.location.origin;
        
        this.applicationConfig = {
            clientID: 'd5e697ee-7ecc-42d6-aa83-a9db47547560',//'b6c1a387-001b-4fda-9167-98beb7a01627',
            graphScopes: ['d5e697ee-7ecc-42d6-aa83-a9db47547560'] //,,'user.read' 'b6c1a387-001b-4fda-9167-98beb7a01627'
        };
        this.app = new Msal.UserAgentApplication(
            this.applicationConfig.clientID,
            'https://login.microsoftonline.com/maersk.onmicrosoft.com/',
            () => {
                // callback for login redirect
            },
            {
                redirectUri
            }
        );
    }

    isAdminAccount = () => {
        let user = this.app.getUser();
        const admRegEx = new RegExp("^ADM[A-Za-z0-9]{6}\\@CRB\\.APMOLLER\\.NET$", "i");

        return user ? admRegEx.test(user.idToken.preferred_username) : false;
    };

    getUser = () => {
        return this.app.getUser();
    };
    logOut = () => {
        this.app.logout();
    };
    login = () => {
        return this.app.loginPopup(this.applicationConfig.graphScopes).then(
            idToken => {
                const user = this.app.getUser();
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
            () => {
                return null;
            }
        );
    };
    logout = () => {
        this.app.logout();
    };
    getToken = () => {
        return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
            accessToken => {
                return accessToken;
            },
            error => {
                return this.app
                    .acquireTokenPopup(this.applicationConfig.graphScopes)
                    .then(
                        accessToken => {
                            return accessToken;
                        },
                        err => {
                            console.error(err);
                        }
                    );
            }
        );
    };
}