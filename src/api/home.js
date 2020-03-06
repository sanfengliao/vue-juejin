import request from '../util/request'

export const query = () => {
  const data = {operationName: "",
  query: "",
  variables: {tags: [], category: "5562b419e4b00c57d9b94ae2", first: 20, after: "", order: "POPULAR"},
  extensions: {query: {id: "653b587c5c7c8a00ddf67fc66f989d42"}},
  query: {id: "653b587c5c7c8a00ddf67fc66f989d42"}}
  return request.post('https://web-api.juejin.im/query', data, {

  })
}