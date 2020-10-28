import { createContext } from 'react';
import axios from 'axios';
import { Configuration, AuthApi } from './api';

// @ts-ignore
const env = window.env as any;

export const Context = createContext({
  loggedIn: true as boolean,
  accessToken: null as string | null,

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  },

  setAccessToken(accessToken: string | null) {
    this.accessToken = accessToken;
  },

  async verifyAccessToken() {
    const authApi = new AuthApi(this.getApiConfig());
    try {
      await authApi.verifyToken();
    } catch (error) {
      this.setLoggedIn(false);
      this.setAccessToken(null);
    }
  },

  getApi() {
    return axios.create({
      baseURL: String(env.API_URL),
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  },

  getApiConfig(): Configuration {
    return new Configuration({
      basePath: String(env.API_URL),
      accessToken: String(this.accessToken),
    });
  },

  save() {
    localStorage.setItem('AppContext', JSON.stringify(this));
  },

  load() {
    const ctx = JSON.parse(localStorage.getItem('AppContext') || '{}');
    if (ctx.loggedIn) this.setLoggedIn(ctx.loggedIn);
    if (ctx.accessToken) this.setAccessToken(ctx.accessToken);
  },
});
