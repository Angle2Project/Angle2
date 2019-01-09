<template>
  <div id="app-projects-reactivate">
    <!-- begin hero  -->
    <div class="hero">
      <div class="contr">
        <div class="contr__inner">
          <div class="hero__label">
            <img src="~assets/img/projects/reaktive.jpg" alt="" />
            <img
              src="~assets/img/projects/label-reaktivate.png"
              class="hero__label-abs offset-left"
              alt=""
            />
            <a href="#" class="hero__allprojects">all projects</a>
          </div>
          <div class="descr">
            <div class="descr__block">
              <h5 class="descr__title">Output</h5>
              <p class="descr__text">Promo-Website</p>
            </div>
            <div class="descr__block">
              <h5 class="descr__title">creative fields</h5>
              <p class="descr__text">
                UI/UX, Strategy, Interaction Design, Animation
              </p>
            </div>
            <div class="ml-auto offset-right">
              <a href="#" class="btn-full">View site</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end hero -->
    <div class="quick-words">
      <div class="contr">
        <div class="descr">
          <div class="descr__block">
            <h5 class="descr__title">quick words</h5>
            <p class="descr__text">
              Promotional website for agency that develops the Mobile Apps. The
              project has a simple idea, it is to show the unity of style only
              when interacting. Also, this unusual interaction helps to better
              involve and immerse in the agency's cases.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="section-with-bg">
      <div class="bg-absolute"><img src="~assets/img/projects/reaktive.jpg" alt="" /></div>
      <div class="contr"><img src="~assets/img/projects/pulser.jpg" alt="" /></div>
    </div>
    <!-- Carousel -->
    <!-- <div class="carousel" id="carouselProject">
      <div class="slide"><img src="~assets/img/projects/carousel/slide1.jpg" alt="" /></div>
      <div class="slide"><img src="~assets/img/projects/carousel/slide2.jpg" alt="" /></div>
      <div class="slide"><img src="~assets/img/projects/carousel/slide3.jpg" alt="" /></div>
      <div class="slide"><img src="~assets/img/projects/carousel/slide1.jpg" alt="" /></div>
      <div class="slide"><img src="~assets/img/projects/carousel/slide2.jpg" alt="" /></div>
    </div> -->

    <!-- Slider main container -->
    <div class="swiper-container carousel">
        <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
          <!-- Slides -->
        <div class="swiper-slide">
          <img src="~assets/img/projects/carousel/slide1.jpg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="~assets/img/projects/carousel/slide2.jpg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="~assets/img/projects/carousel/slide3.jpg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="~assets/img/projects/carousel/slide1.jpg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="~assets/img/projects/carousel/slide2.jpg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="~assets/img/projects/carousel/slide3.jpg" alt="" />
        </div>
      </div>        
    </div>

    <div class="fullwidth-section">
      <div class="contr">
        <p class="descr__text">Interactions</p>
        <img src="~assets/img/projects/pulser.jpg" alt="" />
      </div>
    </div>
    <div class="section-about">
      <div class="section-about__header">
        <div class="bg-absolute"><img src="~assets/img/projects/reaktive.jpg" alt="" /></div>
      </div>
      <div class="contr"><img src="~assets/img/projects/pulser-about.jpg" alt="" /></div>
    </div>
    <div class="mobile-section">
      <div class="contr">
        <div class="mobile-section__circle">
          <p class="descr__text">Mobile version</p>
          <div class="samples">
            <div class="samples__left">
              <img src="~assets/img/projects/mobile-samples.png" alt="" />
            </div>
            <div class="samples__right">
              <img src="~assets/img/projects/mobile-stat.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="next-project">
      <div class="contr">
        <div class="next-project__row">
          <div class="next-project__left">
                <h5 class="descr__title">client</h5>
                <p class="descr__text">FLOSTON</p>
          </div>
          <div class="next-project__right">
            <img src="~assets/img/projects/next-project.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  

</template>

<script>
import Scrollbar from 'smooth-scrollbar';
import Swiper from 'swiper';
export default {
    mounted : function () {
      const app = this;
      console.log(Swiper);
      Scrollbar.init(document.querySelector('#app-projects-reactivate'), {
        //alwaysShowTracks: true
      });
      var mySwiper = new Swiper ('.swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        speed: 600
      })
    },    
    data: function(){
      return {

      }
    },
    computed : {          
      
    },
    watch: {
      
    },
    methods : {
       
    },
  transition : {
    mode : 'out-in',
    css : false,
    enter : function(el, done){
      TweenMax.set('#app', {backgroundColor : '#1d1d1d'});
      done();
    },
    leave : function(el, done){
      done();
    }
  }
}
</script>

