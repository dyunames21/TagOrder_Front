<template>
  <div class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">로그인</h1>
    <div class="form-floating">
      <input type="name" class="form-control" id="floatingInput" placeholder="name"
              v-model="state.form.name">
      <label for="floatingInput">id</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="password"  v-model="state.form.password">
      <label for="floatingPassword">Password</label>
    </div>
    <div class="checkbox mb-3">
      <label>
        <router-link to="/join" style="text-decoration: none">회원 가입</router-link>
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" @click="submit()">Sign in</button>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import store from "@/scripts/store";
import router from "@/scripts/router";

export default {
  setup() {
    const state = reactive({
      form: {
        name: "",
        password: ""
      }
    })
    const submit = () => {
      axios.post("/api/account/login", state.form).then((res) => {
        store.commit('setAccount', res.data);
        console.log(res.data); //id 가 넘어온다.
        sessionStorage.setItem("id", res.data);
        router.push({path: "/home"});
      }).catch(() => {
        window.alert("로그인 정보가 존재하지 않습니다..");
      });
    }
    return {state, submit}
  }
}
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
}
.form-signin .form-floating:focus-within {
  z-index: 2
}
.form-signin input[type="name"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;


}
</style>
