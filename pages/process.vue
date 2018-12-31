<template>
  <div id="app-process">    
      <ul class="text noselect">
        <li class="left">
          <div class="text-wrapper">
            <h2 ref="l1" class="l1">              
                <span>
                  <i v-html="mobile ? row1Mob : row1"></i>
                </span>
            </h2>
            <h2 ref="l2" class="l2">
              <span class="dash" v-html="mobile ? '-' : '&mdash;'"></span>
              <span @mouseenter="spanEnter" class="ux" @mouseleave="spanLeave" @click="activeTabs">
                <i>ux</i>
              </span>
              <span @mouseenter="spanEnter" class="ui" @mouseleave="spanLeave" @click="activeTabs">
                <i>ui</i>
              </span>
              <span @mouseenter="spanEnter" class="lab" @mouseleave="spanLeave" @click="activeTabs">
                <i>lab</i>
              </span>
            </h2>
          </div>
        </li>
        <li class="right">
          <div class="text-wrapper">
            <h2 ref="r1" class="r1">
              <span>
                  <i v-html="mobile ? row1Mob : row1"></i>
              </span>
            </h2>
            <h2 ref="r2" class="r2">
              <span class="dash">&mdash;</span>
              <span @mouseenter="spanEnter" class="ux" @mouseleave="spanLeave" @click="activeTabs">
                <i>ux</i>
              </span>
              <span @mouseenter="spanEnter" class="ui" @mouseleave="spanLeave" @click="activeTabs">
                <i>ui</i>
              </span>
              <span @mouseenter="spanEnter" class="lab" @mouseleave="spanLeave" @click="activeTabs">
                <i>lab</i>
              </span>
            </h2>
          </div>
        </li>
      </ul>      
      <section class="tab-description" :class="mobile ? 'portrait' : ''" v-show="tabs.current.show">
        <scrollbar ref="scrollbar" :msg="tabs.current.text" v-if="tabs.current.showText"></scrollbar>
        <div class="tab-description__link">
          <a :href="tabs.current.linkHref" v-html="tabLinkText"></a>
          <i class="tab-description__link_border"></i>
        </div>
        <div class="tab-description__close" @click="closeTabs" @mouseenter="hoverLinks" @mouseleave="hoverLinks"><i class="l"></i><i class="r"></i></div>
      </section>
  </div>    
</template>

