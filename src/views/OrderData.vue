<template>
  <div class="orderData">
    <div class =nav>
      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><router-link to="/seller" class="nav-link px-2 link-dark">현재 주문 리스트</router-link></li>
        <li><router-link to="#" class="nav-link px-2 link-secondary">전체 주문 조회</router-link></li>
        <li><router-link to="/admin" class="nav-link px-2 link-dark">메뉴 관리</router-link></li>
      </ul>
    </div>

    <div class="container">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>주문 번호</th>
          <th>주문자 성명</th>
          <th>주문 메뉴</th>
          <th>주문일</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="(o, idx1) in state.orders" :key="idx1">
          <td>{{idx1}}</td>
          <td>{{o.name}}</td>
          <td>
            <div v-for="(i, idx2) in o.items" :key="idx2">{{ i.name }} * {{i.many}}</div>
          </td>
          <td>
            <div>{{o.date}}</div>
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
    axios.get("/api/AllOrders").then(({data}) => {
      state.orders = [];

      for (let d of data) {
        if (d.items) {
          d.items = JSON.parse(d.items);
        }
        state.orders.push(d);
      }
    })


    return {state}
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
