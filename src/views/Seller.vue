<template>
  <div class="orders">
    <div class="container">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>주문 번호</th>
          <th>주문자 성명</th>
          <th>주문 메뉴</th>
          <th>주문일</th>
          <th>주문 완료</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="(o, idx1) in state.orders" :key="idx1">
          <td>{{ state.orders.length - idx1 }}</td>
          <td>{{o.name}}</td>
          <td>
            <div v-for="(i, idx2) in o.items" :key="idx2">{{ i.name }} * {{i.many}}</div>
          </td>
          <td>
            <div>{{o.date}}</div>
          </td>
          <td>
            <button class= "btn btn-primary" @click="OrderCom(o.id)">완료하기</button>
          </td>
        </tr>
        </tbody>
      </table>
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

</style>
