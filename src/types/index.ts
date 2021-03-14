
export const enum NavCategoryType {
  FOLLOW,
  RECOMMEND,
  HOT,
  CATEGORY,
}
export interface NavCategory {
  type: NavCategoryType;
  name: string;
  categoryId?: string;
  category?: Category;
  categoryHotTag?: CategoryHotTag[];
}


export interface Category {
  category_id: string;
  category_name: string;
  category_url: string;
  rank: number;
  show_type: number;
  ctime: number;
  mtime: number;
}

export interface CategoryHotTag {
  back_ground: string;
  color: string
  concern_user_count: number;
  ctime: number;
  icon: string;
  id: number;
  id_type: number;
  mtime: number;
  post_article_count: number;
  show_navi: number;
  tag_alias: string;
  tag_id: string;
  tag_name: string;
}

export const enum ErrCode {
  Success = 0;
}