import request from '../util/request'
/**
 * 
 * @param {{operationName: string, query: string, variables: {tag?: Array<string>,category: string, after: string, order: string}, extensions: {query: {id: string}}}} data 
 */
export const query = (data) => {
  return request.post('https://web-api.juejin.im/query', data, {

  })
}