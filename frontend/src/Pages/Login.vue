<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
let form = reactive({  email: "", password: "" });
let router=useRouter()
let isPwd = ref(true);
const onSubmit=async()=>{
  console.log(form)
  try{let res=await fetch(`https://funny-lime-binturong.cyclic.app/login`,{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(form),

  },
 

  )
  let data=await res.json();
  // data=JSON.parse(data);
  console.log(data);
  let d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
  document.cookie = `username=${data.token}; ${expires}; path=/`;
localStorage.setItem("LoggedInUser",JSON.stringify(data.user))
  alert(data.msg);
//   router.push("/")
  
}
catch(err){
  alert(err.msg)
}
}
console.log(document.cookie.valueOf("username"),"username",typeof(document.cookie))

</script>
<template>
  <div class="q-pa-md shadow-11 fixed-center" style="width:fit-content">

    <q-form @submit="onSubmit" class="q-gutter-md" >
          <h4 class="text-h5 text-center text-bold">
        Login
      </h4>
      <q-input
        v-model="form.email"
        filled
        type="email"
        hint="Please type email *"
        label="Email *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type valid email']"

      />
      <q-input
        v-model="form.password"
        filled
        :type="isPwd ? 'password' : 'text'"
        label="Password *"
        hint="Please enter password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type password']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div style="display: flex; justify-content: space-between;">
        <q-btn label="Login" type="submit" color="black" />
        <p class="text-subtitle2">If You New User? <router-link to="/register">Register</router-link></p>
      </div>
    </q-form>
  </div>
</template>
