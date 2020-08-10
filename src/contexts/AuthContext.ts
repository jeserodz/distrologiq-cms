import React from 'react';

interface Auth {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

const STORAGE_KEY = 'distrologiq.accessToken';

export const AuthContext = React.createContext<Auth>({
  accessToken: localStorage.getItem(STORAGE_KEY) || null,
  setAccessToken(accessToken) {
    if (accessToken) {
      localStorage.setItem(STORAGE_KEY, accessToken);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    this.accessToken = accessToken;
  },
});
