import { Category, CategoryHotTag, ErrCode, NavCategory, NavCategoryType } from "@/types";
import { ActionTree } from "vuex";
import { State } from ".";
import { getCategoryList } from '../api';
import { GET_CATEGORY_LIST } from "./action-types";
import { SET_CATEGORY_LIST } from "./mutation-types";

interface CategoryListRspData {
  err_no: ErrCode;
  data: {
    category_id: string;
    category: Category;
    hot_tags: CategoryHotTag[];

  }[];
  err_msg: string;
};

const actions: ActionTree<State, State> = {
  async [GET_CATEGORY_LIST]({ commit }) {
    const res = await getCategoryList<CategoryListRspData>();
    console.log(res);
    if (res.err_no === ErrCode.Success) {
      const { data } = res;
      const categoryList = data.map<NavCategory>(item => ({
        type: NavCategoryType.CATEGORY,
        name: item.category.category_name,
        categoryId: item.category_id,
        category: item.category,
        categoryHotTag: item.hot_tags
      }))
      commit(SET_CATEGORY_LIST, categoryList)
    }
  }
}

export default actions;

