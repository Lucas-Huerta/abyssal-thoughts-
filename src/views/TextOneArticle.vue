<script>
import { ref, toRaw } from 'vue';
import { useRoute } from 'vue-router'

export default{
    data(){
        return{
            route: useRoute(), 
            pageArticle: ref(), 
            store: ref(), 
            mainArticle: ref({})
        }
    },

    async mounted(){
        this.store = this.$pinia.state.value.articles.articles; 
        console.log(this.route.params);
        console.log("store", this.store);
        console.log("ID", this.route.params.id);
        // TODO boucle sur le store avec l'id pris en compte pour trouver les images des autres articles et pousser avec leurs paramètres 
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
        <div v-if="this.route.params.id > 0" class="rowOtherArticles">
            <img :src="this.route.params.img" alt="image article">
            <img :src="this.route.params.img" alt="image article">
            <img :src="this.route.params.img" alt="image article">
        </div>
        <div class="arrow" @click="this.$router.go(-1)">
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
    width: 30vw;
    height: auto;
}


</style>