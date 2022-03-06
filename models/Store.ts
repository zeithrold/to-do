import {observable,
  action, computed, makeAutoObservable} from 'mobx';
import {TODO, TODOData} from './TODO';
import colors from '../constants/colors';
import Color from './Color';


class Store {
  constructor() {
    makeAutoObservable(this);
  }
  count = 0;
  TODOList: TODO[] = [];
  recentEditedTODO: string = '';
  colors = colors;
  searchTag = '';
  isEditTODO = false;
  @action toggleEditTODO() {
    this.isEditTODO = !this.isEditTODO;
  }
  @action setSearchTag(tag: string) {
    this.searchTag = tag;
  }
  @action setTODOListFromJSON(rawText: string) {
    const convertedTODOList:TODOData[] = JSON.parse(rawText);
    convertedTODOList.forEach((todo) => {
      this.TODOList.push(observable(new TODO({
        data: todo,
        newToDo: false,
      })));
    });
  }
  @action setTODOList(rawData: TODOData[]) {
    this.TODOList = observable([]);
    rawData.forEach((todo) => {
      this.TODOList.push(observable(new TODO({
        data: todo,
        newToDo: false,
      })));
    });
  }
  @action setTODO(targetID: string, todo: TODOData) {
    const index = this.TODOList.findIndex((_todo) => _todo.id === targetID);
    if (index == -1) return;
    this.TODOList[index] = observable(new TODO({
      data: todo,
      newToDo: false,
    }));
  }
  @computed get notCompletedTODOList() {
    const result = this.TODOList.filter((todo) => !todo.isCompleted);
    return result;
  }
  @computed get completedTODOList() {
    const result = this.TODOList.filter((todo) => todo.isCompleted);
    return result;
  }
  @computed get tags() {
    const result: {[key: string]: boolean} = {};
    this.TODOList.forEach((todo) => {
      const tags = todo.tags;
      tags.forEach((tag) => {
        result[tag] = true;
      });
    });
    return Object.keys(result);
  }
  @computed get tagsColors() {
    const result: {[key: string]: Color} = {};
    this.tags.forEach((tag, index) => {
      result[tag] = this.colors[index % this.colors.length];
    });
    return result;
  }
  @action shuffleTagsColors() {
    for (let i = 0; i < this.colors.length; i++) { // Shuffle
      const rand = Math.floor((Math.random() * this.colors.length));
      const tempColorElement = this.colors[rand];
      this.colors[rand] = this.colors[i];
      this.colors[i] = tempColorElement;
    }
  }
  @action createTODO() {
    const tempTODO = new TODO();
    const tempID = tempTODO.id;
    this.TODOList.push(observable(tempTODO));
    this.recentEditedTODO = tempID;
  }
  @action createTODOFromRawData(todo: TODOData) {
    this.TODOList.push(observable(new TODO({data: todo, newToDo: true})));
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
  @action setRecentModifiedTODO(targetID: string) {
    this.recentEditedTODO = targetID;
  }
  @action reverseCheckedTODO(targetID: string) {
    const targetIndex = this.TODOList.findIndex((todo) => {
      return todo.id === targetID;
    });
    this.TODOList[targetIndex].isCompleted =
      !this.TODOList[targetIndex].isCompleted;
    // this.update();
  }
  @action update() {
    this.count++;
  }
}

const store = new Store();

store.shuffleTagsColors();

export default store;

