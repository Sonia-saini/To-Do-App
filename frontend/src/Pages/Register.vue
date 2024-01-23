<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
let form = reactive({ name: "", email: "", password: "" });
let router=useRouter()
let isPwd = ref(true);
const onSubmit=async()=>{
  console.log(form)
  try{let res=await fetch(`https://funny-lime-binturong.cyclic.app/register`,{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(form),

  },
 

  )
  let data=await res.json();
  // data=JSON.parse(data);
  console.log(data.msg);
  alert(data.msg);
  router.push("/login")
  
}
catch(err){
  alert(err.msg)
}
}
</script>
<template>
  <div class="q-pa-md shadow-11 fixed-center" style="width:fit-content">

    <q-form @submit="onSubmit" class="q-gutter-md" >
          <h4 class="text-h5 text-center text-bold">
        Register
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
        filled
        v-model="form.name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type name']"
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
        <q-btn label="Register" type="submit" color="black" />
        <p class="text-subtitle2">If already register? <router-link to="/login">Login</router-link></p>
      </div>
    </q-form>
  </div>
</template>
