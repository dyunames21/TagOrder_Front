<template>
  <header>
    <div class="collapse bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row" v-if="$store.state.account.id">
          <div class="container">
            <header class="d-flex justify-content-center py-3">
              <ul class="nav nav-pills">
                <li class="nav-item"><a href="/orders" class="nav-link">주문 기록</a></li>
                <li class="nav-item"><a href="#" class="nav-link">쿠폰</a></li>
                <li class="nav-item"><a class="nav-link" @click="logout()">로그아웃</a></li>
              </ul>
            </header>
          </div>
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
