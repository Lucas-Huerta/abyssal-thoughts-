<script>
import { ref } from 'vue';
import { useArticleStore } from '../store/store'

export default{
    props: {
        article: null
    }, 
    data(){
        return{
            tabArticles: ref(), 
            store: ref()
        }
    },

    // fetch data at the component is mounted
    mounted(){
        this.fetchData()
    },

    methods: {
        /**
         * Fetch datas in data.json (in public/data)
         */
        async fetchData(){
            // use the store
            this.store = await useArticleStore();

            // call function in store witch fetch data 
            await this.store.listArticles()
                .catch((err) => {console.error(err)});
            this.tabArticles = this.store.articles; 
        }, 

        // push to one Article with the index(title) of the one article
        async goOneArticle(index){
            await this.$router.push({
                name: "article", 
                params: {index},
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

    <!-- v-for with article  -->
    <div class="columArticle">
        <div v-for="(article, index) in this.tabArticles" :key="article">
            <div class="rowArticle" @click="goOneArticle(index)">
                <img :src="article.img" alt="image article"/>
                <h2>
                    {{ article.title }}
                </h2>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
.columArticle{
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.rowArticle{
    font-family: "PP-Acma";
    display: flex;
    flex-direction: row;
    align-items: center;
}

.rowArticle h2{
    margin-left: 5vw;
    font-size: 41px;
}

.svg{
    z-index: -1;
    position: absolute;
    top: 30%;
    left: 10%;
    right: 0;
    bottom: 0;
}
</style>