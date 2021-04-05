import { instance } from '../api.config.creator';

export const getUsers = async () => {
  const response = await instance.get('contact/');
  return response.data;
};

export const getUserById = async (id=null) => {
  const response = await instance.get(`contact/${id}`);
  return response.data;
};

export const addUser = async (first_name, last_name, birth_date, biography, gender, job, is_active) => {
  const response = await instance.post(`contact/`, {
    first_name, last_name, birth_date, biography, gender, job, is_active
  });
  return response.data;
};

export const updateUser = async (id, first_name, last_name, birth_date, biography, gender, job, is_active) => {
  const response = await instance.put(`contact/${id}`, {
    first_name, last_name, birth_date, biography, gender, job, is_active
  });
  return response.data;
};

export const deleteUser = async (id=null) => {
  const response = await instance.delete(`contact/${id}`);
  return response.data;
};