<style lang="scss">
.swiper-container {
    width: 100%;
    height: 300px;
}
.swiper-slide {
  padding: 0 22.5px;
  width: 658px !important;
  max-width: 100vw;
  outline: none;
}
#app-projects-reactivate {
  height: 100%;
}
.contr {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  @media only screen and (max-width: 1000px) {
    padding: 0 15px;
  }
}

.bg-absolute {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: grey;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
  }
}
.hero > .contr {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0;
  .contr__inner {
    z-index: 1;
  }
  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100%;
    background-color: #fff;
    z-index: 0;
  }
}
.hero .descr {
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    margin: 0 15px;
  }
}
.hero__label {
  position: relative;
}
.hero__label-abs {
  position: absolute;
  left: 0;
  top: 70px;
}
.hero__allprojects {
  position: relative;
  font-size: 10px;
  text-transform: uppercase;
  color: #1d1d1d;
  @media only screen and (min-width: 1180px) {
    position: absolute;
    left: -70px;
    top: 70px;
    transform: rotate(-90deg) translateX(-70px);
    transform-origin: left;
  }
  &:after {
    content: '';
    position: absolute;
    right: -25px;
    top: 0;
    bottom: 0;
    width: 0;
    display: inline-block;
    height: 0;
    border-style: solid;
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent #212121 transparent;
  }
  @media only screen and (max-width: 1180px) {
    display: inline-block;
    margin-top: 20px;
    padding-left: 12px;
    font-weight: 700;
  }
}
.descr {
  display: flex;
  padding: 54px 0;
  color: #212121;
  background-color: #fff;
  .descr__block {
    margin-bottom: 20px;
    &:not(:last-child) {
      margin-right: 83px;
    }
  }
}
.descr__title {
  font-size: 10px;
  text-transform: uppercase;
  line-height: 1.2;
  margin-bottom: 7px;
}
.descr__text {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.67;
}
.btn-full {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 203px;
  height: 70px;
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  color: #212121;
  background-color: #90f8eb;
}
.ml-auto {
  margin-left: auto;
}
.quick-words {
  margin: 70px 0 130px;
  .descr {
    padding-left: 13.8%;
    padding-right: 13%;
  }
}
.section-with-bg {
  padding: 134px 0;
}
.section-with-bg,
.section-about,
.mobile-section {
  display: flex;
  flex-direction: column;
  position: relative;
  & > .contr {
    z-index: 1;
  }
}
.fullwidth-section {
  margin: 100px 0;
  .descr__text {
    margin-bottom: 70px;
  }
}
.section-about__header {
  position: relative;
  height: 643px;
  margin-bottom: -528px;
}
.carousel {
  margin: 100px 0;
}
#carouselProject .slick-slide {
  padding: 0 22.5px;
  width: 658px !important;
  max-width: 100vw;
  outline: none;
}
.mobile-section {
  margin: 120px 0;
  .descr__text {
    margin-bottom: 100px;
  }
}
.mobile-section__circle {
  position: relative;
  width: 100%;
  height: 100%;
  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    top: 30px;
    right: 0;
    margin: auto;
    width: 87%;
    height: 87%;
    border-radius: 50%;
    background-color: #000;
    z-index: -1;
  }
  
}
.samples {
  display: flex;
  justify-content: space-between;
}
.samples__left {
  margin-right: 80px;
}
.samples__right {
  margin-top: 320px;
}
@media only screen and (max-width: 992px) {
.mobile-section {
margin: 100px 0;
}
  .samples {
    flex-direction: column;
  }
  .samples__left {
    margin-right: 0;
  }
  .samples__right {
    margin-top: 50px;
  }
.mobile-section__circle:before {
  width: 90vw;
  height: 90vw; 
}
}
// Next project
.next-project {
  padding: 165px 0;
  background-color: #1c2434;
@media only screen and (max-width: 992px) {
  padding: 100px 0;
}
@media only screen and (max-width: 580px) {
  padding: 60px 0;
}
}
.next-project__left {
  margin-right: 20px;
  max-width: 150px;
}
.next-project__row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .next-project__left {
      max-width: auto;
      order: 2;
      margin-top: 50px;
    }
  }
}

</style>

