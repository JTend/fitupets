import { createStore } from 'vuex'

export default createStore({
  state: { token : 'b2c6de510d584484d74c9aa9f8fa9f04' },
  getters : { getKey : state => state.token },
  mutations: { setPet(state, id) { state.pet = id; } },
  actions: {  },
  modules: {  }
})
