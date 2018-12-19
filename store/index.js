import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    appStart: false,
    mobile: false,
    touch: false,
    pager: '01',
    moveCursor : false,
    mousemove: {},
    cursorColor: '',
    cursorHoverColor: '',
    cursorHoverActive: false,
    cursorLongAnimateDone: false,
    cursorLongAnimatePermit: true    
  },
  getters: {
    
  },
  actions : {
    
  },
  mutations: {
    set(state, status){
      state[status.name] = status.value;      
    }
  }
})

export default store