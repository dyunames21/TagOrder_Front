<template>
  <Header/>
  <RouterView/>
</template>


<script>
import Header from './components/Header.vue';
import Footer from "@/components/Footer.vue";
import Store from "./scripts/store"
import axios from "axios";
import {watch} from "vue";
import {useRoute} from "vue-router";


export default {
  name: "App",
  components: {
    Footer,
    Header,
  },
  setup(){

    const check= ()=>{
      axios.get("/api/account/check").then(({data})=>{
        console.log(data);
        if(data) {
          Store.commit("setAccount", data);
          //값이 있다면 check 에서 얻은 값을 주고
        }else{
          Store.commit("setAccount", 0);
        //없다면 초기값인 0을 준다.
        }
      })
    };

    const route = useRoute();
    //브라우저 현재 url 관련된 정보를 가져와줌

    watch(route,()=>{
      check();
    }) // url 이 바뀔때마다 감시해주는 watch 메서드 생성
     //check 를 통해 토큰의 유효성 검사
    //세션 스토리지를 사용하지않고
  }
}
</script>


<style lang="scss">
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}


.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>
