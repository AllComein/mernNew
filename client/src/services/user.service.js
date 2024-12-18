import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://183.182.84.228:4005/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getSubModeratorBoard() {
    return axios.get(API_URL + 'submod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getSubAdminBoard() {
    return axios.get(API_URL + 'subadmin', { headers: authHeader() });
  }
}

export default new UserService();
