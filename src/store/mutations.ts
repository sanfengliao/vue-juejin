import { MutationTree } from "vuex";
import { State } from ".";
import { SET_CATEGORY_LIST } from "./mutation-types";

const mutations: MutationTree<State> = {
  [SET_CATEGORY_LIST](state, categoryList) {
    state.categoryList = categoryList;
  }
}

export default mutations;