<template>
  <div id="app-projects" @mousewheel="mousewheel">      
    <div class="projects__details">
      <div class="projects__details_right">
        <div class="projects__details_slide-dots">
          <span>{{slide}}</span>
          <i></i>
          <b>06</b>
        </div>              
      </div>       
      <div class="projects__details_photo" data-displacement="/img/displacement/pattern2.png" data-intensity="-0.65" data-speedIn="1" data-speedOut="1">
        <img v-for="(img, $index) in projects" :key="$index" :src="img.url" alt="Image"/>    
      </div>
    </div>
    <ul class="projects__list" ref="list">
      <li v-for="(project, index) in projects" :key="index" :data-name="project.dataName" :class="project.duble ? 'duble': ''">
        <div class="left">            
          <h2 @mouseenter="projectHover($event, project.dataName, index+1)" @mouseleave="projectHover($event, project.dataName, index+1)" :data-img="index" @click="showDetails" :data-name="project.dataName">
            <div class="tech">
              <b v-for="(tech, index) in project.tech" :key="index">{{tech}}</b>
            </div>
            <router-link :to="'/projects/'+project.name">
              <span v-html="project.name"></span>
            </router-link>
          </h2>          
        </div>
        <div class="right">
          <h2 @mouseenter="projectHover($event, project.dataName, index+1)" @mouseleave="projectHover($event, project.dataName, index+1)" :data-img="index" @click="showDetails" :data-name="project.dataName">
            <router-link :to="'/projects/'+project.name">
              <span v-html="project.name"></span>
            </router-link>
          </h2>
        </div>            
      </li>          
    </ul>    
  </div>    
</template>

