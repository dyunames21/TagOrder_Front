<template>

    <div class =nav>
      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><router-link to="/seller" class="nav-link px-2 link-dark">현재 주문 리스트</router-link></li>
        <li><router-link to="/orderdata" class="nav-link px-2 link-dark">전체 주문 조회</router-link></li>
        <li><router-link to="#" class="nav-link px-2 link-secondary">메뉴 관리</router-link></li>
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
                <label for="uploadFile" class="form-label">파일첨부</label>
                <input name="uploadFile" v-on:change="changeFile" type="file" id="imgpath"/>
              </div>
            <div></div>
            <button type="submit" class="btn btn-primary" v-on:click="save">Submit</button>
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
            <label for="uploadFile" class="form-label">파일첨부</label>
            <input name="uploadFile" v-on:change="changeFile" type="file" class="form-control-file" id="imgpath" multiple="multiple"/>

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
            <td><img style="width: 100px" :src="item.imgpath"/></td>
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
        uploadFile:""
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

    const changeFile = (e) =>{
      state.form.uploadFile = e.target.files[0];
      console.log(e.target.files);
    }

    const save= ()=>{
      var formData = new FormData();
      formData.append('name',state.form.name)
      formData.append('price',state.form.price)
      formData.append('uploadFile',state.form.uploadFile)


      axios.post("/api/addItemSet",formData,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }}).then(()=>{
        alert('메뉴추가 완료');
        window.location.reload(true);
      });
    }








    return {state, submit, remove, edit, changeFile: changeFile, save}
  },

  methods: {
      fileSelect(){
        console.log(this.$refs),
        this.ItemImage = this.$refs.ItemImage.files[0];
      },


      SetMenuImg(){
        const formData = new FormData();
        const photoFile = document.getElementById("profile-img-edit")
        formData.append("profile-img-edit", photoFile.files[0])
        axios.post("/api/item/addImg",formData,{
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(formData);
      }
    },

  data(){
    return{
      CreateIsOpen : false,
      EditIsOpen : false,
      editItem: "",
      ItemImage : '',

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
