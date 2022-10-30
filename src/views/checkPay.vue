<template>

  <div style="height: 20px"></div>
  <div class="container">
    <div class="orderCard">
      <div class="text-center">
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">

              <h4 class="my-0 fw-normal">주문 확인</h4>


            </div>
            <div class="card-body">
              <h2 class="card-title pricing-card-title">{{state.form.name}} 고객님</h2>
              <div class="detail" style="text-align: left; font-size: 16px" >
                <div>주문번호 : {{state.formCheck.uid}}</div>
                <div>전자 영수증 : <a v-bind:href="state.formCheck.receiptUrl">전자 영수증 보기</a></div>
                <div>주문 시각: {{state.formCheck.paidAt}}</div>
              </div>

              <ul class="list-unstyled mt-3 mb-4" style="margin: 50px 0 100px 0">
                <h3 style="margin-bottom: 30px">주문 메뉴</h3>
                <li class="list-group-item d-flex justify-content-between lh-sm" style="margin-bottom: 10px" v-for="(i, idx) in state.items"
                    :key="idx">
                  <div>
                    <h5 class="my-0" >{{ i.name }} * {{i.many}}</h5>
                  </div>
                </li>

              </ul>
              <h5 style="margin-top: 30px">결제 금액 : {{state.form.price }}원</h5>


              <div v-if="IsOrder==false">
                <button type="button" class="w-100 btn btn-lg btn-outline-primary" v-on:click="IsOrder=true" style="margin: 30px 0 10px 0" @click=accept()>확인 완료</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { reactive } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import router from '@/scripts/router'

export default {
  name: 'checkPay',

  data(){
    return{

      IsOrder : false,
    }
  },

  setup() {

    const state = reactive({
      items: [],
      form: {
        name: "",
        phone: "",
        items : "",
        price:"",
      },
      formCheck : {
        name: "",
        phone: "",
        items : "",
        price:"",
        uid:"",
        payMethod:"",
        receiptUrl:"",
        paidAt:""
      }
    })

    const load = () => {
      axios.get("/api/cart/items").then(({data}) => {
        console.log(data);
        state.items = data;
      })
    };

    load();

    const route = useRoute()
    console.log(route.query.imp_uid)

    let imp_uid = route.query.imp_uid

    const date = new Date();

    axios.post(`/api/verify/${imp_uid}`).then(({data}) => {
      console.log(data)
      state.form.name = data.response.buyerName
      state.form.price = data.response.amount
      state.form.phone = parseInt(data.response.buyerTel)

      state.formCheck.name = data.response.buyerName
      state.formCheck.price = data.response.amount
      state.formCheck.phone = parseInt(data.response.buyerTel)
      state.formCheck.receiptUrl = data.response.receiptUrl
      state.formCheck.payMethod = data.response.payMethod
      state.formCheck.uid = data.response.impUid
      state.formCheck.paidAt = data.response.paidAt



    })

    const args = JSON.parse(JSON.stringify(state.form));
    args.items = JSON.stringify(state.items);

    const accept = () =>{
      const args = JSON.parse(JSON.stringify(state.form));
      args.items = JSON.stringify(state.items);
      axios.post("/api/orders", args).then(() => {
        router.push({path: "/orders"});
      })

    }

    return{state,accept}
  }
}




</script>

<style scoped>

</style>
