<template>
  <div id="app-contacts" :class="{portrait: mobile, thankyou: thankYou }">
    <ul class="contacts__title">
      <li data-type="title">
        <div class="left">
          <h1>
            <span v-html="title"></span>
          </h1>
        </div>
        <div class="right">
          <h1>
            <span v-html="title"></span>
          </h1>
        </div>
      </li>
      <li data-type="thankyou">
        <div class="left">
          <h1>
            <span v-html="thankYouTitle"></span>
          </h1>
        </div>
        <div class="right">
          <h1>
            <span v-html="thankYouTitle"></span>
          </h1>
        </div>
      </li>
    </ul>
    <form
      action="https://getsimpleform.com/messages?form_api_token=f0a718c17dd9cd16c17730eae1104cd9"
      method="post"
      @submit="formSubmit"
    >
      <article class="contacts__wrapper">
        <div class="contacts__wrapper_side">
          <ul class="contacts__wrapper_side-list">
            <li>
              <h2>
                <span>Our phone</span>
              </h2>
              <div class="contacts__wrapper_side-info">
                <span>+380 63 349 6219</span>
              </div>
            </li>
            <li>
              <h2>
                <span>Our email</span>
              </h2>
              <div class="contacts__wrapper_side-info">
                <span>hi@angle2.com</span>
              </div>
            </li>
            <!--li>
                <h2>
                  <span>Our skype</span>
                </h2>
                <div class="contacts__wrapper_side-info">
                  <span>lazey.lazey</span>
                </div>
            </li-->
          </ul>
        </div>
        <div class="contacts__wrapper_side form">
          <div class="contacts__from-name">
            <div class="contacts__from-input">
              <label>
                <span class="text">{{form.name.text}}</span>
                <span class="error">{{form.name.errorText}}</span>
              </label>
              <input type="text" @focus="inputFocusBlur" @blur="inputFocusBlur" name="name">
              <i></i>
            </div>
          </div>
          <div class="contacts__from-mail">
            <div class="contacts__from-input">
              <label>
                <span class="text">{{form.email.text}}</span>
                <span class="error">{{form.email.errorText}}</span>
              </label>
              <input type="email" @focus="inputFocusBlur" @blur="inputFocusBlur" name="email">
              <i></i>
            </div>
          </div>
          <div class="contacts__from-message">
            <label>
              <span class="text">{{form.msg.text}}</span>
              <span class="error">{{form.msg.errorText}}</span>
            </label>
            <textarea @focus="textareaFocusBlur" @blur="textareaFocusBlur"></textarea>
            <i></i>
          </div>
          <div class="contacts__from-send">
            <button @mouseenter="hoverLinks" @mouseleave="hoverLinks">
              <div>
                <span>Send</span>
              </div>
            </button>
            <i></i>
          </div>
        </div>
        <aside class="contacts__thankyou">
          <h3>
            <span>We will contact you shortly!</span>
          </h3>
          <div class="contacts__thankyou_link" @mouseenter="hoverLinks" @mouseleave="hoverLinks">
            <nuxt-link to="/">
              <span>Go home</span>
            </nuxt-link>
            <i></i>
          </div>
        </aside>
      </article>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  mounted: function() {},
  data: function() {
    return {
      title: "Let's meet",
      thankYou: false,
      thankYouTitle: "thank you",
      form: {
        name: {
          text: "Your name",
          error: false,
          errorText: "Enter your name"
        },
        email: {
          text: "Your e-mail",
          error: false,
          errorText: "Enter your email"
        },
        msg: {
          text: "Type your message",
          error: false,
          errorText: "Enter your message"
        }
      }
    };
  },
  computed: {
    firstPage: function() {
      return this.$store.state.firstPage;
    },
    mobile: function() {
      return this.$store.state.mobile;
    },
    touch: function() {
      return this.$store.state.touch;
    },
    cursorColor: function() {
      return this.$store.state.cursorColor;
    },
    cursorHoverColor: function() {
      return this.$store.state.cursorHoverColor;
    }
  },
  methods: {
    inputFocusBlur : function(e){
      var app = this;
      var target = e.currentTarget;
      var name = target.name;      
      if(e.type == 'focus'){
        console.log(app.form[name].error);
        if(app.form[name].error){          
          TweenMax.to(target.parentNode.querySelector('i'), 0.5, {backgroundColor : '#000000'});          
          TweenMax.to(target.parentNode.querySelector('.error'), 0.5, {y : '100%', ease: Power3.easeOut});
          app.form[name].error = false;
        }else{
          if(!target.value.trim().length)TweenMax.to(target.parentNode.querySelector('.text'), 0.2, {y : '100%'});
        }        
      }else if(e.type == 'blur'){
        if(app.form[name].error){
          if(!target.value.trim().length)TweenMax.to(target.parentNode.querySelector('.text'), 0.2, {y : '0%'});
        }else{
          if(!target.value.trim().length)TweenMax.to(target.parentNode.querySelector('.text'), 0.2, {y : '0%'});
        }
        
      }
    },
    textareaFocusBlur : function(e){
      var app = this;
      var target = e.currentTarget;
      if(e.type == 'focus'){
        if(app.form.msg.error){
          TweenMax.to(target.parentNode.querySelector('i'), 0.5, {backgroundColor : '#000000'});          
          TweenMax.to(target.parentNode.querySelector('.error'), 0.5, {y : '100%', ease: Power3.easeOut});
          TweenMax.to(target.parentNode, 0.2, {height : 90});
          app.form.msg.error = false;
        }else{
          if(!target.value.trim().length){
            TweenMax.to(target.parentNode, 0.2, {height : 90});
            TweenMax.to(target.parentNode.querySelectorAll('.text'), 0.2, {y : '100%'});
          }
        }        
      }else if(e.type == 'blur'){
        if(!target.value.trim().length){
          TweenMax.to(target.parentNode, 0.2, {height : 45});
          TweenMax.to(target.parentNode.querySelectorAll('.text'), 0.2, {y : '0%'});
        }        
      }
    },
    // mousewheel : function(e){
    //   console.log(e.deltaY);
    //   if(e.deltaY > 0){
    //     e.target.scrollTop += 50;
    //   }else{
    //     e.target.scrollTop -= 50;
    //   }
    // },
    hoverLinks : function(e){
      var app = this;      
      if(e.type == 'mouseenter'){        
        TweenMax.to('.cursor-ring', 0.2, {scale : 1.5});
        TweenMax.to('.progress-ring__circle', 0.2, {stroke : '#2af8eb'});
      }else{        
        TweenMax.to('.cursor-ring', 0.2, {scale : 1});
        TweenMax.to('.progress-ring__circle', 0.2, {stroke : '#b6b6b6'});
      }      
    },
    formSubmit : function(e){
      var app = this;      
      e.preventDefault();      
      var name = e.target.querySelector('input[name="name"]').value.trim();
      var email = e.target.querySelector('input[name="email"]').value.trim();
      var msg = e.target.querySelector('textarea').value.trim();
      var x = document.querySelector('.contacts__title li[data-type="title"] h1 span').parentNode.clientWidth;
      var th = document.querySelector('.contacts__title li[data-type="thankyou"] h1 span');      
      if(!name.length){
        TweenMax.to('.contacts__from-name i', 0.5, {backgroundColor : '#ff0000'});
        TweenMax.set('.contacts__from-name .error', {y : '100%', display : 'block'});
        TweenMax.to('.contacts__from-name .text', 0.5, {y : '100%', ease: Power3.easeInOut});
        TweenMax.to('.contacts__from-name .error', 0.5, {y : '0%', ease: Power3.easeInOut});
        app.form.name.error = true;
      }
      if(!email.length){
        TweenMax.to('.contacts__from-mail i', 0.5, {backgroundColor : '#ff0000'});
        TweenMax.set('.contacts__from-mail .error', {y : '100%', display : 'block'});
        TweenMax.to('.contacts__from-mail .text', 0.5, {y : '100%', ease: Power3.easeInOut});
        TweenMax.to('.contacts__from-mail .error', 0.5, {y : '0%', ease: Power3.easeInOut});
        app.form.email.error = true;
      }
      if(!msg.length){
        TweenMax.to('.contacts__from-message i', 0.5, {backgroundColor : '#ff0000'});
        TweenMax.set('.contacts__from-message .error', {y : '100%', display : 'block'});
        TweenMax.to('.contacts__from-message .text', 0.5, {y : '100%', ease: Power3.easeInOut});
        TweenMax.to('.contacts__from-message .error', 0.5, {y : '0%', ease: Power3.easeInOut});
        app.form.msg.error = true;
      }
      if(!name.length || !email.length || !msg.length)return false;      
      //app.scrollTop(app.$el, 0, 200);
      TweenMax.set(document.querySelectorAll('.contacts__title li[data-type="thankyou"]'), {visibility : 'visible'});
      TweenMax.to(document.querySelectorAll('.contacts__title li[data-type="title"] h1 span'), 1.5, {x : x, ease: Power4.easeInOut});
      TweenMax.fromTo(document.querySelectorAll('.contacts__title li[data-type="thankyou"] h1 span'), 1.5, {x : -(th.clientWidth+100)}, {x : 0, ease: Power4.easeInOut, onComplete : function(){
        TweenMax.to(document.querySelectorAll('.contacts__title li:not([data-type="thankyou"]) h1 span'), 1, {opacity : 0});
      }});
      TweenMax.to(['.contacts__wrapper_side'], 1, {opacity : 0, onComplete : function(){
        TweenMax.set(['.contacts__wrapper_side.form'], {display : 'none'});
        TweenMax.set('.contacts__thankyou', {display : 'block'});
        TweenMax.set(['.contacts__thankyou h3 span', '.contacts__thankyou_link a span'], {y : '100%'});
        TweenMax.to('.contacts__thankyou h3 span', 0.5, {y : '0%'});
        TweenMax.to('.contacts__thankyou_link i', 0.5, {width : '100%', onComplete : function(){
          TweenMax.to('.contacts__thankyou_link a span', 0.5, {y : '0%'});
          app.thankYou = true;
        }});
      }});

      
      
      
      var data = {
        Name : name,
        Email : email,
        Message : msg
      };
      axios({
        method: 'post',
        url: 'http://getsimpleform.com/messages/ajax?form_api_token=f0a718c17dd9cd16c17730eae1104cd9',
        headers: { 
          'Access-Control-Allow-Credentials': 'true',
          'Cache-Control': 'must-revalidate, private, max-age=0',
          'Connection': 'keep-alive',
          'Content-Type': 'text/javascript; charset=utf-8',
          'Transfer-Encoding': 'chunked',
          'X-Rack-Cache': 'miss',                  
          'X-UA-Compatible': 'IE=Edge,chrome=1'
        },
        responseType : 'json',
        params: data
      });          
      // app.$http.jsonp('http://getsimpleform.com/messages/ajax?form_api_token=f0a718c17dd9cd16c17730eae1104cd9', {params : data, method : 'POST'}).then(function(response){        
        
      // }, function(response){
        
      // });
      
    },
  },
  transition: {
    mode: "out-in",
    css: false,
    enter: function(el, done) {
      const app = this;      
      //var app = this.$store.state.pageModule;

      app.$store.commit("set", {
        name: "page",
        value: "contacts"
      });
      app.$store.commit("set", {
        name: "cursorColor",
        value: "#b6b6b6"
      });
      app.$store.commit("set", {
        name: "cursorHoverColor",
        value: "#2af8eb"
      });
      app.$store.commit('set', {
        name: 'cursorLongAnimatePermit',
        value: false
      });
      if(app.$store.state.firstPage || app.$store.state.previousPage == 'index'){
        /*============= First render ========== */
        app.$store.commit('set', {
          name: 'pager',
          value: '04'
        });
        TweenMax.to('.preloader span', 1.3, {y : 50});                
        TweenMax.set('#app', {backgroundColor : '#ffffff'});
        TweenMax.set('.main-bg', {backgroundColor : 'transparent', width : 0, height : 0});        
        TweenMax.to(document.querySelectorAll(['.dda span']), 0.4, {y : 13});
        TweenMax.to(document.querySelectorAll('.go-tonext span'), 0.4, {y : 13});
        TweenMax.to('.preloader', 1.3, {height: 0, y : 0, ease: Power3.easeOut, onComplete : function(){
          TweenMax.to('.g-pager div', 0.4, {x : 0});
          TweenMax.to('.logo', 0.4, {y : 0});
          TweenMax.to('.follow-us_title span', 0.4, {y : 0, onComplete : function(){
            TweenMax.to('header .menu span', 0.3, {y : 0});
            TweenMax.staggerTo(['header .process', 'header .projects', 'header .contact', 'header .lng'], 0.3, {y : 0}, 0.1);
            TweenMax.staggerTo(['.follow-us li.be', '.follow-us li.dr', '.follow-us li.fb', '.follow-us li.ig'], 0.3, {y : 0}, 0.1);  
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
          }});
        }});              
        TweenMax.set(document.querySelectorAll(['.contacts__wrapper_side-list h2 span', '.contacts__wrapper_side-info span', '.contacts__from-send button span']), {y : '100%'});
        TweenMax.set(document.querySelectorAll(['.contacts__from-name label', '.contacts__from-mail label', '.contacts__from-message label']), {opacity : 0});
        var tl = document.querySelector('.contacts__title li[data-type="title"] h1 span');
        var th = document.querySelector('.contacts__title li[data-type="thankyou"] h1 span');
        TweenMax.set(document.querySelectorAll('.contacts__title li[data-type="thankyou"] h1 span'), {x : -(th.clientWidth+100)});
        TweenMax.set(document.querySelectorAll('.contacts__title li[data-type="thankyou"]'), {visibility : 'hidden'});
        TweenMax.staggerTo(document.querySelectorAll(['.contacts__wrapper_side-list li h2 span', '.contacts__wrapper_side-info span']), 0.3, {y : '0%', ease: Power3.easeOut, delay : 1}, 0.1, formInit);
        function formInit(){
          TweenMax.to(document.querySelectorAll(['.contacts__from-name i', '.contacts__from-mail i', '.contacts__from-message i']), 0.5, {width : '100%', onComplete : function(){
            TweenMax.to(document.querySelectorAll(['.contacts__from-name label', '.contacts__from-mail label', '.contacts__from-message label']), 0.5, {opacity : 1, onComplete : function(){

            }});            
          }})
          TweenMax.to('.contacts__from-send i', 0.5, {width : '100%', onComplete : function(){
            TweenMax.to('.contacts__from-send button span', 0.5, {y : '0%'});
          }});
        }
        TweenMax.fromTo(document.querySelectorAll('.contacts__title li[data-type="title"] h1 span'), 1.5, {x : -(tl.clientWidth+100)}, {x : 0, ease: Power4.easeOut});
      }else{
        /*============= Transition render ========== */
        TweenMax.set('.main-bg', {backgroundColor : '#ffffff', height : '100%', width : 0, x : 0});
        var tl = document.querySelector('.contacts__title li[data-type="title"] h1 span');
        var th = document.querySelector('.contacts__title li[data-type="thankyou"] h1 span');        
        TweenMax.set(document.querySelectorAll('.contacts__title li[data-type="title"] h1 span'), {x : -(tl.clientWidth+100)});
        TweenMax.set(document.querySelectorAll('.contacts__title li[data-type="thankyou"] h1 span'), {x : -(th.clientWidth+100)});
        TweenMax.set(document.querySelectorAll('.contacts__title li[data-type="thankyou"]'), {visibility : 'hidden'});
        TweenMax.set(document.querySelectorAll(['.contacts__wrapper_side-list h2 span', '.contacts__wrapper_side-info span', '.contacts__from-send button span']), {y : '100%'});
        TweenMax.set(document.querySelectorAll(['.contacts__from-name label', '.contacts__from-mail label', '.contacts__from-message label']), {opacity : 0});
        TweenMax.set([document.querySelectorAll('.dda span'), document.querySelectorAll('.go-tonext span')], {css : {'letter-spacing': (app.mobile ? '10px' : '20px'), 'transition-timing-function' : 'cubic-bezier(0.505, 0.000, 0.735, 0.425)'}});
        TweenMax.to('.main-bg', 0.7, {width : '100%', ease: Power3.easeIn});
        TweenMax.to('.main-bg', 0.7, {css : {transform : 'translateX(-50vw)'}, ease: Power3.easeIn});
        TweenMax.to('.preloader', 0.7, {backgroundColor : '#000000', ease: Power3.easeIn, onComplete : function(){
            TweenMax.set('#app', {backgroundColor : '#ffffff'});
            TweenMax.set('.main-bg', {backgroundColor : 'transparent', width : 0, height : 0});
            TweenMax.to(document.querySelectorAll('.dda span'), 0.4, {y : 13});
            TweenMax.to(document.querySelectorAll('.go-tonext span'), 0.4, {y : 13});
            TweenMax.to('.preloader', 0.7, {height: 0, y : 0, ease: Power3.easeOut});
            // app.global.currentComponent = 'contacts';
            // app.global.pager = '04';
            // app.transitionPage = false;
            // app.scroll = false;
            TweenMax.staggerTo(document.querySelectorAll(['.contacts__wrapper_side-list li h2 span', '.contacts__wrapper_side-info span']), 0.3, {y : '0%', ease: Power3.easeOut, delay : 1}, 0.1, formInit);
        function formInit(){
          TweenMax.to(document.querySelectorAll(['.contacts__from-name i', '.contacts__from-mail i', '.contacts__from-message i']), 0.5, {width : '100%', onComplete : function(){
            TweenMax.to(document.querySelectorAll(['.contacts__from-name label', '.contacts__from-mail label', '.contacts__from-message label']), 0.5, {opacity : 1, onComplete : function(){

            }});            
          }})
          TweenMax.to('.contacts__from-send i', 0.5, {width : '100%', onComplete : function(){
            TweenMax.to('.contacts__from-send button span', 0.5, {y : '0%'});
          }});
        }
        TweenMax.fromTo(document.querySelectorAll('.contacts__title li[data-type="title"] h1 span'), 1.5, {x : -(tl.clientWidth+100)}, {x : 0, ease: Power4.easeOut});
          }});          
      }
      
      
    },
    leave: function(el, done) {
      const app = this;
      app.$store.commit("set", {
        name: "transitionPage",
        value: true
      });            
      if(document.querySelector('#app-contacts').classList.contains('thankyou')){
        TweenMax.to('.preloader', 0.7, {y : 0, height : '100%', ease: Power3.easeIn, onComplete : function(){
          done();        
        }});
        var t = document.querySelector('.contacts__title li[data-type="thankyou"] h1 span');
        TweenMax.to('.contacts__thankyou', 0.5, {opacity : 0, onComplete : function(){
          TweenMax.to(document.querySelectorAll(['.dda span']), 0.4, {y : 0});
          TweenMax.to(document.querySelectorAll('.go-tonext span'), 0.3, {y : '0%', ease: Power4.easeInOut});
          TweenMax.to(document.querySelectorAll('.contacts__title li[data-type="thankyou"] h1 span'), 0.7, {x : -(t.clientWidth+100), ease: Power3.easeOut});
        }});
      }else{
        TweenMax.to('.preloader', 0.7, {y : 0, height : '100%', ease: Power3.easeIn, onComplete : function(){
          done();        
        }});
        var t = document.querySelector('.contacts__title h1 span');
        TweenMax.to(document.querySelectorAll(['.contacts__wrapper_side-list h2 span', '.contacts__wrapper_side-info span', '.contacts__from-send button span']), 0.5, {y : '100%'});
        TweenMax.to(document.querySelectorAll(['.contacts__from-name label', '.contacts__from-name input', '.contacts__from-mail label', '.contacts__from-mail input', '.contacts__from-message label', '.contacts__from-message textarea']), 0.5, {opacity : 0, onComplete : function(){
          var portrait = (window.innerWidth < window.innerHeight);
          TweenMax.to(document.querySelectorAll(['.dda span']), 0.4, {y : 0});          
          TweenMax.to(document.querySelectorAll('.go-tonext span'), 0.3, {y : '0%', ease: Power4.easeInOut});
          TweenMax.to(document.querySelectorAll(['.contacts__from-name i', '.contacts__from-mail i', '.contacts__from-message i']), 0.5, {width : '0%'})
          TweenMax.to(document.querySelectorAll('.contacts__title h1 span'), 0.7, {x : -(t.clientWidth+100), ease: Power3.easeOut});
        }});
      }        

    }
  }
};
</script>

