
export const enum RecommendCateType {
  FOLLOW,
  RECOMMEND,
  HOT,
  CATEGORY,
}
export interface RecommendCate {
  type: RecommendCateType,
  title: string,
  categoryId?: string,
}