<script>
import Vue2Scrollbar from "~/components/Scroller.vue";
export default {  
  components: {
    'scrollbar': Vue2Scrollbar
  },
  mounted : function () {
    const app = this;
    app.$store.commit('process', {
      name: 'tabsActive',
      value: false
    });    
    app.$store.commit('process', {
      name: 'tabsanimated',
      value: true
    });    
  },
  data () {
    return {
      row1: 'our focus',
      row1Mob: 'focus on',
      mouseMove : true,      
      currentTab : '',
      winWidth : 0,
      portrait : undefined,
      tabs : {
        current : {
          show : false,
          showText : false,
          text : '',          
          linkText : '',
          linkHref : ''
        },
        dash : undefined,          
        ux : {
          text : 'User Experience (UX) refers to a person\'s emotions and attitudes about using a particular product, system or service. It includes the practical, experiential, affective, meaningful and valuable aspects of human–computer interaction and product ownership. Additionally, it includes a person’s perceptions of system aspects such as utility, ease of use and efficiency. <br/> <br/> User experience may be considered subjective in nature to the degree that it is about individual perception and thought with respect to the system. User experience is dynamic as it is constantly modified over time due to changing usage circumstances and changes to individual systems as well as the wider usage context in which they can be found. In the end user experience is about how the user interacts with and experiences the product.',
          linkText : 'Our UX Presentation',
          linkHref : '/',
          x : undefined,
          y : undefined
        },
        ui : {
          text : 'The user interface (UI), in the industrial design field of human–computer interaction, is the space where interactions between humans and machines occur. The goal of this interaction is to allow effective operation and control of the machine from the human end, whilst the machine simultaneously feeds back information that aids the operators decision-making process. Examples of this broad concept of user interfaces include the interactive aspects of computer operating systems, hand tools, heavy machinery operator controls, and process controls. The design considerations applicable when creating user interfaces are related to or involve such disciplines as ergonomics and psychology. <br/> <br/> Generally, the goal of user interface design is to produce a user interface which makes it easy (self-explanatory), efficient, and enjoyable (user-friendly) to operate a machine in the way which produces the desired result. This generally means that the operator needs to provide minimal input to achieve the desired output, and also that the machine minimizes undesired outputs to the human. <br/> <br/> With the increased use of personal computers and the relative decline in societal awareness of heavy machinery,[clarification needed] the term user interface is generally assumed to mean the graphical user interface, while industrial control panel and machinery control design discussions more commonly refer to human-machine interfaces. <br/> <br/> Other terms for user interface are man–machine interface (MMI) and when the machine in question is a computer human–computer interface.',
          linkText : 'Our UI Presentation',
          linkHref : '/',
          x : undefined,
          y : undefined
        },
        lab : {
          text : 'A usability lab is a place where usability testing is done. It is an environment where users are studied interacting with a system for the sake of evaluating the system\'s usability. <br/> <br/> Depending on the kind of system that is evaluated, the user sits in front of a personal computer or stands in front of the systems interface, alongside a facilitator who gives the user tasks to perform. Behind a one-way mirror, a number of observers watch the interaction, make notes, and ensure the activity is recorded. Very often the testing and the observing room are not placed alongside. In this case the video and audio observation are transmitted through a (wireless) network and broadcast via a video monitor or video beamer and loudspeakers. Usually, sessions will be filmed and the software will log interaction details.',
          linkText : 'Our Lab Presentation',
          linkHref : '/',
          x : undefined,
          y : undefined
        }
      }
    }
  },
  computed: {    
    tabsanimated: function(){
      return this.$store.state.process.tabsanimated;
    },
    tabsActive: function(){
      return this.$store.state.process.tabsActive;
    },
    firstPage: function(){
      return this.$store.state.firstPage;
    },
    mobile: function(){
      return this.$store.state.mobile;
    },
    touch: function(){
      return this.$store.state.touch;
    },    
    mouseX: function(){
      return this.$store.state.mousemove;
    },
    cursorColor: function(){
      return this.$store.state.cursorColor;
    },
    cursorHoverColor: function(){
      return this.$store.state.cursorHoverColor;
    },
    cursorLongAnimate: function(){
      return this.$store.state.cursorLongAnimate;
    },
    cursorLongAnimatePermit: function(){
      return this.$store.state.cursorLongAnimatePermit;
    },
    tabLinkText: function(){
      var text = this.tabs.current.linkText;
      var t = '';
      for(var i in text){
        if(text[i] == ' '){
          t += '<span>&nbsp</span>';
        }else{
          t += '<span>'+text[i]+'</span>';          
        }        
      }
      return t;
    }
  },
  watch: {
    mouseX: function(val){
      const app = this;
      if(app.cursorLongAnimate)return;
      if(this.mouseMove){
        var rootX = -((window.innerWidth / 2) - val.x);
        document.querySelectorAll('.text h2').forEach(function(el, i, arr){
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
      }
    },
    cursorLongAnimate: function(val){
      const app = this;
      if(val){
        TweenMax.to('.text .l1, .text .l3', 2.1, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(-100vw)'},ease: Power2.easeIn});
        TweenMax.to('.text .r1, .text .r3', 2.1, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(-100vw)'},ease: Power2.easeIn});
        TweenMax.to('.text .l2, .text .l4', 2.1, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(100vw)'},ease: Power2.easeIn});
        TweenMax.to('.text .r2, .text .r4', 2.1, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(100vw)'},ease: Power2.easeIn});
      }else{
        TweenMax.to('.text .l1, .text .l3', 1.5, {opacity : 1, css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.to('.text .r1, .text .r3', 1.5, {opacity : 1, css : {transform : 'rotate(15deg) skewX(15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.to('.text .l2, .text .l4', 1.5, {opacity : 1, css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.to('.text .r2, .text .r4', 1.5, {opacity : 1, css : {transform : 'rotate(15deg) skewX(15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
      }
    }
  },  
  methods: {    
    spanEnter: function(e){
      const app = this;
      if(app.touch) return false;      
      app.$store.commit('set', {
        name: 'cursorLongAnimatePermit',
        value: false
      });      
      let c = e.currentTarget.className;
      if(app.tabsActive){
        if(!app.tabsanimated){          
          if(app.currentTab != c){
            TweenMax.to('.text span:not(.'+c+')', 0.2, {color : '#292929', ease: Power1.easeIn});
            TweenMax.to('.text span.'+c, 0.2, {color : '#fff', ease: Power1.easeIn});
          }
        }        
      }else{
        if(!app.tabsanimated){
          TweenMax.to(document.querySelectorAll('.text span:not(.'+c+')'), 0.2, {color : '#292929', ease: Power2.easeOut});
        }
      }
    },
    spanLeave: function(e){
      const app = this;
      if(!app.tabsActive){
        app.$store.commit('set', {
          name: 'cursorLongAnimatePermit',
          value: true
        });
      }
      let c = e.currentTarget.className;
      if(app.tabsActive){
        if(!app.tabsanimated && app.currentTab != c){
          TweenMax.to(document.querySelectorAll('.text span:not(.'+c+')'), 0.2, {color : '#fff', ease: Power1.easeIn});
          TweenMax.to(document.querySelectorAll('.text span.'+app.currentTab), 0.2, {color : '#2af8eb', ease: Power1.easeIn});  
          TweenMax.to(document.querySelectorAll('.text span.dash'), 0.2, {color : '#2af8eb', ease: Power1.easeIn});  
        }        
      }else{
        if(!app.tabsanimated){
          TweenMax.to(document.querySelectorAll('.text .left span:not(.'+c+')'), 0.2, {color : '#fff', ease: Power1.easeIn});
          TweenMax.to(document.querySelectorAll('.text .right span:not(.'+c+')'), 0.2, {color : '#2af8eb', ease: Power1.easeIn});
        }
      }
    },
    activeTabs: function(e){
      const app = this;
      let c = e.currentTarget.classList[0];
      app.$store.commit('set', {
        name: 'scroll',
        value: false
      });
      if(app.tabsActive){        
        app.$store.commit('process', {
          name: 'tabsanimated',
          value: true
        });
        if(app.mobile){

        }else{
          var m;
          if(c == 'ui'){
            m = window.innerWidth * 0.085;
          }else if(c == 'lab'){
            m = window.innerWidth * 0.17;
          }else{
            m = 0;
          }          
          TweenMax.to(document.querySelectorAll('.text span:not(.'+c+')'), 0.2, {color : '#292929', ease: Power1.easeIn});
          TweenMax.to(['.text span.'+c, '.text span.dash'], 0.2, {color : '#2af8eb', ease: Power1.easeIn});
          TweenMax.to('.text h2 .dash', 0.4, {y: -(app.tabs.dash.y - (app.mobile ? 65 : 175) - m), ease: Power4.easeInOut});
          TweenMax.staggerTo(document.querySelectorAll('.tab-description__link span'), 0.15, {opacity : 0,  y:150, scale : 0, rotationY: 45, rotationZ:-45, ease: Power1.easeOut}, 0.03);
          TweenMax.set('.process .tab-description__link_border', {right : 0, left : 'auto'});
          TweenMax.to('.process .tab-description__link_border', 0.5, {width : '0%', ease: Power2.easeIn, onComplete : function(){
            TweenMax.set('.tab-description__link', {display : 'none'});
          }});
          app.$refs.scrollbar.changeTabStart().then(function(){
            app.tabs.current.showText = false;
            app.tabs.current.text = app.tabs[c].text;
            app.tabs.current.linkText = app.tabs[c].linkText;
            app.tabs.current.link = app.tabs[c].link;          
            setTimeout(function(){
              app.tabs.current.showText = true;
              TweenMax.set('.tab-description__link', {display : 'block'});
              TweenMax.set('.process .tab-description__link_border', {right : 'auto', left : 0});
              TweenMax.to('.process .tab-description__link_border', 0.5, {width : '100%', ease: Power2.easeIn});
              TweenMax.staggerFromTo(document.querySelectorAll('.tab-description__link span'), 0.15, {opacity : 0,  y:150, scale : 0, rotationY: 45, rotationZ:-45}, {opacity : 1,  y:0, scale : 1, rotationY: 0, rotationZ:0, ease: Power3.easeInOut}, 0.03);
            }, 10);
            app.currentTab = c;          
            TweenMax.to(document.querySelectorAll('.text span:not(.'+c+'):not(.dash)'), 0.4, {color : '#ffffff', ease: Power1.easeIn, onComplete : function(){
              app.$store.commit('process', {
                name: 'tabsanimated',
                value: false
              });
            }});
          });
        }
      }else{        
        app.$store.commit('process', {
          name: 'tabsActive',
          value: true
        });
        app.mouseMove = false;
        app.$store.commit('process', {
          name: 'tabsanimated',
          value: true
        });
        app.winWidth = window.innerWidth;
        app.currentTab = c;
        app.tabs.current.text = app.tabs[app.currentTab].text;
        app.tabs.current.linkText = app.tabs[app.currentTab].linkText;
        app.tabs.current.linkHref = app.tabs[app.currentTab].linkHref;
        TweenMax.to('.g-pager div', 0.3, {x : '-100%', ease: Power4.easeIn});
        TweenMax.to(document.querySelectorAll('.go-tonext span'), 0.3, {y : '100%', ease: Power4.easeIn, onComplete : function(){
          TweenMax.to('.preloader', 0.8, {height : 0, ease: Power4.easeInOut})
        }});
        if(app.mobile){
          
        }else{
          app.tabs.dash = {
            x : document.querySelector('.text h2 .dash').getClientRects()[0].x,
            y : document.querySelector('.text h2 .dash').getClientRects()[0].y
          };
          app.tabs.ux.x = document.querySelector('.text h2 .ux').getClientRects()[0].x;
          app.tabs.ux.y = document.querySelector('.text h2 .ux').getClientRects()[0].y;          
          app.tabs.ui.x = document.querySelector('.text h2 .ui').getClientRects()[0].x,
          app.tabs.ui.y = document.querySelector('.text h2 .ui').getClientRects()[0].y;          
          app.tabs.lab.x = document.querySelector('.text h2 .lab').getClientRects()[0].x,
          app.tabs.lab.y = document.querySelector('.text h2 .lab').getClientRects()[0].y;
          TweenMax.to(document.querySelectorAll('.text h2 span:not(.'+c+'):not(.dash) i'), 0.3, {y : '100%', ease: Power4.easeIn, onComplete : function(){  
            TweenMax.to(document.querySelectorAll('.text span:not(.'+c+'):not(.dash)'), 0.25, {color : '#fff'});
            TweenMax.to('.text h2 .dash', 0.8, {css : {transform : 'translateX(-'+(app.tabs.dash.x - (app.mobile ? 20 : 70))+'px)'}, ease: Power2.easeInOut, onComplete : function(){
              var m;
              if(c == 'ui'){
                m = window.innerWidth * 0.085;
              }else if(c == 'lab'){
                m = window.innerWidth * 0.17;
              }else{
                m = 0;
              }          
              TweenMax.to(this.target, 0.4, {y: -(app.tabs.dash.y - (app.mobile ? 65 : 175) - m), ease: Power4.easeInOut, onComplete : function(){
                app.$store.commit('process', {
                  name: 'tabsanimated',
                  value: false
                });
                app.tabs.current.showText = true;
                app.tabs.current.show = true;            
                TweenMax.set('.tab-description', {display : 'block'});            
                TweenMax.set(['.tab-description__link_border', '.process .tab-description__close i.l', '.process .tab-description__close i.r'], {left : 0, right : 'auto'});
                TweenMax.fromTo(['.tab-description__link_border', '.process .tab-description__close i.l', '.process .tab-description__close i.r'], 0.7, {width : '0'}, {width : '100%', ease: Power4.easeIn, onComplete : function(){
                  TweenMax.to('.process .tab-description__close i.l', 0.4, {rotationZ : 45, ease: Power3.easeIn});              
                  TweenMax.to('.process .tab-description__close i.r', 0.4, {rotationZ : -45, ease: Power3.easeIn});
                }});
                TweenMax.staggerFromTo(document.querySelectorAll('.tab-description__link span'), 0.15, {opacity : 0,  y:150, scale : 0, rotationY: 45, rotationZ:-45}, {opacity : 1,  y:0, scale : 1, rotationY: 0, rotationZ:0, ease: Power3.easeInOut}, 0.03);
              }});
              TweenMax.to(['.text .ux i', '.text .ui i', '.text .lab i'], 0.37, {y : '0%', ease: Power3.easeIn, delay : 0.27});
            }});
            TweenMax.to('.text h2 .ux', 0.8, {css : {transform : 'translateX(-'+(app.tabs.ux.x - (app.mobile ? 20 : 70) - (window.innerWidth * 0.12))+'px)'}, ease: Power4.easeInOut, onComplete : function(){
              TweenMax.to(this.target, 0.4, {y: -(app.tabs.dash.y - (app.mobile ? 65 : 175)), ease: Power4.easeInOut})
            }});
            TweenMax.to('.text h2 .ui', 0.8, {css : {transform : 'translateX(-'+(app.tabs.ui.x - (app.mobile ? 20 : 70) - (window.innerWidth * 0.11))+'px)'}, ease: Power4.easeInOut, onComplete : function(){
              TweenMax.to(this.target, 0.4, {y: -(app.tabs.dash.y - (app.mobile ? 65 : 175) - (window.innerWidth * 0.085)), ease: Power4.easeInOut})
            }});
            TweenMax.to('.text h2 .lab', 0.8, {css : {transform : 'translateX(-'+(app.tabs.lab.x - (app.mobile ? 20 : 70) - (window.innerWidth * 0.11))+'px)'}, ease: Power4.easeInOut, onComplete : function(){
              TweenMax.to(this.target, 0.4, {y: -(app.tabs.dash.y - (app.mobile ? 65 : 175) - (window.innerWidth * 0.17)), ease: Power4.easeInOut})
            }});
          }});
          TweenMax.to(['.text .dash', '.text h2 .'+c], 0.15, {color : '#2af8eb'});  
        }
      }
    },
    closeTabs: function(e) {
      const app = this;
      let c = app.currentTab;
      app.$store.commit('process', {
        name: 'tabsanimated',
        value: true
      });
      if(app.mobile){

      }else{        
        TweenMax.to(document.querySelectorAll('.process .tab-description__close i'), 0.4, {rotationZ : 0, ease: Power3.easeInOut, onComplete : function(){
          app.$refs.scrollbar.leave();
          TweenMax.set(document.querySelectorAll('.process .tab-description__close i'), {right : 0, left : 'auto'});
          TweenMax.set('.process .tab-description__link_border', {right : 0, left : 'auto'});
          TweenMax.to(document.querySelectorAll('.process .tab-description__close i'), 0.6, {width : '0%', ease: Power3.easeInOut})
          TweenMax.to('.process .tab-description__link_border', 0.5, {width : '0%', ease: Power2.easeIn});        
          TweenMax.staggerTo(document.querySelectorAll('.tab-description__link span'), 0.15, {opacity : 0,  y:150, scale : 0, rotationY: 45, rotationZ:-45, ease: Power1.easeOut}, 0.03);          
          TweenMax.to(document.querySelectorAll('.text h2.l2 span:not(.'+app.currentTab+'):not(.dash) i, .text h2.r2 span:not(.'+app.currentTab+'):not(.dash) i'), 0.37, {y : '100%', ease: Power3.easeIn});
          TweenMax.to(document.querySelectorAll('.text h2 span'), 0.4, {y: 0, ease: Power4.easeInOut, delay : 0.5, onComplete : function(){
            TweenMax.to('.preloader', 0.8, {height : (app.mobile ? 60 : 90), ease: Power4.easeInOut, onComplete : function(){
              TweenMax.to('.g-pager div', 0.3, {x : '0%', ease: Power4.easeInOut});  
              TweenMax.to(document.querySelectorAll('.go-tonext span'), 0.3, {y : '0%', ease: Power4.easeInOut});
            }});
            TweenMax.to(document.querySelectorAll('.text .left span'), 0.5, {color : '#fff', ease: Power1.easeInOut});
            TweenMax.to(document.querySelectorAll('.text .right span'), 0.5, {color : '#2af8eb', ease: Power1.easeInOut});
            TweenMax.to(document.querySelectorAll('.text h2 span'), 0.8, {css : {transform : 'translateX(0px)'}, ease: Power2.easeInOut, onComplete : function(){                        
              TweenMax.to(document.querySelectorAll('.text h2 span i'), 0.3, {y : '0%', ease: Power3.easeInOut, onComplete : function(){              
                app.tabs.current.showText = false;
                app.tabs.current.show = false;
                app.mouseMove = true;
                app.$store.commit('process', {
                  name: 'tabsActive',
                  value: false
                });
                app.$store.commit('process', {
                  name: 'tabsanimated',
                  value: false
                });
                app.$store.commit('set', {
                  name: 'cursorLongAnimatePermit',
                  value: true
                });
                app.$store.commit('set', {
                  name: 'scroll',
                  value: true
                });                
              }});
            }});
          }})
        }}); 
      }
    },
    hoverLinks: function(e){
      var app = this;      
      if(e.type == 'mouseenter'){        
        TweenMax.to('.cursor-ring', 0.2, {scale : 1.5});
        TweenMax.to('.progress-ring__circle', 0.2, {stroke : app.cursorHoverColor});
      }else{        
        TweenMax.to('.cursor-ring', 0.2, {scale : 1});
        TweenMax.to('.progress-ring__circle', 0.2, {stroke : app.cursorColor});
      } 
    }    
  },
  transition : {
    mode : 'out-in',
    css : false,
    enter : function(el, done){      
      const app = this;      
      app.$store.commit('set', {
        name: 'page',
        value: 'process'
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
        name: 'cursorLongAnimate',
        value: false
      });
      app.$store.commit('set', {
        name: 'cursorLongAnimatePermit',
        value: true
      });
      app.$store.commit('set', {
        name: 'scroll',
        value: true
      });
      TweenMax.set('.main-bg', {backgroundColor : '#000000', height : '100%', width : 0, x : 0});
      TweenMax.set('#app-process .text', {visibility:'hidden'});
      TweenMax.to('.preloader span', 1.3, {y : 50});
      TweenMax.to('.main-bg', 0.7, {width : '100%', ease: Power3.easeIn});
      TweenMax.to('.main-bg', 0.7, {css : {transform : 'translateX(-50vw)'}, ease: Power3.easeIn});
      TweenMax.to('.preloader', 0.7, {backgroundColor : '#ffffff', ease: Power3.easeIn, onComplete : function(){
        app.$store.commit('set', {
          name: 'pager',
          value: '02'
        });
        TweenMax.set('#app', {backgroundColor : '#000000'});
        TweenMax.set('.main-bg', {backgroundColor : 'transparent', width : 0, height : 0});
        TweenMax.set('#app-process .text', {visibility:'visible'});        
        document.querySelector('.text .l2').style.textAlign = 'right';
        document.querySelector('.text .r2').style.textAlign = 'right';

        TweenMax.to('.progress-ring__circle', 0.6, {strokeDashoffset : 0, ease: Power2.easeIn, onComplete : function(){
          TweenMax.set([document.querySelectorAll('.dda span'), document.querySelectorAll('.go-tonext span')], {css : {'transition-duration' : '0.9s'}});          
          TweenMax.to('.progress-ring__circle', 0.2, {stroke : app.$store.state.cursorColor});
          TweenMax.to('.cursor-ring', 0.2, {scale : 1});
        }});
        TweenMax.fromTo('.text .l1, .text .l3', 1.5, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(-100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.fromTo('.text .r1, .text .r3', 1.5, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(-100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(15deg) skewX(15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.fromTo('.text .l2, .text .l4', 1.5, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut});
        TweenMax.fromTo('.text .r2, .text .r4', 1.5, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(100vw)', opacity : '0'}}, {opacity : 1, css : {transform : 'rotate(15deg) skewX(15deg) translateX(0)', opacity : '1'},ease: Power4.easeOut, onComplete : function(){
          app.$store.commit('process', {
            name: 'tabsanimated',
            value: false
          });
        }});

        TweenMax.set([document.querySelectorAll('.dda span'), document.querySelectorAll('.go-tonext span')], {css : {'letter-spacing': '0px', 'transition-timing-function': 'cubic-bezier(0.23, 1, 0.32, 1)'}});
        TweenMax.to('.preloader', 0.7, {height: (app.mobile ? 60 : 90), y : (app.mobile ? -50 : -70), ease: Power3.easeOut, onComplete : function(){
          app.$store.commit('set', {
            name : 'transitionPage',
            value : false
          });
          app.$store.commit('set', {
            name : 'scroll',
            value : true
          });
          app.$store.commit('set', {
            name : 'firstPage',
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
      }});
    },
    leave : function(el, done){
      const app = this;
      app.$store.commit('set', {
        'name': 'transitionPage',
        value: true
      });
      if(app.$store.state.process.tabsActive){
        TweenMax.staggerTo(['.dash', '.ux', '.ui', '.lab'], 0.3, {y : -300, opacity : 0, ease: Power3.easeOut}, 0.1);
        TweenMax.to('.tab-description', 1, {x : 500, opacity : 0, ease: Power3.easeOut});
        TweenMax.to('.g-pager div', 0.3, {x : '0%', ease: Power4.easeInOut});  
        TweenMax.to(document.querySelectorAll('.go-tonext span'), 0.3, {y : '0%', ease: Power4.easeInOut});
      }else{
        TweenMax.to('.text .l1, .text .l3', 0.6, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(-100vw)'},ease: Power2.easeIn});
        TweenMax.to('.text .r1, .text .r3', 0.6, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(-100vw)'},ease: Power2.easeIn});
        TweenMax.to('.text .l2, .text .l4', 0.6, {css : {transform : 'rotate(-15deg) skewX(-15deg) translateX(100vw)'},ease: Power2.easeIn});
        TweenMax.to('.text .r2, .text .r4', 0.6, {css : {transform : 'rotate(15deg) skewX(15deg) translateX(100vw)'},ease: Power2.easeIn});
      }
      TweenMax.set([document.querySelectorAll('.dda span'), document.querySelectorAll('.go-tonext span')], {css : {'letter-spacing': (app.mobile ? '10px' : '20px'), 'transition-timing-function' : 'cubic-bezier(0.505, 0.000, 0.735, 0.425)'}});
      TweenMax.to('.preloader', 0.7, {y : 0, height : '100%', ease: Power3.easeIn, onComplete : function(){
        done();        
      }});
    }
  }
};
</script>

<style scope>
#app-process {
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
.text li .text-wrapper {
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
.text li.left .text-wrapper h2 {
    color: #2af8eb;
    transform: rotate(-15deg) skewX(-15deg) translateX(0px);
    
}
.text li.right .text-wrapper h2 {
    color: #000;
    transform: rotate(15deg) skewX(15deg) translateX(0px);
}
.process .text {
  z-index: 2;  
}
.process .text li .text-wrapper {
  padding: 12vw 0 0 0;
}
.process .text.portrait li .text-wrapper {
  padding: 20vw 0 0 0; 
}
.process .text-wrapper h2 {  
  transition: color 250ms ease;
  width: 85%;  
  padding-left: 0;
  padding-right: 0; 
  margin-bottom: 6vw;
}
.process .text-wrapper h2 span {  
  margin-right: 2.5vw;
  display: inline-block;
  overflow: hidden;
}
.process .text-wrapper h2 span i {
  font-style: normal;
  display: inline-block;
  padding: 0 0.4vw;
}
.process .text span.ux,
.process .text span.ui,
.process .text span.lab {
  cursor: pointer;
}
.process .text-wrapper h2 span:last-child {
  margin-right: 0;
}
.process .text li.left .text-wrapper h2 {
    color: #fff;    
}
.process .text li.right .text-wrapper h2 {
    color: #2af8eb;    
}
.process .span-hover .text li.left .text-wrapper h2 {
    color: #292929;    
}
.process  .span-hover .text li.right .text-wrapper h2 {
    color: #292929;    
}
.process .text li.left .text-wrapper h2 .current {
    color: #fff;
}
.process .text li.right .text-wrapper h2 .current {
    color: #2af8eb;
}
.process .tab-description {
    position: fixed;
    top: 200px;
    left: 50%;
    width: calc(100vw / 2 - 140px);    
    z-index: 3;
    
}
.process .tab-description__text {
    font-size: 18px;
    line-height: 30px;
    color: #bababa;
    perspective: 400px;
    max-height: calc(100vh - 200px - 130px);
    margin-left: -50px;
    font-weight: 300;
}
.vue-scrollbar__wrapper {
  max-height: calc(100vh - 200px - 130px);
}
.process .tab-description__text span {
  display: inline-block;
}
.process .tab-description__link {
  position: fixed;
  bottom: 63px;
  display: none!important;

}
.process .tab-description__link a {
  font-size: 18px;
  line-height: 30px;
  color: #fff;
  display: inline-block;
  overflow: hidden;
}
.process .tab-description__link_border {
  display: block;
  height: 1px;
  width: 100%;
  background-color: #90f8eb;
  position: absolute;
  left: 0;  
  bottom: 0;
}
.process .tab-description__link a span {
  display: inline-block;
}
.process .tab-description__close {
  width: 42px;
  height: 42px;  
  position: fixed;
  top: 165px;
  right: 70px;
  cursor: pointer;
}
.process .tab-description__close i {
  display: block;
  height: 1px;
  width: 42px;
  background-color: #fff;
  position: absolute;
  left: 0px;
  top: 50%;
}
.process .portrait .tab-description__close {
    top: calc(13.7vw + 230px);
    right: 25px;
  }
  
  .process .tab-description.portrait {
    width: calc(100vw - 90px);
    left: 25px;
    top: calc(13.7vw + 260px);
  }
  .process .portrait .tab-description__text,
  .process .portrait .vue-scrollbar__wrapper {
    max-height: calc(100vh - 290px);
  }
@media screen and (max-width: 800px) {
  .process .text li .text-wrapper {
    padding: 9vw 0 0 0;
  }
  .process .text.portrait li .text-wrapper {
    padding-top: calc(50vh - (12.7vw * 2) - 6vw);
  }
  .process .text.portrait .text-wrapper h2 {
    font-size: 13.7vw;
    line-height: 11.2vw;
    width: 90%;
  }
  .process .tab-description__close {
    top: 65px;
    right: 25px;
    width: 20px;
    height: 20px;
  }
  .process .portrait .tab-description__close {
    top: calc(13.7vw + 147px);
  }
  .process .tab-description {
    top: 85px;
    width: calc(100vw / 2 - 50px);
  }
  .process .tab-description.portrait {
    width: calc(100vw - 90px);
    left: 25px;
    top: calc(13.7vw + 160px);
  }
  .process .portrait .tab-description__text,
  .process .portrait .vue-scrollbar__wrapper {
    max-height: calc(100vh - 290px);
  }
  .process .tab-description__text {
    max-height: calc(100vh - 140px);
  }
  .vue-scrollbar__wrapper {
    max-height: calc(100vh - 140px);
  }
  .process .tab-description__text {
    font-size: 16px;
    line-height: 24px;    
  }
}
</style>
