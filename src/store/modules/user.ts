import { defineStore } from 'pinia';
import { store } from '@/store';

interface UserState {
  token?: string | undefined;
  appVersion: string | undefined;
  platform: string | undefined;
}

export const useUserStore = defineStore({
  id: 'app_user',
  state: (): UserState => ({
    // token
    token: '1072ca08-05c2-49ee-a5ea-5f1b67eb16c4',
    appVersion: undefined,
    platform: undefined,
  }),
  getters: {
    getToken(): string | undefined {
      return this.token;
    },
    getAppVersion(): string | undefined {
      return this.appVersion;
    },
    getPlatform(): string | undefined {
      return this.platform;
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token;
    },
    setAppVersion(version: string | undefined) {
      this.appVersion = version;
    },
    setPlatform(platform: string | undefined) {
      this.platform = platform;
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
