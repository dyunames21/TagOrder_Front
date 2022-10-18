<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <p class="card-text">{{order.Uid}}</p>
      <p class="card-text">{{order.name}}</p>
      <p class="card-text">{{order.items}}</p>
      <p class="card-text">{{order.date}}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button class="btn btn-primary" @click="">
            주문 완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import {reactive} from "vue";

export default {
  name: "OrderCard",
  props: {
    Order: Object
  },
  setup() {

  }
}
</script>


<style scoped>
  .card .img{
    display: inline-block;
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
  }

  .card{
    height: 234px;
    width: 200px;
    margin-left: 15px;
  }


</style>
