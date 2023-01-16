<script>
import { ref, toRaw } from 'vue';
import { useRoute } from 'vue-router'

export default{
    data(){
        return{
            route: useRoute(), 
            store: ref(), 
            mainArticle: ref()
        }
    },

    async mounted(){
        // Store
        this.store = this.$pinia.state.value.articles.articles; 
        // Titre à repasser lorsqu'on clic sur la croix pour revenir à la page article
        this.mainArticle = this.route.params.passTitle; 
    }, 

    methods: {
        async handleSuccess(){
            let index = this.mainArticle; 
            await this.$router.push({
                name: "article", 
                params: {index}, 
            })
        }, 

        /**
         * Function witch go on one article with params of the OneArticle route 
         * @param {*} id id article
         * @param {*} title title article
         * @param {*} img img article
         * @param {*} text text article
         * @param {*} passTitle title of the parent section (Art / Offf! / History)
         */
        async goOneArticle(id, title, img, text, passTitle){
            this.$router.push({
                name: "OneArticle", 
                params: {
                    id, 
                    title, 
                    img, 
                    text,
                    passTitle
                }
            })
        }
    }
}

</script>

<template>
   <div id="section_OneArticle">
        <img id="displayImg" :src="this.route.params.img" alt="image article">
        <h2>
            {{ this.route.params.title }}
        </h2>
        <p>
            {{ this.route.params.text }}
        </p>
        <div v-if="this.route.params.id > 0">
            <div v-for="(article, index) in this.store" :key="index">
                <div v-if="article.title == this.mainArticle" class="rowOtherArticles">
                    <!-- Click on image => pass params of image click to goOneArticle function  -->
                    <img v-for="(image, key) in article.Articles" :key="key" @click="goOneArticle(article.Articles[key].id, article.Articles[key].title, article.Articles[key].img, article.Articles[key].text, this.mainArticle)" :src="image.img" alt="image article">
                </div>
            </div>
        </div>
        <!-- :id:title(\\d+)*:img:text:passTitle -->
        <div class="arrow" @click="handleSuccess()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.767947 0L0 0.767947L9.23205 10L0 19.2321L0.767947 20L10 10.7679L19.2321 20L20 19.2321L10.7679 10L20 0.767947L19.2321 0L10 9.23205L0.767947 0Z" fill="white"/>
            </svg>
        </div>
   </div>
</template>

<style scoped>

.arrow{
  position: relative;
  bottom: 5%;
  left: 0;
  right: 0;
}

#section_OneArticle{
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

#displayImg{
    width: 100vw;
    margin: 0;
}

#section_OneArticle h2{
    margin: -5vh 0 5vh 0;
    font-family: "PP-Acma";
    font-size: 41px;
    width: 50vw;
    text-align: right;
}

#section_OneArticle p{
    font-family: "PP-Radio";
    font-style: normal;
    font-size: 20px;
    line-height: 24px;
    width: 70%;
}

.rowOtherArticles{
    margin: 3vh 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
}

.rowOtherArticles img{
    width: 30%;
    height: auto;
}


</style>