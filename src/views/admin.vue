<template>

    <div class =nav>
      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/seller" class="nav-link px-2 link-dark">현재 주문 리스트</a></li>
        <li><a href="/orderdata" class="nav-link px-2 link-dark">전체 주문 조회</a></li>
        <li><a href="#" class="nav-link px-2 link-secondary">메뉴 관리</a></li>
      </ul>
    </div>

  <div class="black-bg" v-if="CreateIsOpen==true">
    <div class="white-bg">
      <i class="fa fa-times-circle" aria-hidden="true" v-on:click="CreateIsOpen=false"></i>
        <div class="col-md-7 col-lg-8"><h4 class="mb-3">메뉴 추가</h4>

          <form>
            <div class="form-group">
              <label for="name">메뉴명</label>
              <input type="text" class="form-control" id="name" placeholder="메뉴명 입력" v-model="state.form.name">
            </div>
            <div class="form-group">
              <label for="price">가격</label>
              <input type="number" class="form-control" id="price" placeholder="가격 입력" v-model="state.form.price">
            </div>
              <div class="form-group" style="margin:20px">
                <label for="img_path">메뉴 이미지 추가</label>
                <div></div>
                <input type="file" class="form-control-file" id="img_path">
              </div>
            <div></div>
            <button type="submit" class="btn btn-primary" @click="submit()">Submit</button>
          </form>

        </div>
    </div>
  </div>

  <div class="black-bg" v-if="EditIsOpen==true">
    <div class="white-bg">
      <i class="fa fa-times-circle" aria-hidden="true" v-on:click="EditIsOpen=false"></i>
      <div class="col-md-7 col-lg-8"><h4 class="mb-3">메뉴 수정</h4>

        <form>
          <div class="form-group">
            <label for="name">현재 메뉴명 :  {{editItem.name}}</label>
            <input type="text" class="form-control" id="name" v-model="state.form.name" >
          </div>
          <div class="form-group">
            <label for="price">현재 가격 : {{editItem.price}}</label>
            <input type="number" class="form-control" id="price" v-model="state.form.price">
          </div>
          <div class="form-group" style="margin:20px">
            <label for="img_path">메뉴 이미지 변경</label>
            <div></div>
            <input type="file" class="form-control-file" id="img_path">
          </div>
          <div></div>
          <button type="submit" class="btn btn-primary" @click="edit(editItem.id)">Submit</button>
        </form>
      </div>
    </div>
  </div>



  <div class="admin">
    <div class="container">

      <a href="#" class="btn-gradient red small" v-on:click="CreateIsOpen=true">메뉴 추가</a>


      <table class="table">
        <thead>
        <tr>
          <th scope="col" style="width: 200px;">이미지</th>
          <th scope="col">이름</th>
          <th scope="col">가격</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody >
          <tr v-for="item in state.items">
            <td><img :src="item.imgpath"/></td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }} 원</td>
            <td class="option">
              <i class="fa fa-trash" @click="remove(item.id)"></i>
              <i class="fa fa-pencil-square" v-on:click="EditIsOpen=true; editItem=item"></i>
            </td>
          </tr>

        </tbody>
      </table>




    </div>
  </div>

</template>

<script>
import Card from "@/components/Card";
import axios from "axios";
import {reactive} from "vue";
import store from "@/scripts/store";
import router from "@/scripts/router";

export default {
  name: "admin",
  components: {Card},
  setup(){
    const state = reactive({
      items:[],
      form: {
        name: "",
        price: "",
        img_path:""
      },
    })
    const load = () => {
      axios.get("/api/items").then(({data}) => {
        console.log(data);
        state.items = data;
      })
    };

    axios.get("/api/items").then((res)=>{
      state.items=res.data
    });


    const remove = (itemId) => {
      axios.delete(`/api/item/${itemId}`).then(() => {
        alert('삭제되었습니다.');
        load();
      })
    };

    const edit = (itemId) => {
      const args = JSON.parse(JSON.stringify(state.form));
      args.items = JSON.stringify(state.items);
      axios.post(``).then(() => {
        alert('수정되었습니다.')
      })
    };

    const submit = () => {
      const args = JSON.parse(JSON.stringify(state.form));
      args.items = JSON.stringify(state.items);
      axios.post("/api/addItem", args).then(() => {
        alert('메뉴추가 완료');
      })
    };


    load();

    return {state, submit, remove, edit}
  },


  data(){
    return{
      CreateIsOpen : false,
      EditIsOpen : false,
      editItem: "",
    }
  }


};
</script>


<style scoped>

.form-group{
  margin: 10px;
}

.admin{
  margin-top: 20px;
}
.fa{
  margin-right: 20px;
}
.option{
  width: 10%;
}

.btn-gradient {
  text-decoration: none;
  color: black;
  padding: 10px 30px;
  border: 1px solid rgba(0,0,0,0.21);
  border-bottom: 4px solid rgba(0,0,0,0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);
  float: right;
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
  padding-top: 80px;
  z-index: 2;
}
.white-bg {
  width: 50%; background: white;
  border-radius: 8px;
  padding: 20px;
  margin:auto;
}
.fa-times-circle{
  float: right;
}
.nav{
  margin: auto;
  padding-top: 10px;

}

</style>
