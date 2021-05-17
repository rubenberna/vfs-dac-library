import { PublicClientApplication } from '@azure/msal-browser';
import axios from 'axios'
import qs from 'qs'

const APP_ID = '9ee43215-5d48-4863-bcea-4aab5f29ae1c';
// const APP_SECRET = '4~-CTG4U45~liI_X-~T_pb08q.fq~8N4XH';
const TOKEN_ENDPOINT ='https://login.microsoftonline.com/f25493ae-1c98-41d7-8a33-0be75f5fe603';
const MS_GRAPH_SCOPE = 'user.read';

const MSAL_CONFIG = {
  auth: {
    clientId: APP_ID,
    authority: TOKEN_ENDPOINT,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin
  },
};

// const postData = {
//   client_id: APP_ID,
//   scope: MS_GRAPH_SCOPE,
//   client_secret: APP_SECRET,
//   grant_type: 'client_credentials'
// };

// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded';


  // const RESTWay = async () => {
  //   return axios
  //     .post(`${TOKEN_ENDPOINT}/oauth2/v2.0/token`, qs.stringify(postData))
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  //
  // const authorize = () => {
  //   return axios.get('https://login.microsoftonline.com/f25493ae-1c98-41d7-8a33-0be75f5fe603/oauth2/v2.0/authorize?client_id=f40da78a-2612-43f8-a2db-a3d433df0328&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=openid')
  // }

export const azureProvider = new PublicClientApplication(MSAL_CONFIG);
export const scopeRequestConfig = {
  scopes: ['user.read']
};

export const getAccessToken = async () => {
  const allAccounts = azureProvider.getAllAccounts();
  try {
    if (allAccounts && allAccounts.length <= 0) throw new Error('login_required');
    const silentResult = await azureProvider.acquireTokenSilent({
      scopeRequestConfig,
      account: allAccounts[0]
    });

    return {
      token: silentResult.accessToken,
      idToken: silentResult.idToken,
      account: allAccounts[0]
    }
  } catch (err) {
    if (isInteractionNeeded(err)) {
      const interactiveResult = await azureProvider.loginPopup(scopeRequestConfig);
      const allAccounts = azureProvider.getAllAccounts();

      return {
        token: interactiveResult.accessToken,
        idToken: interactiveResult.idToken,
        account: allAccounts[0]
      }
    } else {
      throw err;
    }
  }
}

export const isInteractionNeeded = (error) => {
  if (!error.message || error.message.length <= 0) {
    return false;
  }

  return (
    error.message.indexOf('consent_required') > -1 ||
    error.message.indexOf('interaction_required') > -1 ||
    error.message.indexOf('login_required') > -1 ||
    error.message.indexOf('no_account_in_silent_request') > -1
  );
};

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const getRolesFromParsedJwt = (parsedJWT) => {
  if (parsedJWT?.roles instanceof Array) {
    return parsedJWT?.roles[0]?.toUpperCase();
  } else{
    return parsedJWT?.roles?.toUpperCase();
  }
}
