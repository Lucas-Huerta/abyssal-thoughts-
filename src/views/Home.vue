<script>
import HomeArticle from "./HomeArticle.vue"

export default{
  components:{
    HomeArticle
  }
}
</script>

<template>
  <div>
    <RouterLink to="/">
      <h1 class="mainTitle">Abyssal thought</h1>
    </RouterLink>
    <HomeArticle />
  </div>
</template>
