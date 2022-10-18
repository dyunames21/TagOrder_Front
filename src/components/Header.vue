<template>
  <header>
    <div class="collapse bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row" v-if="$store.state.account.id">
            <ul class="list-unstyled">
              <li>
                <router-link to="/home" class="text-white">메인 화면</router-link>
              </li>
              <li v-if="$store.state.account.id">
                <router-link to="/orders" class="text-white">주문 내역</router-link>
              </li>
              <li>
                <router-link to="/login" class="text-white" v-if="!$store.state.account.id">로그인</router-link>
                <a to="/login" class="text-white" @click="logout()" v-else>로그아웃</a>
              </li>
            </ul>
        </div>
      </div>
    </div>
    <div class="navbar navbar-dark bg-dark shadow-sm" >
      <div class="container">
        <router-link to="/home" class="navbar-brand d-flex align-items-center">
          <strong>CAFE</strong>
        </router-link>
        <router-link to="/cart" class="cart btn" v-if="$store.state.account.id">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation" v-if="$store.state.account.id">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </header>
</template>


<script>
import store from "@/scripts/store";
import router from "@/scripts/router";
import axios from "axios";

export default {
  name:'Header',

  setup() {
    const logout = () => {
      axios.post("/api/account/logout").then(()=>{
        store.commit('setAccount', 0);
        router.push({path: "/"});
      });
    }

    const check = ()=>{
      axios.post("/api/account/check")
    }

    return {logout}
  }
}
</script>

<style scoped>

header .navbar .cart{
  margin-left: auto;
  color: white;
}
.container{
  margin-left: 30px;
}




</style>
