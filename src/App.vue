<script setup>

fetch('../data/data.json')
    .then((response) => response.json())
    .then((json) => console.log(json));

</script>

<template>
  <div>
    <h1 class="mainTitle">Abyssal thought</h1>
  </div>
</template>

<style scoped>
</style>
