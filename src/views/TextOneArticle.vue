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
        console.log(this.route.params);
        console.log("store", this.store);
        // for (const index in this.store) {
        //     console.log(index);
        //     for (const key in index) {
        //         if (key === this.route.params.index) {
        //             console.log("index store", this.store[key]);
        //             this.pageArticle = this.store[key].index;
        //         }  
        //     }
        // }

        // for (const key in object) {
        //     if (Object.hasOwnProperty.call(object, key)) {
        //         const element = object[key];
                
        //     }
        // }
    }

}

</script>

<template>
   <div id="section_OneArticle">
        <img :src="this.route.params.img" alt="image article">
        <h2>
            {{ this.route.params.title }}
        </h2>
        <p>
            {{ this.route.params.text }}
        </p>
        <div class="arrow" @click="this.$router.go(-1)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.767947 0L0 0.767947L9.23205 10L0 19.2321L0.767947 20L10 10.7679L19.2321 20L20 19.2321L10.7679 10L20 0.767947L19.2321 0L10 9.23205L0.767947 0Z" fill="white"/>
            </svg>
        </div>
   </div>
</template>

<style scoped>

#section_OneArticle{
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

#section_OneArticle img{
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


</style>