<script>
import * as hoverEffect from '~/assets/js/photosMorph';
export default {
    mounted : function () {
      const app = this;                
      var leader = app.pointer;
      var list = document.querySelectorAll('.projects__list li');        
      list.forEach( function(el, i) {        
        leader = app.startParallax(leader, el, i);
      });
      var split = new SplitText(".projects__list h2 span", {});
      const el = document.querySelector('.projects__details_photo');      
      const imgs = Array.from(el.querySelectorAll('img'));
      hoverEffect.init({
        parent: document.querySelector('.projects__details_photo'),
        intensity: el.dataset.intensity || undefined,
        speedIn: el.dataset.speedin || undefined,
        speedOut: el.dataset.speedout || undefined,
        easing: el.dataset.easing || undefined,
        hover: el.dataset.hover || undefined,
        images: imgs,          
        displacementImage: el.dataset.displacement
      });      
        //hoverEffect.start();
      
    },    
    data: function(){
      return {        
        listTop : 0,
        sceneTop : 0,
        pointer : {
          y : 0
        },
        direction: '',
        oldY: 0,
        ease : 0.1,
        slide: '01',
        projects : [
          {
              name : '4peak',
              dataName : '4peak',
              tech : ['ux', 'ui'],
              url : '/img/projects/4peak.jpg'
          },
          {
              name : 'reactivate',
              dataName : 'Reaktivate',
              tech : ['ux', 'ui', 'lab'],
              url : '/img/projects/reaktivate.jpg'
          },
          {
              name : 'bonex',
              dataName : 'Bonex',
              tech : ['ui', 'lab'],
              url : '/img/projects/bonex.jpg'
          },
          {
              name : 'bikepack',
              dataName : 'BikePack',
              tech : ['ui'],
              url : '/img/projects/medical.jpg'
          },
          {
              name : 'vyshegrad',
              dataName : 'Vyshegrad',
              tech : ['ui', 'lab'],
              url : '/img/projects/vishegrad.jpg'
          },
          {
              name : 'floston',
              dataName : 'Floston',          
              tech : ['ux'],
              url : '/img/projects/floston.jpg'
          }
        ]
      } 
    },
    computed : {    
      mousemove: function(){
        return this.$store.state.mousemove;
      },
      scrollListPermit: function(){
        return this.$store.state.projects.scrollListPermit;
      },
      
    },
    watch: {
      mousemove : function(move, old){
        const app = this;        
        if((move.y - 120) > 0){
          // app.direction = move.y > app.oldY ? 'up' : 'down';        
          // app.oldY = move.y;
        
          var sh = document.querySelector('#app-projects').clientHeight;
          var lh = document.querySelector('.projects__list').clientHeight;          
          if(lh > sh){
            var y = move.y - 120;            
            var sh = document.querySelector('#app-projects').clientHeight - 120;
            var lh = document.querySelector('.projects__list').clientHeight;
            var cp = 100 / (sh / y);
            var diff = (lh - sh);
            var yDiff = -(diff / 100) * cp;
            app.pointer.y = yDiff;
            //console.log(document.querySelector('.projects__list li:first-child')._gsTransform.y);
            //app.listTop = yDiff;
            // TweenMax.to('.projects__list', 0.6, {y : yDiff, onUpdate: function(){
            //   var scaleY = 1 + ((yDiff - document.querySelector('.projects__list')._gsTransform.y)*0.002);              
            //   TweenMax.set('.projects__list', {scaleY:scaleY});              
            // }});          
          }
        }
        


        return;
        if(app.teamSlider && app.appStart){
          var rootY = -((window.innerHeight / 2)  - e.clientY);
          var moveY = (17.7/100) * (100 / ((window.innerHeight / 2) / rootY));
          var y = (window.innerWidth / 100) * moveY;                
          app.pointer.y = -y;
        }        
      }      
    },
    methods : {       
      startParallax : function(leader, el, i){
        var app = this;        
        TweenMax.set(el, {y : 0});
        var pos = el._gsTransform;        
        TweenMax.to(el, 10, {
          y: 0,          
          repeat: -1,
          modifiers: {
            y: function () {
              if(i == 0){
                //console.log(pos.y);
              }
              //if(app.direction == 'down')return false;
              return (pos.y + (leader.y - pos.y) * 0.4);
            }            
          }
        });
        return pos;
      },
    scrollList : function(clientY){
      
    },
    scrollListTouch : function(e){
      
    },
    projectHover : function(e, name, slide){      
      var app = this;
      console.log(app.scrollListPermit);
      if(app.scrollListPermit && e.target.parentNode.className != 'hover'){
          hoverEffect.hover(e);
          document.querySelectorAll('.projects__list li').forEach(function(el, index) {
            if(el.className == 'hover'){
              TweenMax.to(el.querySelectorAll('.tech b'), 0.3, {x : '-102%', ease: Power3.easeInOut});
              TweenMax.to(el.querySelectorAll('span'), 0.3, {x : 0, color : '#ffffff', opacity : 0.1, ease: Power3.easeInOut});
              el.classList.remove('hover');
            }          
          });
          e.target.parentNode.parentNode.classList.add('hover');        
          TweenMax.to(e.target.parentNode.parentNode.querySelectorAll('.tech b'), 0.3, {x : '0%', ease: Power3.easeInOut});
          TweenMax.to(e.target.parentNode.parentNode.querySelector('.left span'), 0.3, {x : window.innerWidth / 100 * 6.2, color : '#ffffff', opacity : 1, ease: Power3.easeInOut});
          TweenMax.to(e.target.parentNode.parentNode.querySelector('.right span'), 0.3, {x : window.innerWidth / 100 * 6.2, color : '#1d1d1d', opacity : 1, ease: Power3.easeInOut});
          app.slide = slide < 10 ? '0'+slide : slide;
        } 
    },
    showDetails : function(e){
            
    },
    closeDetails : function(e){
       
    },
    hoverLinks : function(e, color){
           
    },
    mousewheel : function (val) {
          
    },
    orientation: function() {
          
    },
    onResize : function(e){
      
    },
    enter: function () {
          
    },
    leave: function () {
           
    }    
  },
  transition : {
    mode : 'out-in',
    css : false,
    enter : function(el, done){
      const app = this;
      app.$store.commit('set', {
        name: 'page',
        value: 'projects'
      });      
      app.$store.commit('set', {
        name: 'cursorColor',
        value: '#b6b6b6'
      });
      app.$store.commit('set', {
        name: 'cursorHoverColor',
        value: '#ffffff'
      });
      app.$store.commit('set', {
        name: 'cursorLongAnimate',
        value: false
      });
      app.$store.commit('set', {
        name: 'cursorLongAnimatePermit',
        value: false
      });
      app.$store.commit('set', {
        name: 'scroll',
        value: false
      });
      if(app.$store.state.firstPage){
        TweenMax.set('.main-bg', {backgroundColor : '#1d1d1d', height : '100%', width : 0, x : 0});
        TweenMax.set('.projects__details', {x : '100%'});
        TweenMax.to('.preloader span', 1.3, {y : 50});            
        TweenMax.to('.main-bg', 0.7, {width : '100%', ease: Power3.easeIn});
        TweenMax.to('.main-bg', 0.7, {css : {transform : 'translateX(-50vw)'}, ease: Power3.easeIn});
        TweenMax.to(document.querySelectorAll('.go-tonext span'), 0.4, {y : 13, delay : 0.4});
        TweenMax.to('.preloader', 0.7, {backgroundColor : '#000', ease: Power3.easeIn, onComplete : function(){
          TweenMax.set('#app', {backgroundColor : '#1d1d1d'});
          TweenMax.set('.main-bg', {backgroundColor : 'transparent', width : 0, height : 0});
          TweenMax.set(document.querySelectorAll('.dda span'), {css : {'letter-spacing': '0px', 'transition-timing-function': 'cubic-bezier(0.23, 1, 0.32, 1)'}});              
          TweenMax.to('.preloader', 0.7, {height: 0, y : 0, ease: Power3.easeOut, onComplete : function(){
            app.$store.commit('set', {
              name: 'pager',
              value: '03'
            });            
            TweenMax.to('.g-pager div', 0.4, {x : 0});
            TweenMax.to('.logo', 0.4, {y : 0});
            TweenMax.to('.follow-us_title span', 0.4, {y : 0, onComplete : function(){                  
              TweenMax.to('header .menu span', 0.3, {y : 0});
              TweenMax.staggerTo(['header .process', 'header .projects', 'header .contact', 'header .lng'], 0.3, {y : 0}, 0.1);
              TweenMax.staggerTo(['.follow-us li.be', '.follow-us li.dr', '.follow-us li.fb', '.follow-us li.ig'], 0.3, {y : 0}, 0.1);
            }});
          }});              
          app.$store.commit('process', {
            name: 'tabsanimated',
            value: false
          });
          TweenMax.set(document.querySelectorAll('.projects__list h2 span'), {x:'100vw', opacity: 0.1});
          TweenMax.set('.projects__list', {visibility : "visible"});
          TweenMax.set('.projects__details_slide-dots i', {width: 0});
          TweenMax.set('.projects__details_slide-dots b, .projects__details_slide-dots span', {y: '-100%'});
          TweenMax.staggerTo(document.querySelectorAll('.projects__list .left span'), 1.4, {x : 0, ease: Power3.easeInOut}, 0.1);
          TweenMax.staggerTo(document.querySelectorAll('.projects__list .right span'), 1.4, {x : 0, ease: Power3.easeInOut}, 0.1);
          TweenMax.to('.projects__details', 1.4, {x : '0%', ease: Power3.easeInOut, delay: 0.6, onComplete: function(){
            TweenMax.set('.projects__details_photo canvas', {opacity:1});
            document.querySelector('.projects__list li:first-child').classList.add('hover');            
            TweenMax.to(document.querySelectorAll('.projects__list li:first-child .tech b'), 0.6, {x : '0%', ease: Power3.easeInOut});
            TweenMax.to(document.querySelector('.projects__list li:first-child .left span'), 0.6, {x : window.innerWidth / 100 * 6.2, color : '#ffffff', opacity : 1, ease: Power3.easeInOut});
            TweenMax.to(document.querySelector('.projects__list li:first-child .right span'), 0.6, {x : window.innerWidth / 100 * 6.2, color : '#1d1d1d', opacity : 1, ease: Power3.easeInOut, onComplete: function(){              
              app.$store.commit('projects', {
                name: 'scrollListPermit',
                value: true
              });              
            }});
            TweenMax.to('.projects__details_slide-dots i', 0.7, {width: 40, onComplete: function(){
              TweenMax.to('.projects__details_slide-dots b, .projects__details_slide-dots span', 0.7, {y: '0%', ease: Power4.easeIn});
            }});
            //TweenMax.set('.projects__details_slide-dots b, .projects__details_slide-dots span', {y: '-100%'});
            hoverEffect.start();
          }});
          // var l = document.querySelectorAll('.projects__list li:nth-child(odd) span');
          // var r = document.querySelectorAll('.projects__list li:nth-child(even) span');
          
          // l.forEach( function(e, i) {
          //   var x = ((e.parentNode.clientWidth - (app.mobile ? 50 : 140)) / 2) - (e.clientWidth / 2);        
          //   TweenMax.fromTo(e, 1.5, {x : -(e.clientWidth+100)}, {x : x, ease: Power4.easeOut});
          // });
          // r.forEach( function(e, i) {
          //   var x = ((e.parentNode.clientWidth - (app.mobile ? 50 : 140)) / 2) - (e.clientWidth / 2);        
          //   TweenMax.fromTo(e, 1.5, {x : e.parentNode.clientWidth}, {x : x, ease: Power4.easeOut});
          // });
          // TweenMax.staggerTo(document.querySelectorAll('.projects__list .left span'), 0.7, {x : 0, ease: Power4.easeInOut, delay : 0.9}, 0.09);
          // TweenMax.staggerTo(document.querySelectorAll('.projects__list .right span'), 0.7, {x : 0, ease: Power4.easeInOut, delay : 0.9}, 0.09);
        }});
      }        
    },
    leave : function(el, done){
      done();
    }
  }
}
</script>

