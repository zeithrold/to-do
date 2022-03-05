import {observable, action, computed} from 'mobx';
import {TODO, TODOData} from './TODO';

class Store {
  @observable TODOList: TODO[] = [];
  @observable recentEditedTODO: string = '';
  // MobX library requires all states SHOULD NOT contain
  // any functions that may modify its original data.
  @action setTODOListFromJSON(rawText: string) {
    const convertedTODOList:TODOData[] = JSON.parse(rawText);
    convertedTODOList.forEach((todo) => {
      this.TODOList.push(new TODO({
        data: todo,
        newToDo: false,
      }));
    });
  }
  @action setTODOList(rawData: TODOData[]) {
    rawData.forEach((todo) => {
      this.TODOList.push(new TODO({
        data: todo,
        newToDo: false,
      }));
    });
  }
  @computed notCompletedTODOList() {
    const result = this.TODOList.filter((todo) => !todo.isCompleted);
    return result;
  }
  @computed completedTODOList() {
    const result = this.TODOList.filter((todo) => todo.isCompleted);
    return result;
  }
  @action createTODO() {
    const tempTODO = new TODO();
    const tempID = tempTODO.id;
    this.TODOList.push(tempTODO);
    this.recentEditedTODO = tempID;
  }
  @action deleteTODO(targetID: string) {
    const targetIndex = this.TODOList.findIndex((todo) => {
      return todo.id === targetID;
    });
    if (targetIndex == -1) {
      return;
    }
    // Array.prototype.splice() MODIFYs original array.
    this.TODOList.splice(targetIndex, 1);
  }
}

export default new Store();
