import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: '7b05f68c-6a0c-4e47-a2f9-0c10cdb6b8ce'
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
export const scopeRequestConfig = {
  scopes: ['user.read','mailboxsettings.read','calendars.readwrite']
};

export const getAccessToken = () => {
  msalInstance.acquireTokenSilent(request)
  .then(tokenResponse =>tokenResponse)
  .catch(async (error) => {
      if (error instanceof InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
          return msalInstance.acquireTokenPopup(request);
      }
  }).catch(error => {
      handleError(error);
  });
}
