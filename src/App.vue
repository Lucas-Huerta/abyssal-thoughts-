<script>
import { useArticleStore } from './store/store'
import { ref } from 'vue';

export default{
  data(){
        return{
            tabArticles: ref(), 
            store: ref()
        }
    },

    // fetch data at the component is mounted
    async mounted(){
      this.store = await useArticleStore();
      await this.store.listArticles()
          .catch((err) => {console.error(err)});
      console.log("STORE", this.store.articles);
      this.tabArticles = this.store.articles; 
    },
}
</script>

<template>
  <div>
    <RouterLink to="/">
      <h1 class="mainTitle">Abyssal thought</h1>
    </RouterLink>
    <RouterView />
  </div>
</template>
