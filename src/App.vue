<script>
import HomeArticle from "./views/HomeArticle.vue"
import { RouterView } from "vue-router"

export default{
  components:{
    HomeArticle
  }
}
</script>

<template>
  <div>
    <h1 class="mainTitle">Abyssal thought</h1>
    <HomeArticle />
    <RouterView />
  </div>
</template>
