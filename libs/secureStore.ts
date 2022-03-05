import * as SecureStore from 'expo-secure-store';
import {TODO, TODOData} from '../models/TODO';

export async function setTODOList(TODOList: TODO[]) {
  const JSONRawData = JSON.stringify(TODOList);
  try {
    await SecureStore.setItemAsync('TODODataJSON', JSONRawData);
  } catch (e) {
    throw e;
  }
}

export async function getTODOList() {
  let JSONRawData = await SecureStore.getItemAsync('TODODataJSON');
  let parsedData: TODOData[] = [];
  if (!JSONRawData) {
    SecureStore.setItemAsync('TODODataJSON', '[]');
    JSONRawData = '[]';
  }
  parsedData = JSON.parse(JSONRawData);
  const result: TODO[] = [];
  parsedData.forEach((item) => {
    result.push(new TODO({
      data: item,
    }));
  });
  return result;
}

export async function getIsFirstRun() {
  const isFirstRunRawData = await SecureStore.getItemAsync('isFirstRun');
  if ((!isFirstRunRawData) || isFirstRunRawData === 'true') {
    return true;
  } else {
    false;
  }
}

export async function setIsFirstRun(isFirstRun: boolean) {
  if (isFirstRun) {
    await SecureStore.setItemAsync('isFirstRun', 'true');
  } else {
    await SecureStore.setItemAsync('isFirstRun', 'false');
  }
}
