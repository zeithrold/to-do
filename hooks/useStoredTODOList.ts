import {useEffect, useState} from 'react';
import {getTODOList} from '../libs/secureStore';
import store from '../models/Store';

export default function useStoredTODOList() {
  const [isTODOListLoaded, setTODOListLoaded] = useState(false);
  useEffect(() => {
    async function loadStoredTODOList() {
      const rawData = await getTODOList();
      store.setTODOList(rawData);
      setTODOListLoaded(true);
    }
    loadStoredTODOList();
  }, []);
  return isTODOListLoaded;
}
