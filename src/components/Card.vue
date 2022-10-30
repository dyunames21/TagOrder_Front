<template>

  <div class="black-bg" v-if="CardIsOpen==true">
    <div class="white-bg">

      <i class="fa fa-times-circle" aria-hidden="true" v-on:click="CardIsOpen=false"></i>

      <h4 class="col-md-7 col-lg-8"><h4 class="mb-3">{{item.name}}</h4>

        <div class="item-form">

          <img class="item-img" style="width:250px" :src="item.imgpath"/>

          <div class="card-body">


            <h4>{{ item.price }}원</h4>

            <div class="btn-group">

              <div class="count">
                <div class="row row-cols-md-3 mb-3">
                  <div class="col themed-grid-col"><span  class="btn-gradient blue" type ="button" @click="up">+</span></div>
                  <div class="col themed-grid-col" style="padding-top: 10px">{{ count }}</div>
                  <div class="col themed-grid-col"><span  class="btn-gradient blue" type="button" @click="down">-</span></div>
                </div>
              </div>

            </div>

            <div>
              <button type="button" class="btn btn-lg btn-outline-primary" v-on:click="CardIsOpen=false" style="width:70%" @click="addToCart(item.id, count)">
                담기
              </button>
            </div>
          </div>

        </div>


      </h4>
    </div>
  </div>




  <button class="item-btn" v-on:click="CardIsOpen=true" style="width: 100%;height: 180px">
    <div class="card shadow-sm" style="width: 100%; height: 180px">

      <img class="item-img" style="width:100%; height: 70%" :src="item.imgpath"/>
      <div class="card-body" style="padding: 0">
        <p class="card-text" style="margin-bottom: 2px;">{{item.name}}</p>
        <small>{{ item.price }}원</small>
      </div>
    </div>
  </button>






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
      count:1,
      CardIsOpen : false ,
    }
  },

  setup() {
    const addToCart = (itemId,many) => {
      axios.post(`/api/item/${itemId}/${many}`).then(() => {
        console.log('success')
        alert("담겼습니다")
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

  },


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


  .item-btn{
    outline : 0;
    border :0;
  }

  body {
    margin : 0;
  }
  div {
    box-sizing: border-box;
  }
  .black-bg {
    width: 100%; height:100%;
    background: rgba(0,0,0,0.5);
    position: fixed; top: 0; right: 0;
    z-index: 5;
    padding-top: 100px;
  }
  .white-bg {
    width: 80%; background: white;
    border-radius: 8px;
    padding: 20px;
    margin:auto;
    text-align: center;
  }
  .fa-times-circle{
    float: right;
  }

  .item-form{
    width: 100%;
    height: 500px;
  }

  .count{
    margin-top: 30px;
    margin-bottom: 20px;
    float: left;
  }


  .item-img{
    width: 100%;
  }

  .white-bg .item-img{
    margin: 20px;
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
    width: 20px;

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
