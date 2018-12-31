<template>
  <div class="tab-description__text">    
    <section id="inner-scrollbar">
      <div v-html="tabText"></div>
    </section>
  </div>
</template>

<script>  
  import Scrollbar from 'smooth-scrollbar';  
  export default {    
    props : ['msg'],
    computed : {
      tabText : function(){
        var text = this.msg.split(' ');
        var t = '';
        for(var i in text){
          if(text[i] == '<br/>'){
            t+=text[i];
          }else{
            t += '<span>'+text[i]+'</span>';
            t += ' ';  
          }        
        }
        return t;
      }
    },
    mounted : function(){      
      TweenMax.staggerFromTo(document.querySelectorAll('.tab-description__text span'), 0.4, {opacity : 0, x : -50,  y:100, scale : 0, rotationY: 45, rotationZ:45, transformOrigin : '0 50% 0'}, {opacity : 1, x : 0,  y:0, scale : 1, rotationY: 0, rotationZ:0, transformOrigin : '0 50% 0', ease: Power2.easeOut}, 0.005);      
      setTimeout(function(){
        Scrollbar.init(document.querySelector('#inner-scrollbar'), {
          alwaysShowTracks: true
        });        
      },500);      
    },
    methods : {
      changeTabStart : function(){
        var app = this;
        var promise = new Promise(function(resolve, reject){
          TweenMax.to('.vue-scrollbar__scrollbar-vertical', 0.15, {x : 2, ease: Power4.easeOut});
          var t = document.querySelectorAll('.tab-description__text span');
          t = Array.prototype.slice.call(t, 0);
          TweenMax.staggerTo(t.reverse(), 0.4, {opacity : 0, x : -50, y : 100,  scale : 0, rotationY: 45, rotationZ:45, transformOrigin : '0 50% 0', ease: Power2.easeOut}, 0.005, resolve);
        });
        return promise;        
      },      
      leave : function(){
        TweenMax.to('.scrollbar-track-y', 0.5, {opacity : 0, ease: Power4.easeOut});
        var t = document.querySelectorAll('.tab-description__text span');
        t = Array.prototype.slice.call(t, 0);
        TweenMax.staggerTo(t.reverse(), 0.4, {opacity : 0, x : -50, y : 100,  scale : 0, rotationY: 45, rotationZ:45, transformOrigin : '0 50% 0', ease: Power2.easeOut}, 0.005);
      }
    }
  };

</script>

<style>
#inner-scrollbar {
  width: 100%;
  max-height: calc(100vh - 200px - 130px);
}
#inner-scrollbar .scroll-content {
  padding-right: 10px;
}
.scrollbar-track-y {
  width: 2px!important;
  background-color: transparent!important;
}
.scrollbar-thumb {
  background-color: #bababa!important;
  opacity: 0.5;
  transition: opacity 500ms ease;
}
#inner-scrollbar:hover .scrollbar-thumb {
  opacity: 1;
}
  .vue-scrollbar__wrapper {    
    background-color: transparent;
    padding-right: 10px;
  }
  .vue-scrollbar__scrollbar-vertical {
    width: 2px;
    overflow: hidden;
    transform: translateX(2px);    
  }  
  .vue-scrollbar__area {
    padding-left: 50px;
  }
  .vue-scrollbar__scrollbar-vertical .scrollbar {
    width: 2px; 
  }
  .vue-scrollbar__scrollbar-vertical .scrollbar, .vue-scrollbar__scrollbar-horizontal .scrollbar {
    background-color: #bababa;
  }
</style>