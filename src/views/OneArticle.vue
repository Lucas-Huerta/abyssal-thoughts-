<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router'

export default{
    data(){
        return{
            route: useRoute(), 
            pageArticle: ref(), 
            store: ref(), 
            idArticle: ref(), 
            titleArticle: null
        }
    },

    async mounted(){
        this.store = await this.$pinia.state.value.articles.articles; 
        /**
         * for in loop 
         * index => name of the article in loop
         * this.route.params.index => name of article to find (pass in router)
         */
        for (let index in this.store) {
            if (index === this.route.params.index) {
                this.titleArticle = await this.store[index].title; 
                this.pageArticle = await this.store[index].Articles;
                this.idArticle = await this.store[index].id; 
            }
        }

        // let previousRoute = this.$router.currentRoute.value.params;
        // console.log("previous", previousRoute); 
        // console.log("test", this.idArticle);
    },

    methods: {
        async goArticle(title, img, text){
            let id = await this.idArticle; 
            let passTitle = await this.titleArticle; 
            // TODO pass good parameter to component textOneArticle
            await this.$router.push({
                name: "OneArticle", 
                params: {id, passTitle, title, img, text}, 
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

    <!-- arrow svg -->
    <div class="arrow">
        <RouterLink to="/">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.767947 0L0 0.767947L9.23205 10L0 19.2321L0.767947 20L10 10.7679L19.2321 20L20 19.2321L10.7679 10L20 0.767947L19.2321 0L10 9.23205L0.767947 0Z" fill="white"/>
            </svg>
        </RouterLink>
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
        <div v-for="article in this.pageArticle" :key="article" class="row" @click="goArticle(article.title, article.img, article.text)">
            <h2>
                {{ article.title }}
            </h2>
            <img :src="article.img" alt="image article"/>
        </div>
    </div>
   
</template>

<style scoped>

.arrow{
    z-index: 20;
    position: absolute;
    top: 50vh; 
    bottom: 50vh;
    left: 5vw;
    width: 10vw;
}

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
    margin: 0 -20vw 0 0;
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