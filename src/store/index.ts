import { NavCategory } from '@/types';
import { defaultCateList } from '@/common/const';
import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
export * from './mutation-types';
export * from './action-types';


export interface State {
  defaultCateList: NavCategory[],
  categoryList: NavCategory[],
}



const store = createStore<State>({
  strict: true,
  state: {
    defaultCateList,
    categoryList: [],
  },
  mutations,
  actions,
})
export default store;
