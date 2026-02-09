class LocalStorage {
  get<T>(key: string): T | null {
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
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }

      return null;
    }
  }

  remove(key: string) {
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
