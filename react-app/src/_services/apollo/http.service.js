import { HttpInterceptor } from './http-interceptor';
import * as axios from 'axios';
import { from } from 'rxjs';
import { NOTIFICATIONS } from '../../_constants/constants'

import { byPassCsUserId } from '../../_constants/url.constants';
export class HttpRequest {
  httpInterceptor = new HttpInterceptor();
  // user = isCustomer() ? localStorage.getItem('ccuser') : localStorage.getItem('user');
  // access_token = this.user ? JSON.parse(this.user).access_token : null;

  config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: this.access_token ? ("Bearer " + this.access_token) : ''
    }

  }

  get(url) {
    var request = axios.get(url, this.config).then(res => res).catch(error => {
      return this.handleError(error);
    });
    return from(request);
  }

  post(url, data) {
    var request = axios.post(url, data, this.config).then(res => res).catch(error => {
      return this.handleError(error);
    });
    return from(request);
  }

  put(url, data) {
    var request = axios.put(url, data, this.config).then(res => res).catch(error => {
      return this.handleError(error);
    });
    return from(request);
  }

  delete(url, data) {
    var request = axios.delete(url, data, this.config).then(res => res).catch(error => {
      return this.handleError(error);
    });
    return from(request);
  }

  handleError(error) {
    if (error.message === 'Network Error') { // Handle Network Error
      return {
        status: 'Network Error',
        data: {
          message: NOTIFICATIONS.CONNECTIVITY_ERROR
        }
      }
    } else { // Server Error

      if (error.response.status === 403) {
        
        return error.response;
      } else {
        return error.response;
      }
    }
  }
}