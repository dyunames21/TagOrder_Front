<template>
  <div class="orders">
    <div class ="nav">
      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" class="nav-link px-2 link-secondary">현재 주문 리스트</a></li>
        <li><a href="/orderdata" class="nav-link px-2 link-dark">전체 주문 조회</a></li>
        <li><a href="/admin" class="nav-link px-2 link-dark">메뉴 관리</a></li>
      </ul>
    </div>

    <div class="container">

      <div class="orderCard" v-for="(o, idx1) in state.orders" :key="idx1">
        <div class="text-center">
          <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
              <div class="card-header py-3">
                <h4 class="my-0 fw-normal">{{idx1 }}</h4>
              </div>
              <div class="card-body">
                <h2 class="card-title pricing-card-title">{{o.name}}</h2>
                <div>{{o.date}}</div>
                <ul class="list-unstyled mt-3 mb-4">
                  <div v-for="(i, idx2) in o.items" :key="idx2">{{ i.name }} * {{i.many}}</div>
                </ul>
                <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="OrderCom(o.id)" >완료하기</button>
              </div>
            </div>
          </div>
        </div>
    </div>

  </div>
  </div>

</template>


<script>
import {computed, reactive} from "vue";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      orders: [],
    })

     //load 하는 이유?
    axios.get("/api/seller/orders").then(({data}) => {
      state.orders = [];

      for (let d of data) {
        if (d.items) {
          d.items = JSON.parse(d.items);
        }
        state.orders.push(d);
      }
    })

    const OrderCom = (orderId) => {
      axios.post(`/api/seller/orders/${orderId}`).then(() => {
        alert("success")
      })
    }

    return {state,OrderCom}
  }
}
</script>

<style scoped>
.table {
  margin-top: 30px;
}
.table > tbody {
  border-top: 1px solid #eee;
}
th, td {
  text-align: center;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.orderCard{
  width: 300px;
  display: inline-block;
  margin: 10px;
}

.nav{
  margin: auto;
  padding-top: 10px;

}


</style>
