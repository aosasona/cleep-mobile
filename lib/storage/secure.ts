import * as ExpoSecureStore from "expo-secure-store";

export default class SecureStore {
  static async get<T>(key: string): Promise<T | null> {
    const data = await ExpoSecureStore.getItemAsync(key);

    if (!data) return null;

    return data as T;
  }

  static async set(
    key: string,
    value: string | number | boolean
  ): Promise<void> {
    const valueAsString = `${value}`;
    await ExpoSecureStore.setItemAsync(key, valueAsString);
  }
}
