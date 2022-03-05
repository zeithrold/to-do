import {observable,
  action, computed, autorun, makeAutoObservable} from 'mobx';
import {TODO, TODOData} from './TODO';
import colors from '../constants/colors';
import Color from './Color';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';


class Store {
  constructor() {
    makeAutoObservable(this);
  }
  count = 0;
  TODOList: TODO[] = [];
  recentEditedTODO: string = '';
  colors = colors;
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
    rawData.forEach((todo) => {
      this.TODOList.push(observable(new TODO({
        data: todo,
        newToDo: false,
      })));
    });
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
    console.log(targetID, targetIndex, this.TODOList[targetIndex].isCompleted);
    this.TODOList[targetIndex].isCompleted =
      !this.TODOList[targetIndex].isCompleted;
    console.log(targetID, targetIndex, this.TODOList[targetIndex].isCompleted);
    // this.update();
  }
  @action update() {
    this.count++;
  }
}


autorun(() => {
  console.log('changed');
});

const store = new Store();


const testList: TODO[] = [
  new TODO({data: {
    name: 'Spasmodic', tags: ['IN 15', 'AT 16'], id: uuidv4(),
    createdAt: new Date(),
    modifiedAt: new Date(),
    description: '',
    isCompleted: true,
  }, newToDo: false}),
  new TODO({data: {
    name: 'Reimei', tags: ['IN 15'], id: uuidv4(),
    createdAt: new Date(),
    modifiedAt: new Date(),
    description: '',
    isCompleted: false,
  }, newToDo: false}),
  new TODO({data: {
    name: 'XING', tags: ['IN 13'], id: uuidv4(),
    createdAt: new Date(),
    modifiedAt: new Date(),
    description: '',
    isCompleted: false,
  }, newToDo: false}),
];

store.setTODOList(testList);
store.shuffleTagsColors();
// store.generateTagsColors();

export default store;

