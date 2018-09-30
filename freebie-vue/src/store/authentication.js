import router from '../router';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    registrationEmail: null,
    registrationPassword: null,
    registrationUsername: null,
    registrationCompany: null,
    registrationError: null,
    registrationLocation: null,
    loginEmail: null,
    loginPassword: null,
    token: null,
    userType: null,
    uuid: null,
  },
  actions: {
    register({ commit, state }) {
      return HTTP().post('http://localhost:3333/auth/user/register', {
        email: state.registrationEmail,
        username: state.registrationUsername,
        password: state.registrationPassword,
      }).then((info) => {
        if (info.data.success) {
          HTTP().post('http://localhost:3333/auth/user/login', {
            email: state.registrationEmail,
            password: state.registrationPassword,
          }).then(({ data }) => {
            console.log(data);
            commit('setToken', data.token);
            commit('setUser', 'user');
            router.push('/');
          });
        } else {
          commit('setRegistrationError', info.data.errors);
        }
      });
    },
    registerCompany({ commit, state }) {
      return HTTP().post('http://localhost:3333/auth/company/register', {
        email: state.registrationEmail,
        username: state.registrationUsername,
        password: state.registrationPassword,
        location: state.registrationLocation,
      }).then((info) => {
        if (info.data.success) {
          HTTP().post('http://localhost:3333/auth/company/login', {
            email: state.registrationEmail,
            password: state.registrationPassword,
          }).then(({ data }) => {
            console.log(data);
            commit('setToken', data.token);
            commit('setUser', 'company');
            router.push('/');
          });
        } else {
          commit('setRegistrationError', info.data.errors);
        }
      });
    },
    login({ commit, state }) {
      console.log(state);
      console.log("Called")
      return HTTP().post('http://localhost:3333/auth/user/login', {
        email: state.loginEmail,
        password: state.loginPassword,
      }).then((info) => {
        console.log(info)
        commit('setToken', info.data.token);
        commit('setUser', 'user');
        if(!info.data.message){
          router.push('/');
        }
      });
    },
    loginCompany({ commit, state }) {
      console.log(state);
      console.log("Called")
      return HTTP().post('http://localhost:3333/auth/company/login', {
        email: state.loginEmail,
        password: state.loginPassword,
      }).then((info) => {
        console.log(info)
        commit('setToken', info.data.token);
        commit('setUser', 'company');
        if(!info.data.message){
          router.push('/');
        }
      });
    },
    logout({ commit }) {
      console.log("Logged out...")
      commit('setToken', null);
      router.push('/');
    },
  },
  getters: {
    auth(state) {
      return !!state.token;
    },
    userType(state) {
      return state.userType;
    },
    getEmail(state) {
      if(state.loginEmail != null){
        return state.loginEmail;
      } else {
        return state.registrationEmail;
      }
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, payload) {
      state.userType = payload;
    },
    setRegistrationError(state, error) {
      state.registrationError = error;
    },
    setRegistrationEmail(state, email) {
      state.registrationEmail = email;
    },
    setRegistrationCompany(state, company) {
      state.registrationCompany = company;
    },
    setRegistrationLocation(state, location) {
      state.registrationLocation = location;
    },
    setRegistrationPassword(state, password) {
      state.registrationPassword = password;
    },
    setRegistrationUsername(state, username) {
      state.registrationUsername = username;
    },

    setLoginEmail(state, email) {
      state.loginEmail = email;
    },

    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
  },
};
