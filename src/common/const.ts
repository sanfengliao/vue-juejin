import { NavCategory, NavCategoryType } from "../types";

export const defaultCateList: NavCategory[] = [
  {
    type: NavCategoryType.FOLLOW,
    name: '关注',
  },
  {
    type: NavCategoryType.RECOMMEND,
    name: '推荐',
  },
  {
    type: NavCategoryType.HOT,
    name: '热门'
  },
]