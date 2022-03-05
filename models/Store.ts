import {observable, action} from 'mobx';
import {TODO, TODOData} from './TODO';

class Store {
  @observable TODOList: TODO[] = [];
  @observable recentEditedTODO: string = '';
  @action setTODOList(rawText: string) {
    const convertedTODOList:TODOData[] = JSON.parse(rawText);
    convertedTODOList.forEach((todo) => {
      this.TODOList.push(new TODO({
        data: todo,
        newToDo: false,
      }));
    });
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
