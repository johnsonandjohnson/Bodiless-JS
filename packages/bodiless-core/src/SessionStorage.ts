/* eslint-disable no-console */
export const getFromSessionStorage = (key: string, defValue: any = null) => {
  let val = defValue;

  try {
    if (typeof window !== 'undefined') {
      val = JSON.parse(window.sessionStorage.getItem(key) || JSON.stringify(defValue));
    }
  } catch (e) {
    console.error('Can not read "${key}" from session storage.', e);
  }

  return val;
};

export const saveToSessionStorage = (key: string, val: any) => {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, JSON.stringify(val));
    }
  } catch (e) {
    console.error(`Can't write "${key}" to session storage.`, e);
  }
};
