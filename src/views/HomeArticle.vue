<script>

export default{

    data(){
        return{
            tabArticles: null
        }
    },

    props: {
        // props to load one article
        Article: null
    },

    // fetch data at the component is mounted
    async mounted(){
        await this.fetchData()
    },

    methods: {
        /**
         * Fetch datas in data.json (in public/data)
         */
        async fetchData(){
            const res = await fetch('../data/data.json'); 
            this.tabArticles = await res.json();
            console.log("data in home: ", this.tabArticles); 
        }, 

        // push to one Article with the data of the one article
        async goOneArticle(idArticle){
            await this.$router.push({
                name: "article", 
                params: {
                    idArticle: idArticle
                },
                query: {idArticle: idArticle},
                state: {idArticle}})
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
        <div v-for="article in this.tabArticles" :key="article">
            <div class="rowArticle" @click="goOneArticle(article.Articles)">
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