<template>
  <div class="order">
    <div class="container">
      <main>
        <div class="py-5 text-center">
          <h2>주문하기</h2>
        </div>
        <div class="row g-5">
          <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">구입 목록</span>
            <span
              class="badge bg-primary rounded-pill">
              {{ state.items.length }}
            </span>
            </h4>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-sm" v-for="(i, idx) in state.items"
                  :key="idx">
                <div>
                  <h6 class="my-0">{{ i.name }} * {{i.many}}</h6>

                </div>
                <span class="text-muted">
                  {{i.price*i.many}}원
                </span>
              </li>
            </ul>
            <h3 class="text-center total-price">
              {{computedPrice}}원
            </h3>
          </div>
          <div class="col-md-7 col-lg-8"><h4 class="mb-3">주문자 정보</h4>
            <div class="needs-validation" novalidate="">
              <div class="row g-3">
                <div class="col-12"><label for="username" class="form-label">이름</label>
                  <input type="text"
                         class="form-control"
                         id="username"
                         v-model="state.form.name"
                  >
                </div>
                <div class="col-12"><label for="phone" class="form-label">핸드폰 번호</label>
                  <input type="tel"
                         class="form-control"
                         id="phone"
                         v-model="state.form.phone">
                </div>
              </div>
              <div>
                &nbsp;
              </div>
              <button class="w-100 btn btn-primary btn-lg" @click=requestPay()>결제하기</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import {computed, reactive} from "vue";
import axios from "axios";
import router from "@/scripts/router";
import Seller from "@/views/Seller";
export default {
  name : "Order",

  setup() {

    const state = reactive({
      items: [],
      form: {
        name: "",
        phone: "",
        items: "",
        Uid:"",
      }
    })
    const load = () => {
      axios.get("/api/cart/items").then(({data}) => {
        console.log(data);
        state.items = data;
      })
    };


    const computedPrice = computed(() => {
      let result = 0;
      for (let i of state.items) {
        result += i.price*i.many
      }
      return result;
    })
    load();



    const requestPay = () =>{

      let resultPrice = 0;
      for (let i of state.items) {
        resultPrice += i.price * i.many
      }
      let resultName="";
      for (let i of state.items) {
        resultName += i.name
        resultName += " "
      }
      let resultUid="";


      //1. 객체 초기화 (가맹점 식별코드 삽입)
      IMP.init("imp39693114");
      //3. 결제창 호출
      IMP.request_pay({
        pg: 'inicis',
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: resultName,
        amount: resultPrice,
        buyer_name: state.form.name,
        buyer_tel: state.form.phone,
        //주문 완료시
      }, function (rsp) {
        if (rsp.success) {
          //4. 결제 요청 결과 서버(자사)에 적용하기
          //ajax 서버 통신 구현 -> 5. 서버사이드에서 validation check
          //6. 최종 서버 응답 클라이언트에서 단계 4.에서 보낸 서버사이드 응답 에따라 결제 성공 실패 출력
          var msg = '결제가 완료되었습니다.';
          resultUid=rsp.merchant_uid
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + resultUid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;


          const args = JSON.parse(JSON.stringify(state.form));
          args.items = JSON.stringify(state.items);
          args.Uid = resultUid;

          alert(msg);

          axios.post("/api/orders", args).then(() => {
            alert("정보가 전달 되었습니다.")
            router.push({path: "/orders"});
          })
        }else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
        }
      });

    }

    return {state, computedPrice, requestPay}

  },


}
</script>

<style scoped>
</style>
