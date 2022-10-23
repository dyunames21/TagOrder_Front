<template>
  <div class="cart">
    <div class="container">
      <ul>
        <li v-for="(i,idx) in state.items" :key="idx">

          <img :src="i.imgpath"/>
          <span class="name">{{i.name}}</span>
          <span class="price">{{i.price}}</span>
          <span class="count" style="margin-left: 50px">{{i.many}}개</span>
          <i class="fa fa-trash" @click="remove(i.id)"></i>

        </li>
      </ul>
      <router-link to="/home"  class="btn-gradient blue">메뉴로 돌아가기</router-link>

      <router-link to="/order" class= "btn btn-primary">구입하기</router-link>

    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      items: []
    })
    const load = () => {
      axios.get("/api/cart/items").then(({data}) => {
        console.log(data);
        state.items = data;
      })
    }
    const remove = (itemId) => {
      axios.delete(`/api/cart/items/${itemId}`).then(() => {
        load();
      })
    }
    load();
    return {state, remove}
  }
}
</script>

<style scoped>

.cart ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.cart ul li {
  border: 1px solid #eee;
  margin-top: 25px;
  margin-bottom: 25px;
}
.cart ul li img {
  width: 150px;
  height: 150px;
}
.cart ul li .name {
  margin-left: 25px;
}
.cart ul li .price {
  margin-left: 25px;
}
.cart ul li i {
  float: right;
  font-size: 20px;
  margin-top: 65px;
  margin-right: 50px;
}
.cart .btn {
  width:300px;
  display:block;
  margin:0 auto;
  padding:30px 50px;
  font-size: 20px;
}

.btn-gradient {
  text-decoration: none;
  color: white;
  padding: 10px 30px;
  display: inline-block;
  border: 1px solid rgba(0,0,0,0.21);
  border-bottom: 4px solid rgba(0,0,0,0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);
  margin-bottom: 30px;
  margin-top: 20px;

}

.btn-gradient.blue {
  background: rgba(102,152,203,1);
  background: -moz-linear-gradient(top, rgba(102,152,203,1) 0%, rgba(92,138,184,1) 100%);
  background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(102,152,203,1)), color-stop(100%, rgba(92,138,184,1)));
  background: -webkit-linear-gradient(top, rgba(102,152,203,1) 0%, rgba(92,138,184,1) 100%);
  background: -o-linear-gradient(top, rgba(102,152,203,1) 0%, rgba(92,138,184,1) 100%);
  background: -ms-linear-gradient(top, rgba(102,152,203,1) 0%, rgba(92,138,184,1) 100%);
  background: linear-gradient(to bottom, rgba(102,152,203,1) 0%, rgba(92,138,184,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6698cb', endColorstr='#5c8ab8', GradientType=0 );
}
</style>
