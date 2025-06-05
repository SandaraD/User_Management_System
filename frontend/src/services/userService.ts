// import axios from "axios";

// const API_URL = "http://localhost:3000/users";

// export interface User {
//   id?: number;
//   firName: string;
//   lastName: string;
//   birthYear: number;
// }

// //GET all users
// export const findAll = () => {
//   return axios.get<User[]>(API_URL);
// };

// //GET user by ID
// export const findOne = (id: number) => {
//   return axios.get<User>(`${API_URL}/${id}`);
// };

// //POST
// export const create = (userData: Partial<User>) => {
//   return axios.post<User>(API_URL, userData);
// };

// //UPDATE
// export const update = (id: number, userData: Partial<User>) => {
//   return axios.put<User>(`${API_URL}/${id}`, userData);
// };

// //DELETE
// export const remove = (id: number) => {
//     return axios.delete<User>(`${API_URL}/${id}`);
// };