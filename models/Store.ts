import {observable, computed} from 'mobx';
import {TODO} from './TODO';

class Store {
  @observable TODOList: TODO[] = [];
}

export default new Store();