<style scoped>
#app-contacts {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.contacts__title {
  list-style: none;
  margin: 0 -1.7vw 0 -1.7vw;
  padding-top: 120px;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
}
.contacts__title li {
  display: flex;
  position: relative;
  height: 21.3vw;
}
.contacts__title li[data-type="thankyou"] {
  margin-top: -21.3vw;
}
.contacts__title li .left {
  width: 50%;
  overflow: hidden;
  color: #2af8eb;
}
.contacts__title li .right {
  width: 50%;
  overflow: hidden;
  color: #000;
}
.contacts__title li h1 {
  font-size: 10.7vw;
  margin: 0;
  padding: 0 70px;
  line-height: 8.2vw;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: -0.45vw;
  width: 200%;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
.contacts__title li .left h1 {
  transform: translate3d(0, 0, 0) rotate(-15deg) skewX(-15deg);
}
.contacts__title li .right h1 {
  margin-left: -100%;
  transform: translate3d(0, 0, 0) rotate(15deg) skewX(15deg);
}
.contacts__title li h1 span {
  display: inline-block;
}
.contacts__wrapper {
  display: flex;
  margin: 0 70px;
  align-items: flex-start;
}
.contacts__wrapper_side {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
}
.contacts__wrapper_side.form {
  justify-content: space-between;
  padding-top: 8px;
}
.contacts__wrapper_side-list {
  list-style: none;
  margin: 0 0 0 auto;
  padding: 0;
  width: 50%;
}
.contacts__wrapper_side-list li {
  margin-bottom: 40px;
}
.contacts__wrapper_side-list li h2 {
  font-size: 10px;
  line-height: 1;
  margin: 0 0 12px 0;
  padding: 0;
  font-weight: normal;
  overflow: hidden;
}
.contacts__wrapper_side-list li h2 span {
  display: inline-block;
}
.contacts__wrapper_side-info {
  font-size: 18px;
  line-height: 1.1;
  font-weight: 300;
  overflow: hidden;
}
.contacts__wrapper_side-info span {
  display: inline-block;
}
.contacts__from-input {
  position: relative;
}
.contacts__from-name {
  width: 50%;
  padding-right: 1.73vw;
}
.contacts__from-name input {
  width: 100%;
  border: none;
  background: transparent;
  position: relative;
  z-index: 2;
  outline: none;
  height: 45px;
  font-size: 18px;
  line-height: 45px;
  font-weight: 300;
  color: #000;
}
.contacts__from-name label {
  display: block;
  font-size: 18px;
  width: 100%;
  height: 18px;
  line-height: 1;
  font-weight: 300;
  color: #979797;
  overflow: hidden;
  position: absolute;
  top: 13px;
  left: 0;
  z-index: 1;
}
.contacts__from-input label span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.contacts__from-input label span.error {
  color: #ff0000;
  display: none;
}
.contacts__from-name i {
  display: block;
  height: 1px;
  width: 0%;
  background: #000;
  position: absolute;
  left: 0;
  bottom: 0;
}
.contacts__from-mail {
  width: 50%;
  padding-left: 1.73vw;
}
.contacts__from-mail input {
  width: 100%;
  border: none;
  background: transparent;
  position: relative;
  z-index: 2;
  outline: none;
  height: 45px;
  font-size: 18px;
  line-height: 45px;
  font-weight: 300;
  color: #000;
}
.contacts__from-mail label {
  display: block;
  font-size: 18px;
  width: 100%;
  height: 18px;
  line-height: 1;
  font-weight: 300;
  color: #979797;
  overflow: hidden;
  position: absolute;
  top: 13px;
  left: 0;
  z-index: 1;
}
.contacts__from-mail label span {
  display: inline-block;
}
.contacts__from-mail i {
  display: block;
  height: 1px;
  width: 0%;
  background: #000;
  position: absolute;
  left: 0;
  bottom: 0;
}
.contacts__from-message {
  width: 83%;
  margin-top: 35px;
  position: relative;
  height: 45px;
}
.contacts__from-message label {
  display: block;
  font-size: 18px;
  width: 100%;
  height: 18px;
  line-height: 1;
  font-weight: 300;
  color: #979797;
  overflow: hidden;
  position: absolute;
  top: 13px;
  left: 0;
  z-index: 1;
}
.contacts__from-message label span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.contacts__from-message label span.error {
  color: #ff0000;
  display: none;
}
.contacts__from-message textarea {
  background: transparent;
  padding: 9px 10px 0px 0;
  font-size: 18px;
  line-height: 27px;
  font-weight: 300;
  color: #000;
  width: 100%;
  resize: none;
  border: none;
  height: 100%;
  outline: none;
  position: relative;
  z-index: 2;
  display: block;
}
.contacts__from-message i {
  display: block;
  height: 1px;
  width: 0%;
  background: #000;
  position: absolute;
  left: 0;
  bottom: 0;
}
.contacts__from-send {
  align-self: flex-end;
  position: relative;
}
.contacts__from-send button {
  width: 45px;
  height: 45px;
  background: none;
  border: none;
  color: #000;
  padding: 0;
  text-align: center;
  cursor: pointer;
}
.contacts__from-send button div {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
  overflow: hidden;
}
.contacts__from-send button span {
  display: inline-block;
}
.contacts__from-send i {
  display: block;
  height: 1px;
  width: 0%;
  background: #2af8eb;
  position: absolute;
  left: 0;
  bottom: 0;
}
.contacts__thankyou {
  display: none;
}
.contacts__thankyou h3 {
  margin: 0;
  padding: 0;
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
  overflow: hidden;
}
.contacts__thankyou h3 span {
  display: inline-block;
}
.contacts__thankyou_link {
  margin-top: 30px;
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
  display: inline-block;
  height: 45px;
  display: inline-flex;
  align-items: center;
  position: relative;
}
.contacts__thankyou_link a {
  color: #000;
  display: block;
  line-height: 1;
  overflow: hidden;
}
.contacts__thankyou_link a span {
  display: inline-block;
}

.contacts__thankyou_link i {
  display: block;
  height: 1px;
  width: 0%;
  background: #2af8eb;
  position: absolute;
  left: 0;
  bottom: 0;
}
@media screen and (max-width: 800px) {
  #app-contacts.portrait {
    overflow: auto;
    padding-bottom: 60px;
  }
  .contacts__wrapper_side-list {
    width: 100%;
  }
  .contacts__title li h1 {
    padding: 0 25px;
  }
  .portrait .contacts__title li {
    height: 23.3vw;
  }
  .portrait .contacts__title li h1 {
    font-size: 14.5vw;
    line-height: 11.2vw;
  }
  .portrait .contacts__title li[data-type="thankyou"] h1 {
    font-size: 13.7vw;
    line-height: 14.2vw;
  }
  .contacts__title {
    padding-top: 30px;
  }
  .portrait .contacts__title {
    padding-top: 60px;
    margin: 0;
  }
  .contacts__wrapper {
    margin: 20px 25px 0 25px;
  }
  .portrait .contacts__wrapper {
    flex-direction: column;
  }
  .portrait .contacts__wrapper_side {
    width: 100%;
    padding-top: 0;
  }
  .portrait .contacts__wrapper_side-list li {
    margin-bottom: 30px;
  }
  .portrait .contacts__wrapper_side.form {
    flex-direction: column;
  }
  .portrait .contacts__from-name {
    width: 100%;
    padding-right: 0;
    margin-bottom: 15px;
  }
  .portrait .contacts__from-mail {
    width: 100%;
    padding-left: 0;
  }
  .portrait .contacts__from-message {
    width: 100%;
    margin-bottom: 15px;
  }
  .portrait .contacts__from-send {
    align-self: flex-start;
  }
}
</style>


