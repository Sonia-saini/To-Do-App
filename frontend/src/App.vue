<script setup>
 import {useRouter} from "vue-router"
 let router=useRouter();
 const register=()=>{
router.push("/register")
 }

</script>

<template>
  <div>
   <!-- <h1>home</h1> -->
<!-- <q-btn @click="register()">submit</q-btn>  -->
<!-- <Todo/> -->
  <router-view></router-view>
  </div>

</template>

<style lang="css" scoped>
body{
  background-image: url();
}
</style>