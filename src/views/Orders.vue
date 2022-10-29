<template>
  <div class="orders">
    <div class="container">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>주문 항목</th>
          <th>주문일</th>
          <th>주문진행</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(o, idx1) in state.orders" :key="idx1">
          <td>
            <div v-for="(i, idx2) in o.items" :key="idx2">{{ i.name }} * {{i.many}}</div>
          </td>
          <td>
            <div>{{o.date}}</div>
          </td>
          <td>
            <div>{{o.finished}}</div>
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

  data(){
    return{
      finish:""
    }
  },

  setup() {
    const state = reactive({
      orders: [],
    })
    axios.get("/api/orders").then(({data}) => {
      state.orders = [];

      for (let d of data) {
        if (d.items) {
          d.items = JSON.parse(d.items);
        }
        state.orders.push(d);
      }
    })


    const transOrder = () =>{
      axios.get("/api/orders").then(({data}) =>{
        for (let d of data) {
          if (d.finished) {
            this.finish=1
          }else{
            this.finish=2
          }
        }
      })
    }


    return {state,transOrder}
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
</style>
