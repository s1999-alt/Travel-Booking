import axios from 'axios'
import {BASE_URL} from '../base_url/api'


export const AdminAxios = axios.create({
  baseURL: BASE_URL,
  headers:{
    Accept: 'application/json',
  }
})


export const UserAxios = axios.create({
  baseURL: BASE_URL,
  headers:{
    Accept: 'application/json',
  }
})