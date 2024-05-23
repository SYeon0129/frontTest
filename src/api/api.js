import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
});


const prefix = `${API_SERVER_HOST}/api/camp`


export const getOne = async (tno) => {

  const response = await axios.get(`${prefix}/${tno}` )

  return response.data

}

// 리스트---
export const getList = async ( pageParam ) => {

  const {page,size} = pageParam

  const response = await axios.get(`${prefix}/list`, {params: {page:page,size:size }})
  
  return response.data

}

// 추가 --------------------------------
export const postAdd = async (todoObj) => {
  const response = await axios.post(`${prefix}/`, todoObj)

return response.data;
}

//---- 삭제
export const deleteOne = async (tno) => {

  const response = await axios.delete(`${prefix}/${tno}` )

  return response.data

}

//--수정
export const putOne = async (todo) => {

  const response = await axios.put(`${prefix}/${todo.tno}`, todo)

  return response.data
}
