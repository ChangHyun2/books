function isBrowser(): boolean {
  return typeof window !== "undefined";
}

class LocalStorage {
  get<T>(key: string): T | null {
    if (!isBrowser()) return null;
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }

      return null;
    }
  }

  set<T>(key: string, value: T) {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  }

  remove(key: string) {
    if (!isBrowser()) return;
    localStorage.removeItem(key);
  }
}

class LocalStorageSingleton {
  private static instance: LocalStorage;
  private constructor() {}
  public static getInstance(): LocalStorage {
    if (!LocalStorageSingleton.instance) {
      LocalStorageSingleton.instance = new LocalStorage();
    }
    return LocalStorageSingleton.instance;
  }
}

const myLocalStorage = LocalStorageSingleton.getInstance();

export default myLocalStorage;
