import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import router from "../router"


var api = axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
});

var auth = axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
});


vue.use(vuex);

export default new vuex.Store({
  state: {
    //DUMMY DATA
    user: {},
    ships: [],
    logs: [],
    activeShip:{}
  },

  mutations: {
    //AUTH
    updateUser(state, payload) {
      console.log(3);
      state.user = payload;
    },

    setShips(state, payload) {
      console.log(6);
      state.ships = payload;
    },
    setLogs(state, payload) {
      state.logs = payload;
    },
    setActiveShip(state, payload){
      state.activeShip = payload
    }
  },
  actions: {
    //AUTH
    login({commit,dispatch}, payload){
      console.log(payload)
      auth
        .post('login', payload)
        .then(res=>{
          commit('updateUser', res.data)
          router.push({name: 'Home'})
        })
        .catch(err=>{
          console.log('Invalid Username or Password')
        })
    },
    authenticate({commit, dispatch}){
      auth
        .get('authenticate')
          .then(res=>{
            commit('updateUser', res.data)
          })
          .catch(err=>{
            console.error(err);
          })
    }, 

    //API
    // updateUser({ commit, dispatch }, payload) {
    //   console.log(2);
    //   if (payload.name.toLowerCase() != "jimmy") {
    //     commit("updateUser", JSON.parse(JSON.stringify(payload)));
    //   }
    // },
    getShips({ commit, dispatch }) {
      console.log(4);
      api
        .get("ships")
        .then(res => {
          console.log(res);
          console.log(5);
          commit("setShips", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getShipById({ commit, dispatch}, payload){
      api
        .get("ships/" + payload)
        .then(res=>{
          commit("setActiveShip", res.data)
        })
    },
    removeShip({ commit, dispatch }, payload) {
      console.log(2);
      api
        .delete("ships/" + payload._id)
        .then(res => {
          console.log(res);
          console.log(3);
          dispatch("getShips");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLogs({ commit, dispatch }, payload) {
      api
        .get("ships/" + payload._id + "/logs")
        .then(res => {
          
          commit("setLogs", res.data.logs);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
