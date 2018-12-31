<template>
  <div class="preloader">
    <div>
      <span>{{preloaderPercent}}%</span>  
    </div>            
  </div>
</template>

<script>
export default {  
  data : function(){
    return {
      preloaderNumber : 0
    }
  },
  computed: {
    preloaderPercent: function() {
        return this.preloaderNumber.toFixed(0);
    },
    mobile: function(){
      return this.$store.state.mobile;
    }
  },
  mounted : function(){
    const app = this;
    TweenMax.set('.cursor-ring', {x : (window.innerWidth / 2) - 30, y : (window.innerHeight / 2) -30});
    TweenMax.set([document.querySelectorAll('.dda'), document.querySelectorAll('.go-tonext')], {visibility : 'visible'});
    TweenMax.set([document.querySelectorAll('.dda span'), document.querySelectorAll('.go-tonext span')], {y : 12});
    TweenMax.set([document.querySelectorAll('.dda span'), document.querySelectorAll('.go-tonext span')], {css : {'letter-spacing': app.mobile ? '10px' : '20px', 'transition-timing-function' : 'cubic-bezier(0.895, 0.03, 0.685, 0.22)'}});
    TweenMax.set(['.logo', document.querySelectorAll('nav div'), 'header .lng', 'header .menu span', document.querySelectorAll('.follow-us li')], { y: 35});
    TweenMax.set('.follow-us_title span', { y: 10});
    TweenMax.set('.g-pager div', { x: -35});
    TweenMax.set(['header', '.g-pager', '.follow-us'], {opacity : 1});
    TweenMax.set('.cursor-ring', {x : (window.innerWidth / 2) - 30, y : (window.innerHeight / 2) -30});
    TweenMax.to('.preloader', 1.3, { height: '50%', ease: Power1.easeOut, onComplete : function(){      
      TweenMax.to('.cursor-ring circle', 0.7, {css : {'stroke-dashoffset':'0'}, onComplete : function(){
        app.$store.commit('set', {
          name : 'moveCursor',
          value : true
        });
        TweenMax.to(app.$data, 1.3, { preloaderNumber : 100, ease: Power1.easeOut});                            
        TweenMax.to([document.querySelectorAll('.dda span'), document.querySelectorAll('.go-tonext span')], 1, {y : 0, ease: Power1.easeOut});
        TweenMax.to('.preloader', 1.3, { height: '100%', ease: Power1.easeOut, onComplete : function(){                    
          app.$store.commit('set', {
            name : 'appStart',
            value : true
          });          
        }});
      }});
    }});
    TweenMax.to(app.$data, 1.3, { preloaderNumber : 50, ease: Power1.easeOut});
  }
}
</script>


<style>
#loader {
  visibility: hidden;
}
</style>
