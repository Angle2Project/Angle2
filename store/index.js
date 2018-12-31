import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    appStart: false,
    firstPage: true,
    page: '',
    previousPage: '',
    mobile: false,
    touch: false,
    scroll: true,
    pager: '01',
    moveCursor : false,
    transitionPage: true,
    mousemove: {},
    cursorColor: '',
    cursorHoverColor: '',
    cursorHoverActive: false,
    cursorLongAnimate: false,
    cursorLongAnimatePermit: true,
    home: {

    },
    process: {
      tabsanimated : true,
      tabsActive: false,
    },
    projects: {
      scrollListPermit: false
    }
  },
  getters: {
    
  },
  actions : {
    
  },
  mutations: {
    set(state, status){
      state[status.name] = status.value;      
    },
    process(state, status){
      state.process[status.name] = status.value;      
    },
    projects(state, status){
      state.projects[status.name] = status.value;      
    },
    
  }
})

export default store