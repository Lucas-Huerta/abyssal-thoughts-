<script>
import { ref } from 'vue';
import { useArticleStore } from '../store/store'
import anime from "animejs";

export default{
    props: {
        article: null
    }, 
    data(){
        return{
            tabArticles: ref(), 
            store: ref(), 
            image: null, 
            h1: null
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

        // push to one Article with the index(title) of the one article and trigger img clicked witn for loop and anim Js
        async goOneArticle(index, id){
            for (let i = 0; i < this.$refs.img.length; i++) {
                if(i == id){
                    this.image = this.$refs.img[i];
                    this.h1 = this.$refs.title[i]
                }
            }
            // Anim Js
            anime({
                targets: this.$refs.svg, // svg circle 
                translateY: -300, 
                easing: 'easeInOutQuad',
                duration: 500,
            });

            anime({
                targets: this.h1, // svg circle 
                translateX: -375,
                translateY: -250, 
                easing: 'easeInOutQuad',
                duration: 500,
            });

            // img
            anime({
                targets: this.image, 
                translateX: 200, 
                opacity: 0, 
                easing: 'easeInOutQuad',
                duration: 500,
                complete: () => {
                    this.$router.push({
                        name: "article", 
                        params: {index},
                        state: {Article: index}
                    })
                }
            });
        }
    }
}
</script>

<template>
    <!-- circle svg -->
    <div class="svg" ref="svg">
        <svg width="222" height="222" viewBox="0 0 222 222" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="111" cy="111" r="110.75" stroke="white" stroke-width="0.5"/>
        </svg>
    </div>

    <RouterLink to="/">
      <h1 class="mainTitle">Abyssal thought</h1>
    </RouterLink>

    <!-- v-for with article  -->
    <div class="columArticle">
        <div class="rowArticle" v-for="(article, index) in this.tabArticles" :key="article" @click="goOneArticle(index, article.id)" ref="img">
            <img :src="article.img" alt="image article" />
            <h2 ref="title">
                {{ article.title }}
            </h2>
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