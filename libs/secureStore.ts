import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TODO, TODOData} from '../models/TODO';


async function setItem(key: string, value: string) {
  try {
    if (!Device.brand) {
      return await AsyncStorage.setItem(key, value);
    } else {
      return await SecureStore.setItemAsync(key, value);
    }
  } catch (e) {
    throw e;
  }
}

async function getItem(key: string) {
  try {
    if (!Device.brand) {
      return await AsyncStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch (e) {
    throw e;
  }
}

export async function setTODOList(TODOList: TODO[]) {
  const JSONRawData = JSON.stringify(TODOList);
  try {
    await setItem('TODODataJSON', JSONRawData);
  } catch (e) {
    throw e;
  }
}

export async function getTODOList() {
  let JSONRawData = await getItem('TODODataJSON');
  let parsedData: TODOData[] = [];
  if (!JSONRawData) {
    await setItem('TODODataJSON', '[]');
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
  const isFirstRunRawData = await getItem('isFirstRun');
  if ((!isFirstRunRawData) || isFirstRunRawData === 'true') {
    return true;
  } else {
    false;
  }
}

export async function setIsFirstRun(isFirstRun: boolean) {
  if (isFirstRun) {
    await setItem('isFirstRun', 'true');
  } else {
    await setItem('isFirstRun', 'false');
  }
}
