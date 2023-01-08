<script>
import { useRoute } from 'vue-router'

export default{
    data(){
        return{
            route: useRoute(), 
            idArticle: null
        }
    },

    // TODO ADD STORE PINIA + probleme composants se montent les uns sur les autres (terrible mais vrai)
    mounted(){
        console.log("params", this.route.params);
        console.log("query", this.route.query);
    },
}

</script>

<template>
    <div>
        component one article 
    </div>
</template>