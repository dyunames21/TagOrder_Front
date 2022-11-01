<template>
  <div class="container">
    <div class="input-form-backgroud row">
      <div class="input-form col-md-12 mx-auto">
        <h4 class="mb-3">회원가입</h4>
        <form class="validation-form" novalidate>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="name">id</label>
              <input type="text" class="form-control" id="name" placeholder="" v-model="state.form.name" required>
              <div class="invalid-feedback">
                이름을 입력해주세요.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="password">비밀번호</label>
              <input type="password" class="form-control" id="password" placeholder="" v-model="state.form.password" required>
              <div class="invalid-feedback">
                비밀번호를 입력해주세요
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="phone">휴대폰 번호</label>
              <input type="tel" class="form-control" id="phone" placeholder="" v-model="state.form.phone" required>
              <div class="invalid-feedback">
                핸드폰 번호를 입력해주세요
              </div>
            </div>
          </div>
          <div class="mb-4"></div>
          <button class="btn btn-primary btn-lg btn-block" type="submit" @click="submit()">가입 하기</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import router from "@/scripts/router";

export default {
  setup() {
    const state = reactive({
      member:[],
      form: {
        name: "",
        password: "",
        phone:"",
      }
    })

    const submit = () => {
      const args = JSON.parse(JSON.stringify(state.form));
      args.member = JSON.stringify(state.member);
      event.preventDefault();
      axios.post("/api/account/join", args).then(() => {
        router.push("/login")
        alert('가입 완료, 가입하신 아이디로 로그인해주세요');
      })
    };
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

body {
  min-height: 100vh;

  background: -webkit-gradient(linear, left bottom, right top, from(#92b5db), to(#1d466c));
  background: -webkit-linear-gradient(bottom left, #92b5db 0%, #1d466c 100%);
  background: -moz-linear-gradient(bottom left, #92b5db 0%, #1d466c 100%);
  background: -o-linear-gradient(bottom left, #92b5db 0%, #1d466c 100%);
  background: linear-gradient(to top right, #92b5db 0%, #1d466c 100%);
}

.input-form {
  max-width: 680px;

  margin-top: 80px;
  padding: 32px;

  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15)
}

</style>
