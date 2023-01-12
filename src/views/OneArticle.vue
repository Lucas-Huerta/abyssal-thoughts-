<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router'

export default{
    data(){
        return{
            route: useRoute(), 
            pageArticle: ref(), 
            store: null
        }
    },

    mounted(){
        this.store = this.$pinia.state.value.articles.articles; 
        /**
         * for in loop 
         * index => name of the article in loop
         * this.route.params.index => name of article to find (pass in router)
         */
        for (const index in this.store) {
            if (index === this.route.params.index) {
                this.pageArticle = this.store[index].Articles;
            }
        }
    },

    methods: {
        async goArticle(index, title, img, text){
            // TODO pass good parameter to component textOneArticle
            await this.$router.push({
                name: "OneArticle", 
                params: {index, title, img, text},
                state: {Article: index}
            })
        }
    }
}

</script>

<template>
    <!-- circle svg -->
    <div class="svg">
        <svg width="222" height="222" viewBox="0 0 222 222" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="111" cy="111" r="110.75" stroke="white" stroke-width="0.5"/>
        </svg>
    </div>

    <RouterLink to="/">
      <h1 class="mainTitle">Abyssal thought</h1>
    </RouterLink>
    
    <div v-if="this.pageArticle" id="titleArticle">
        <h2>
            {{ this.route.params.index }}
        </h2>
    </div>
    <div class="columnArticle">
        <div v-for="article in this.pageArticle" :key="article" class="row" @click="goArticle(article.id, article.title, article.img, article.text)">
            <h2>
                {{ article.title }}
            </h2>
            <img :src="article.img" alt="image article"/>
        </div>
    </div>
   
</template>

<style scoped>

#titleArticle{
    position: absolute;
    top: 6%;
    left: 16%;
    font-family: "PP-Acma";
    font-size: 14px;
    margin: 0;
}

.svg{
    z-index: -1;
    position: absolute;
    top: -5%;
    left: 0;
    right: 0;
}

.columnArticle{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    min-height: 90vh;
    max-width: 100vw;
    max-height: 100vh;
}

.columnArticle .row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.columnArticle .row h2{
    font-family: "PP-Acma";
    font-size: 41px;
    margin: 0 -25vw 0 0;
    z-index: 10;
    width: 50vw;
    text-align: right;
    line-height: 1;
}

.columnArticle .row img{
  width: 70%;
  height: 70%;
}

</style>