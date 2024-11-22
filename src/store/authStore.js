import create from "zustand";
import * as SecureStore from "expo-secure-store";

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  refreshToken: null,
  athlete: null,

  setTokens: async (accessToken, refreshToken, athlete) => {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    set({ accessToken, refreshToken, athlete });
  },

  clearTokens: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    set({ accessToken: null, refreshToken: null, athlete: null });
  },

  loadTokens: async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken });
    }
  },

  refreshAccessToken: async () => {
    // Implement Strava token refresh logic
  },
}));
