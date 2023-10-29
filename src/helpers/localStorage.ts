export function saveDataToLocalStorage(data: any, NAME_STORAGE: string) {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(NAME_STORAGE, serializedState);
  } catch (Error) {
    // console.error("Set state error: ", Error);
  }
}

export function loadDataFromLocalStorage(
  NAME_STORAGE: string,
  defaultValue: any
): any {
  let restoredData = defaultValue;
  try {
    const data: string | null = localStorage.getItem(NAME_STORAGE);
    if (data) restoredData = JSON.parse(data);
  } catch {
    restoredData = defaultValue;
  }

  return restoredData;
}
