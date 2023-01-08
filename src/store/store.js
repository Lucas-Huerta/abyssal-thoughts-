import { defineStore } from "pinia";
import { ref } from "vue";
import { listProject } from "./Service"

export const useArticleStore = defineStore("articles", {
    state: () => ({ 
        articles: ref(null)
    }),
    actions: {
        async listArticles() {            
            const response = await listProject();
            // on stock les éléments d'authentification dans le localStorage
            localStorage.setItem("articles", response);
            // on modifie le store
            this.$patch((state) => {
                state.articles = response;
            });
        }, 
    },
}); 