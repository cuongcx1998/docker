import axios from 'axios';
import store from '@/store';
import Auth from '@/plugins/auth';
import router from '@/routes/loader';

const auth = new Auth();
let refreshed = false;

axios.interceptors.request.use( (config) => {
  // clear request error
  store.commit('errors/resetErrors', {});
  config.headers.common['Cache-Control'] = 'no-cache';
  config.headers.common['Pragma'] = 'no-cache';

  // add csrf token
  const csrf_token = document.head.querySelector('meta[name="csrf-token"]');
  if (csrf_token) {
    config.headers.common['X-CSRF-TOKEN'] = csrf_token.content;
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  } else {
    console.warn('CSRF token not found');
  }

  if(auth.getToken) {
    config.headers.Authorization = `Bearer ${auth.getToken}`;
  }
  return config;
},  (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if(!error.response) {
      return Promise.reject(error);
    }
    store.commit('errors/setErrors', error.response);
    const { status } = error.response;

    if(status === 400) {
      await store.dispatch('auth/setUser', null);
      auth.removeToken();
      return router.push({ name: 'Login' });
    }

    if(status === 412) {
      if(refreshed) {
        auth.removeToken();
        return router.push({ name: 'Login' });
      }

      refreshed = true;

      try {
        const token = await store.dispatch('auth/refreshToken');
        await auth.setToken(token.access_token);
        await store.dispatch('auth/getUser');

        const { href, origin } = location;
        const path = href.replace(origin, '');

        return router.push({ path: path, hash: '#' });
      } catch(e) {
        auth.removeToken();
        store.dispatch('auth/resetState');
        return router.push({ name: 'Login' });
      }
    }

    return Promise.reject(error);
  }
);
export default axios;


