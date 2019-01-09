<template>
  <div id="app-start" class="noselect">
    <ul class="text portrait" v-if="mobile">
      <li class="left">
        <div class="text-wrapper">          
          <h2 ref="l1">{{text.mobile.row1}}</h2>
          <h2 ref="l2">{{text.mobile.row2}}</h2>
          <h2 ref="l3">{{text.mobile.row3}}</h2>
          <h2 ref="l4">{{text.mobile.row4}}</h2>
          <h2 ref="l5">{{text.mobile.row5}}</h2>
          <h2 ref="l6">{{text.mobile.row6}}</h2>
        </div>
      </li>
      <li class="right">
        <div class="text-wrapper">
          <h2 ref="r1">{{text.mobile.row1}}</h2>
          <h2 ref="r2">{{text.mobile.row2}}</h2>
          <h2 ref="r3">{{text.mobile.row3}}</h2>
          <h2 ref="r4">{{text.mobile.row4}}</h2>
          <h2 ref="r5">{{text.mobile.row5}}</h2>
          <h2 ref="r6">{{text.mobile.row6}}</h2>
        </div>
      </li>
    </ul>
    <ul class="text" v-else>
      <li class="left">
        <div class="text-wrapper">          
          <h2 ref="l1">{{text.desktop.row1}}</h2>
          <h2 ref="l2">{{text.desktop.row2}}</h2>
          <h2 ref="l3">{{text.desktop.row3}}</h2>
          <h2 ref="l4">{{text.desktop.row4}}</h2>
        </div>
      </li>
      <li class="right">
        <div class="text-wrapper">
          <h2 ref="r1">{{text.desktop.row1}}</h2>
          <h2 ref="r2">{{text.desktop.row2}}</h2>
          <h2 ref="r3">{{text.desktop.row3}}</h2>
          <h2 ref="r4">{{text.desktop.row4}}</h2>
        </div>
      </li>
    </ul>    
  </div>    
</template>