<style>
#app-projects {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.projects header nav a::after, .projects header .lng a::after {    
    background-color: #ffffff;    
}
.projects__scene {
  padding: 0;  
  height: 100vh;
  transform: translate3d(0, 0, 0);
}
.projects__list {
  list-style: none;
  margin: 120px -1.7vw 0 -1.7vw;
  padding-bottom: 6vw;
  padding-left: 0;
  padding-right: 0;
  visibility: hidden;
}
.projects__list li {
  display: flex;    
  position: relative;
  height: 21.3vw;
  margin-top: -13vw;
  pointer-events: none;
}
.projects__list li:first-child {
  margin-top: 0;
}
.projects__list li[data-name="contacts"] {
  visibility: hidden;
}
.projects__list li .left {
  width: 50%;
  overflow: hidden;  
  color: #fff;
}
.projects__list li .left a {
  color: #fff;
}
.projects__list li .right {
  width: 50%;
  overflow: hidden;  
  color: #fff;
}
.projects__list li .right a {
  color: #fff;
}
.projects__list li h2 {
  font-size: 10.7vw;
  margin: 0;
  padding: 0 70px;
  line-height: 8.2vw;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: -.45vw;
  width: 200%;
  cursor: pointer;
  overflow: hidden;  
  position: relative;
  z-index: 1;
  pointer-events: all;
}
.projects__list li h2 span {
  display: inline-block;  
}
.projects__list li h2 i {
  display: inline-block;
  font-style: normal;
}
.projects__list li .left h2 {  
  transform: translate3d(0, 0, 0) rotate(-15deg) skewX(-15deg);
}
.projects__list li .right h2 {
  margin-left: -100%;
  transform: translate3d(0, 0, 0) rotate(15deg) skewX(15deg);
}
.projects__list li h2 .tech {
  position: absolute;
  height: 100%;
  left: 70px;
  top: 4px;
  font-size: 3vw;
  line-height: 2.65vw;
  letter-spacing: -1px;
  overflow: hidden;
}
.projects__list li h2 .tech b {
  display: block;  
  transform: translateX(-102%);
}
.projects__list_next-preview {
  background: #fff;
  width: 70vw;
  height: 33.2vw;
  position: absolute;
  display: none;
  right: -70vw;
  top: 152px;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 59vw 100%;  

}
.projects__details {  
  position: fixed;
  right: 0;
  top: 152px;
  background: #fff;
  width: 70vw;
  height: 33.2vw;
}
.projects__details_photo {
  width: 59vw;
  height: 33.2vw;
  position: relative;
  overflow: hidden;  
  float: right;
  background-color: #1d1d1d;
}
.projects__details_photo img {
  display: none;
}
.projects__details_photo canvas {
  opacity: 0;
}
.projects__details_photo-img {
  width: 100%;    
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top ;
}
.projects__details_photo-img.current {
  z-index: 2!important;
}
.projects__details_right {
  width: 11vw;
  float: right;
  position: relative;
  height: 100%;
}
.projects__details_photo img {
  width: 100%;
}
.projects__details_slide-dots {
  position: absolute;
  right: 50%;
  top: 50%;
  transform: rotate(-90deg) translate(50%, -50%);
  transform-origin: 100% 0%;
  white-space: nowrap;
  overflow: hidden;
  line-height: 10px;
}
.projects__details_slide-dots span,
.projects__details_slide-dots b {
  display: inline-block;
  font-size: 10px;
  line-height: 10px;
  vertical-align: middle;
  width: 14px;
  text-align: center;
}
.projects__details_slide-dots i {
  display: inline-block;
  width: 40px;
  height: 1px;
  background-color: #000;
  margin: 0 3px;
  vertical-align: middle;
}
.projects__details_content {
  width: 74vw;
  position: fixed;
  right: 11vw;
  height: 0;
  background-color: #fff;
  overflow: hidden;  
  top: calc(1vw * 33.2 + 152px + 200px + 55px);  
}
.projects__details_content-block {
  font-size: 18px;
  line-height: 30px;
  padding: 120px 140px 120px 15vw;
  visibility: hidden;
}
.projects__details_content-block h4 {
  margin: 0 0 10px 0;
  padding: 0;
  font-size: 10px;
  line-height: 1;
  font-weight: normal;
  color: #000;
  text-transform: uppercase;
  overflow: hidden;  
}
.case-study {
  width: 56px;
  font-size: 10px;
  line-height: 12px;
  font-weight: 400;
  text-transform: uppercase;
  transform: rotate(270deg);
  position: fixed;
  left: 59px;
  top: 141px;
  letter-spacing: -0.2px;
  z-index: 5;    
}
.case-study > div {
  overflow: hidden;
  width: 200px;  
}
.case-study > div > span {
  display: block;
  opacity: 0;  
  transition-property: letter-spacing;
  transition-duration: 0.9s;
}
.case-next {
  width: 56px;
  font-size: 10px;
  line-height: 12px;
  font-weight: 400;
  text-transform: uppercase;
  transform: rotate(270deg);
  position: fixed;
  left: 59px;
  top: 0;
  letter-spacing: -0.2px;
  z-index: 5;    
}
.case-next > div {
  overflow: hidden;
  width: 200px;  
}
.case-next > div > span {
  display: block;
  opacity: 0;  
  transition-property: letter-spacing;
  transition-duration: 0.9s;
}
.projects__details__close {
  width: 42px;
  height: 42px;  
  position: fixed;
  top: 210px;
  right: 5.5vw;
  cursor: pointer;
  transform: translateX(50%);
  z-index: 1;
  visibility: hidden;
}
.projects__details__close i {
  display: block;
  height: 1px;
  width: 42px;
  background-color: #000;
  position: absolute;
  left: 0px;
  top: 50%;
  opacity: 0;
}
.projects__details_client {
  position: fixed;
  top: calc(152px + 33.2vw);
  left: 5vw;
  z-index: 1;
  transform: translateY(-100%);
  visibility: hidden;
}
.projects__details_client h4 {
  margin: 0 0 10px 0;
  padding: 0;
  font-size: 10px;
  line-height: 1;
  font-weight: normal;
  color: #000;
  text-transform: uppercase;
  overflow: hidden;
}
.projects__details_client-text {
  font-size: 18px;
  line-height: 1;
  font-weight: 400;
  color: #000;
  text-transform: uppercase;  
}
.projects__details_client-text span {
  display: inline-block;
  opacity: 0;
}
.projects__details_output {
  position: fixed;
  top: calc(152px + 33.2vw + 45px);
  left: 5vw;
  z-index: 1;
  visibility: hidden;
}
.projects__details_output h4 {
  margin: 0 0 10px 0;
  padding: 0;
  font-size: 10px;
  line-height: 1;
  font-weight: normal;
  color: #000;
  text-transform: uppercase;
  overflow: hidden;
}
.projects__details_output-text {
  font-size: 1;
  line-height: 1;
  font-weight: 400;
  color: #000;    
}
.projects__details_output-text span {
  display: inline-block;
  opacity: 0;
}
.projects__details_fields {
  position: fixed;
  top: calc(152px + 33.2vw + 45px);
  left: 30vw;
  z-index: 1;
  visibility: hidden;
}
.projects__details_fields h4 {
  margin: 0 0 10px 0;
  padding: 0;
  font-size: 10px;
  line-height: 1;
  font-weight: normal;
  color: #000;
  text-transform: uppercase;
  overflow: hidden;
}
.projects__details_fields-text {
  font-size: 18px;
  line-height: 1;
  font-weight: 400;
  color: #000;    
}
.projects__details_fields-text span {
  display: inline-block;
  opacity: 0;
}
.projects__details_link {
  position: fixed;    
  top: calc(152px + 33.2vw + 49px);
  right: 11vw;
  z-index: 1;
  margin-top: 10px;
  visibility: hidden;  
}
.projects__details_link a {
  font-size: 18px;
  line-height: 30px;
  color: #000;
  display: inline-block;
  overflow: hidden;
}
.projects__details_link a span {
  display: inline-block;
  opacity: 0;
}
.projects__details_link-border {
  display: block;
  height: 1px;
  width: 100%;
  background-color: #90f8eb;
  position: absolute;
  left: 0;  
  bottom: 0;
}
@media screen and (max-width: 800px) {  
  .projects__list {
    padding-top: 170px;
  }
  .projects__list li {
    height: 23.7vw;
  }
  .projects__list li.duble {
    height: 34.4vw;
  }
  .projects__list li h2 {
    font-size: 13.7vw;
    line-height: 10.7vw;
    padding: 0 25px;
  }  
  .projects__details {
    top: 100px;
    width: 0;
    overflow: hidden;
  }  
  .case-study {
    left: 14px;
    top: 70px;
  }
  .projects__details__close {
    top: 125px;
    width: 20px;
    height: 20px;
  }
  .projects__details_client {
    top: calc(100px + 33.2vw);
  }
  .projects__details_output,
  .projects__details_fields,
  .projects__details_link {
    top: calc(100px + 33.2vw + 45px);
  }
  .projects__details_content {
    top: calc(1vw * 33.2 + 100px + 200px + 55px);
  }
  .projects__details_content-block {
    padding: 68px 100px 100px 15vw;
  }
  .projects__details_photo {
    width: 89vw;
    height: 49.2vw;
  }
}
</style>

