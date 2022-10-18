<template>
  <div class="cover">
    <div class="d-flex h-100 text-center text-bg-dark">

      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

        <main class="px-3">
          <div class="Btn">
            <router-link to="/login" class="btn btn-lg btn-secondary fw-bold border-white bg-white">회원 로그인</router-link>
          </div>
          <div class="Btn" >
            <button
                         class="btn btn-lg btn-secondary fw-bold border-white bg-white"
                         @click="newBieCookie()"
            >
              비회원 주문
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import router from "@/scripts/router";
import store from "@/scripts/store";

export default {
  setup: function () {
    const state = reactive({
      member: [],
      nonMember: "",
      form: {}
    })

    const newBieCookie = () => {
      axios.post("api/account/nologin").then((res) => {
        console.log(res.data); //id 가 넘어온다.
        sessionStorage.setItem("id", res.data);
        router.push({path: "/home"});
      });
    }
    return {state, newBieCookie}
  }
}
</script>

<style scoped>

.btn{
  margin-bottom: 30px;
  width: 80%;
}

.px-3{
  margin-top: 30%;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
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

/* Custom default button */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none; /* Prevent inheritance from `body` */
}


/*
 * Base structure
 */

body {
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
  margin: 0;
}

.cover-container {
  max-width: 42em;
}

.cover{
  height: 100vH;
}


/*
 * Header
 */

.nav-masthead .nav-link {
  color: rgba(255, 255, 255, .5);
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}
</style>
