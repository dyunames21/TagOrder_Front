<template>
  <div class="card shadow-sm">
    <span class="img" :style="{backgroundImage: `url(${item.imgPath})`}"/>
    <div class="card-body">
      <span class="card-text" style="margin-right: 10px">{{item.name}}</span>
      <small>{{ item.price }}원</small>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group" style="margin-top: 10px">
            <button class="PMBtn" type ="button" @click="up">+</button>
            <span class = "count">{{ count }}</span>
            <button class="PMBtn" type="button" @click="down">-</button>
          <button class="btn btn-primary" style="margin-left: 20px" @click="addToCart(item.id, count)">
            담기
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
  name: "Card",
  props: {
    item: Object
  },
  data(){
    return{
      count:1
    }
  },

  setup() {
    const addToCart = (itemId,many) => {
      axios.post(`/api/item/${itemId}/${many}`).then(() => {
        console.log('success')
      })
      axios.post(`/api/cart/items/${itemId}`).then(() => {
        console.log('success')
      })
    }
    return {addToCart}
  },//담기를 누르면 ItemId값을 인자로 전달해서 백엔드 API쪽으로 POST로 보냄

  methods:{
    up(){
      this.count++
    },
    down(){
      this.count--
    },

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
    width: 200px;
    margin-left: 15px;
  }

  .count{
    width: 30px;
    text-align: center;
  }
  .PMBtn{
    height: 30px;

  }

</style>
