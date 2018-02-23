import vue from "vue";
import vuex from "vuex";
import axios from "axios";

var api = axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000
});

vue.use(vuex);

export default new vuex.Store({
  state: {
    //DUMMY DATA
    user: {
      name: "Bobby"
    },
    ships: [],
    logs: []
  },

  mutations: {
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
    }
  },
  actions: {
    updateUser({ commit, dispatch }, payload) {
      console.log(2);
      if (payload.name.toLowerCase() != "jimmy") {
        commit("updateUser", JSON.parse(JSON.stringify(payload)));
      }
    },
    getShips({ commit, dispatch }, payload) {
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
