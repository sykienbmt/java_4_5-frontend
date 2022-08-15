import axios from 'axios';
import { backendUrl } from 'src/constraint';
import { authAxios } from './Auth';

class CategoryController {
  async list() {
    return authAxios.get(backendUrl + 'category').then((res) => {
      return res.data;
    });
  }

  async create(category) {
    return authAxios.post(backendUrl + 'category', category).then((res) => {
      return res.data;
    }).catch(function (error) {
        if (error.response) {
          return error.response.status;
        }
      });
  }

  async edit(category) {
    return authAxios
      .put(backendUrl + 'category', category)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          return error.response.status;
        }
      });
  }

  async delete(id) {
    return authAxios.delete(backendUrl + `category/${id}`).then((res) => {
      return res.data;
    }).catch(function (error) {
        if (error.response) {
          return error.response.status
        }
      });
  }

  async searchByName(nameSearch) {
    console.log(nameSearch);
    return authAxios.post(backendUrl + `category/search`, nameSearch).then((res) => {
      console.log(res.data);
      return res.data;
    });
  }
}

export const categoryController = new CategoryController();
