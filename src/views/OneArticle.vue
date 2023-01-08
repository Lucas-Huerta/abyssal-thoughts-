<script>
import { useRoute } from 'vue-router'

export default{
    data(){
        return{
            route: useRoute(), 
            pageArticle: null, 
            store: null
        }
    },

    mounted(){
        this.store = this.$pinia.state.value.articles.articles; 

        // DEBUG

        // console.log(this.store);
        // console.log("PINIA",this.$pinia.state.value.articles.articles);
        // console.log("params", this.route.params.index);

        /**
         * for in loop 
         * index => name of the article in loop
         * this.route.params.index => name of article to find (pass in router)
         */
        for (const index in this.store) {
            if (index === this.route.params.index) {
                this.pageArticle = this.store[index];
                console.log("good", this.pageArticle);
            }  
        }
       
    },
}

</script>

<template>
    <!-- TODO Add front of article -->
    <div>
        component one article 
    </div>
</template>