<script>
export default {
  mounted: function(){
    const app = this;    
  },
  data () {
    return {
      text : {
        desktop : {
          row1: 'look at your',
          row2: 'product from',
          row3: 'a different',
          row4: 'angle',    
        },
        mobile : {
          row1: 'look at ',          
          row2: 'your',
          row3: 'product',
          row4: 'from',
          row5 : 'a differ-',
          row6 : 'ent angle'
        },
      }      
    }
  },
  computed: {    
    firstPage: function(){
      return this.$store.state.firstPage;
    },
    mobile: function(){
      return this.$store.state.mobile;
    },
    mousemove: function(){
      return this.$store.state.mousemove;
    },
    deviceorientation: function(){
      return this.$store.state.deviceorientation;
    },
    cursorLongAnimate: function(){
      return this.$store.state.cursorLongAnimate;
    }
  },  
  watch : {
    mousemove: function(val){
      const app = this;
      if(app.cursorLongAnimate)return;
      var rootX = -((window.innerWidth / 2) - val.x);
        document.querySelectorAll('#app-start .text h2').forEach(function(el, i, arr){
        var moveX = 100 / ((window.innerWidth / 2) / rootX);
        var x = ((window.innerWidth -  el.clientWidth ) / 2) * (moveX/100);
        if(el.parentElement.parentElement.className == 'left'){
          TweenMax.to(el, 1, {
            css : {transform : 'rotate(-15deg) skewX(-15deg) translateX('+x+'px)'}          
          });  
        }else{
          TweenMax.to(el, 1, {
            css : {transform : 'rotate(15deg) skewX(15deg) translateX('+x+'px)'}          
          });
        }        
      });      
    },
    deviceorientation: function(e){
      if(app.cursorLongAnimate)return;
      console.log(e.gamma);
      var rootX = -((window.innerWidth / 2) - e.gamma);
        document.querySelectorAll('.text h2').forEach(function(el, i, arr){
          var moveX = 100 / (45 / e.gamma);        
          var x = ((window.innerWidth -  el.clientWidth ) / 2) * (moveX/100);

          if(el.parentElement.parentElement.className == 'left'){
            TweenMax.to(el, 1, {
              css : {transform : 'rotate(-15deg) skewX(-15deg) translateX('+x+'px)'}          
            });  
          }else{
            TweenMax.to(el, 1, {
              css : {transform : 'rotate(15deg) skewX(15deg) translateX('+x+'px)'}          
            });
          }        
        });
    },
    cursorLongAnimate: function(val){
      const app = this;
      if(val){        
        TweenMax.to(document.querySelectorAll('.text .left h2:nth-child(odd)'), 2.1, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(-100vw)'}, ease: Power2.easeIn});
        TweenMax.to(document.querySelectorAll('.text .right h2:nth-child(odd)'), 2.1, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(-100vw)'}, ease: Power2.easeIn});
        TweenMax.to(document.querySelectorAll('.text .left h2:nth-child(even)'), 2.1, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(100vw)'}, ease: Power2.easeIn});
        TweenMax.to(document.querySelectorAll('.text .right h2:nth-child(even)'), 2.1, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(100vw)'}, ease: Power2.easeIn});        
      }else{
        TweenMax.to(document.querySelectorAll('.text .left h2:nth-child(odd)'), 1.5, {opacity : 1, css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.to(document.querySelectorAll('.text .right h2:nth-child(odd)'), 1.5, {opacity : 1, css : {transform : 'rotate(15deg) skewX(15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.to(document.querySelectorAll('.text .left h2:nth-child(even)'), 1.5, {opacity : 1, css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.to(document.querySelectorAll('.text .right h2:nth-child(even)'), 1.5, {opacity : 1, css : {transform : 'rotate(15deg) skewX(15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
      }
    }
  },
  methods: {
    
  },
  transition : {
    mode : 'out-in',
    css : false,
    enter : function(el, done){      
      const app = this;    
      console.log('enter Index');  
      app.$store.commit('set', {
        name: 'page',
        value: 'home'
      });      
      app.$store.commit('set', {
        name: 'cursorColor',
        value: '#b6b6b6'
      });
      app.$store.commit('set', {
        name: 'cursorHoverColor',
        value: '#2af8eb'
      });
      app.$store.commit('set', {
        name: 'cursorLongAnimatePermit',
        value: true
      });
      app.$store.commit('set', {
        name: 'scroll',
        value: true
      });
      if(app.$store.state.firstPage){
        /*============= First render ========== */
        TweenMax.to('.preloader span', 1.3, {y : 50});    
        TweenMax.set([document.querySelectorAll('.dda span'), document.querySelectorAll('.go-tonext span')], {css : {'letter-spacing': '0px', 'transition-timing-function': 'cubic-bezier(0.23, 1, 0.32, 1)'}});
        TweenMax.to('.preloader', 1.3, {height: (app.mobile ? 60 : 90), y : (app.mobile ? -50 : -70), ease: Power3.easeOut, onComplete : function(){
          app.$store.commit('set', {
            name : 'transitionPage',
            value : false
          });
          TweenMax.to('.g-pager div', 0.4, {x : 0});
          TweenMax.to('.logo', 0.4, {y : 0});
          TweenMax.to('.follow-us_title span', 0.4, {y : 0, onComplete : function(){
              TweenMax.to('header .menu span', 0.3, {y : 0});
              TweenMax.staggerTo(['header .process', 'header .projects', 'header .contact', 'header .lng'], 0.3, {y : 0}, 0.1);                
            TweenMax.staggerTo(['.follow-us li.be', '.follow-us li.dr', '.follow-us li.fb', '.follow-us li.ig'], 0.3, {y : 0}, 0.1);          
          }});
        }});
        TweenMax.fromTo(document.querySelectorAll('.text .left h2:nth-child(odd)'), 1.5, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(-100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.fromTo(document.querySelectorAll('.text .right h2:nth-child(odd)'), 1.5, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(-100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(15deg) skewX(15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.fromTo(document.querySelectorAll('.text .left h2:nth-child(even)'), 1.5, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.fromTo(document.querySelectorAll('.text .right h2:nth-child(even)'), 1.5, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(15deg) skewX(15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});  
        app.$store.commit('set', {
          name : 'firstPage',
          value : false
        });
      }else{
        /*============= Transition render ========== */
        TweenMax.set('#app-start .text', {visibility: 'hidden'})
        TweenMax.set('.main-bg', {backgroundColor : '#ffffff', height : '100%', width : 0, x : 0});        
        TweenMax.to('.main-bg', 0.7, {width : '100%', ease: Power3.easeIn});
        TweenMax.to('.main-bg', 0.7, {css : {transform : 'translateX(-50vw)'}, ease: Power3.easeIn});              
        TweenMax.to('.preloader', 0.7, {backgroundColor : '#000000', ease: Power3.easeIn, onComplete : function(){
          app.$store.commit('set', {
            name: 'pager',
            value: '01'
          });
          TweenMax.set('#app', {backgroundColor : '#ffffff'});
          TweenMax.set('.main-bg', {backgroundColor : 'transparent', width : 0, height : 0});
          TweenMax.set([document.querySelectorAll('.dda span'), document.querySelectorAll('.go-tonext span')], {css : {'letter-spacing': '0px', 'transition-timing-function': 'cubic-bezier(0.23, 1, 0.32, 1)'}});
          TweenMax.to('.preloader', 0.7, {height: (app.mobile ? 60 : 90), y : (app.mobile ? -50 : -70), ease: Power3.easeOut, onComplete:function(){
            app.$store.commit('set', {
              name : 'transitionPage',
              value : false
            });
            app.$store.commit('set', {
              name : 'scroll',
              value : true
            });            
          }});
          TweenMax.set('#app-start .text', {visibility: 'visible'});
          TweenMax.fromTo(document.querySelectorAll('.text .left h2:nth-child(odd)'), 1.5, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(-100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
          TweenMax.fromTo(document.querySelectorAll('.text .right h2:nth-child(odd)'), 1.5, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(-100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(15deg) skewX(15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
          TweenMax.fromTo(document.querySelectorAll('.text .left h2:nth-child(even)'), 1.5, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
          TweenMax.fromTo(document.querySelectorAll('.text .right h2:nth-child(even)'), 1.5, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(15deg) skewX(15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});    
          
          
          // app.global.currentComponent = 'home';
          // app.global.page = 'home';
          // app.global.pager = '01';
          // app.transitionPage = false;
          // app.cursor.hoverActive = false;
          // app.scroll = true;
        }});
      }      
    },
    leave : function(el, done){
      const app = this;
      app.$store.commit('set', {
        'name': 'transitionPage',
        value: true
      });      
      if(app.$store.state.cursorLongAnimate){
        done();
      }else{
        TweenMax.to(document.querySelectorAll('.text .left h2:nth-child(odd)'), 0.6, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(-100vw)'}, ease: Power2.easeIn});
        TweenMax.to(document.querySelectorAll('.text .right h2:nth-child(odd)'), 0.6, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(-100vw)'}, ease: Power2.easeIn});
        TweenMax.to(document.querySelectorAll('.text .left h2:nth-child(even)'), 0.6, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(100vw)'}, ease: Power2.easeIn});
        TweenMax.to(document.querySelectorAll('.text .right h2:nth-child(even)'), 0.6, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(100vw)'}, ease: Power2.easeIn});
        TweenMax.set([document.querySelectorAll('.dda span'), document.querySelectorAll('.go-tonext span')], {css : {'letter-spacing': (app.mobile ? '10px' : '20px'), 'transition-timing-function' : 'cubic-bezier(0.505, 0.000, 0.735, 0.425)'}});
        TweenMax.to('.preloader', 0.7, {y : 0, height : '100%', ease: Power3.easeIn, onComplete : function(){
          done();
        }});
      }      
    }
  }
}
</script>

<style scoped>
  #app-start {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .text {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transform: perspective(400px);    
}
.text li {    
    height: 100%;
    position: absolute;
    top: 0;
    overflow: hidden;    
}
.text li.left {
    width: 50%;
    left: 0;
}
.text li.right {
    width: 50%;
    right: 0;
}
#app-start .text li .text-wrapper {
    text-align: left;
    padding: 120px 5vw 0 5vw;
}
.text li .text-wrapper {
    width: 200%;
}
.text li.right .text-wrapper {
  margin-left: -100%;
}
.text-wrapper h2 {    
    font-size: 10.7vw;
    margin: 0;
    padding: 0;
    line-height: 8.2vw;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: -.45vw;
    display: table;
    margin: auto;
}
.portrait .text-wrapper h2 {
    font-size: 13.7vw;
    line-height: 10.5vw;
}
.text li.left .text-wrapper h2 {
    color: #2af8eb;
    transform: rotate(-15deg) skewX(-15deg) translateX(0px);
    
}
.text li.right .text-wrapper h2 {
    color: #000;
    transform: rotate(15deg) skewX(15deg) translateX(0px);
}

@media screen and (max-width: 768px) {
  #app-start .text li .text-wrapper {
    text-align: left;
    padding: 65px 5vw 0 5vw;
  }
  #app-start .text.portrait li .text-wrapper {
    text-align: left;
    padding: 120px 5vw 0 5vw;
  }
  #app-start .text-wrapper h2 {
    font-size: 15vw;    
    line-height: 11vw;    
  }
}
</style>
