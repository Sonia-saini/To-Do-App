<script setup>
import { ref,onMounted } from "vue";
let data = ref([]);
onMounted(async() => {
  let user = JSON.parse(localStorage.getItem("LoggedInUser")) || {};
  let res = await fetch(`https://funny-lime-binturong.cyclic.app/gettodo`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      userId: user._id,
    },
  });
  let dat = await res.json();
  console.log(dat)
  data.value = dat.todo;
 
});


</script>
<style scoped></style>
<template>
  <div class="q-pa-md">
<div v-for="el in data" id="todo">
<h1>{{ el.title}}</h1>
<p>{{ el?.description }}</p>
</div>
  </div>
</template>
