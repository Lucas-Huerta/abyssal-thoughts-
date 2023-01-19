<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import anime from 'animejs';

export default{
    data(){
        return{
            route: useRoute(), 
            pageArticle: ref(), 
            store: ref(), 
            idArticle: ref(), 
            titleArticle: null, 
            main: null, 
            imageOneArticle: null
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
        
        // change background (à améliorer)
        this.main = document.getElementById("main"); 
        if(this.titleArticle == "art"){
            this.main.classList.add('black'); 
        }
        else if(this.titleArticle == "offf!"){
            this.main.classList.add('offf'); 
        }
        else{
            this.main.classList.add('history'); 
        }
    },

    methods: {
        async goHome(){
            anime({
                targets: this.$refs.svg, 
                translateY: 300, 
                easing: 'easeInOutQuad',
                duration: 500,
                complete: () => {
                    this.$router.push({
                        name: "Home"
                    })
                }
            });

            anime({
                targets: [this.$refs.imageArticle, this.$refs.titleArticle], 
                opacity: 0.3, 
                easing: 'easeInOutQuad',
                duration: 500,
                complete: () => {
                    this.$router.push({
                        name: "Home"
                    })
                }
            });
        }, 

        async goArticle(idWichGo, title, img, text){

            let id = await this.idArticle; 
            let passTitle = await this.titleArticle; 

            // trigger image clicked in v-for
            for (let i = 0; i < this.$refs.imageArticle.length; i++) {
                if(i == idWichGo){
                    this.imageOneArticle = this.$refs.imageArticle[i];
                }
            }

            // anim arrow 
            anime({
                targets: this.$refs.arrow, 
                translateX: 150, 
                translateY: 350, 
                easing: 'easeInOutQuad',
                duration: 500,
            });

            //anim all title
            anime({
                targets: this.$refs.titleArticle, 
                opacity: 0, 
                easing: 'easeInOutQuad',
                duration: 500,
            });

            // animl img
            anime({
                targets: this.imageOneArticle, 
                translateX: -100, 
                translateY: -200, 
                scale: 2, 
                easing: 'easeInOutQuad',
                duration: 500,
                complete: () => {
                    this.$router.push({
                        name: "OneArticle", 
                        params: {id, passTitle, title, img, text}, 
                    })
                }
            });
        }
    }
}
</script>

<template>
    <div id="main">
        <!-- circle svg -->
        <div class="svg" ref="svg">
            <svg width="222" height="222" viewBox="0 0 222 222" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="111" cy="111" r="110.75" stroke="white" stroke-width="0.5"/>
            </svg>
        </div>

        <!-- arrow svg -->
        <div class="arrow" @click="goHome()" ref="arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.767947 0L0 0.767947L9.23205 10L0 19.2321L0.767947 20L10 10.7679L19.2321 20L20 19.2321L10.7679 10L20 0.767947L19.2321 0L10 9.23205L0.767947 0Z" fill="white"/>
            </svg>
        </div>

        <RouterLink to="/">
            <h1 class="mainTitle">Abyssal thought</h1>
        </RouterLink>
        
        <div v-if="this.pageArticle" id="titleArticle">
            <h2>
                {{ this.route.params.index }}
            </h2>
        </div>
        <div class="columnArticle" ref="addClassDesktop">
            <div v-for="article in this.pageArticle" :key="article" class="row" @click="goArticle(article.id, article.title, article.img, article.text)">
                <h2 ref="titleArticle">
                    {{ article.title }}
                </h2>
                <img :src="article.img" alt="image article" ref="imageArticle" />
                <span class="buttonDesktop">Buy</span>
            </div>
        </div>
    </div>
    
   
</template>

<style scoped>
.black{
    position: fixed;
    width: 100vw; 
    height: 100vh;
    background-color: #040404;
}

.offf{
    position: fixed;
    width: 100vw; 
    height: 100vh;
    background-color: #171717;
}

.history{
    position: fixed;
    width: 100vw; 
    height: 100vh;
    background-color: #1F1F1F;
}

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

.buttonDesktop{
    display: none;
}

@media screen and (min-width: 500px) {

    .black .columnArticle .row h2{
        display: none;
    }

    .offf .buttonDesktop, 
    .history .buttonDesktop{
        display: none;
    }

    .offf .columnArticle, 
    .history .columnArticle{
       min-height: 0;
    }

    .offf .columnArticle .row h2, 
    .history .columnArticle .row h2{
        padding: 10vh 0 0 0;
        width: 10vw;
    }

    /* Image les unes sur les autres  */

    .offf .columnArticle, 
    .history .columnArticle{
       flex-direction: column;
       align-items: flex-start;
    }

    .offf .columnArticle .row, 
    .history .columnArticle .row{
       flex-direction: row-reverse;
       align-items: center;
       justify-content: center;
    }

    .offf .columnArticle .row:nth-of-type(2), 
    .history .columnArticle .row:nth-of-type(2){
        flex-direction: row-reverse;
    }

    .offf .columnArticle .row img, 
    .history .columnArticle .row img{
       width: 60vw;
       margin: 0 0 -80vh 0;
    }

    .offf .columnArticle .row img:nth-of-type(1), 
    .history .columnArticle .row img:nth-of-type(1){
       z-index: 7;
    }
    .offf .columnArticle .row img:nth-of-type(2), 
    .history .columnArticle .row img:nth-of-type(2){
        z-index: 8;
    }
    .offf .columnArticle .row img:nth-of-type(3), 
    .history .columnArticle .row img:nth-of-type(3){
        z-index: 9;
    }
    .offf .columnArticle .row img:nth-of-type(4), 
    .history .columnArticle .row img:nth-of-type(4){
        z-index: 10;
    }

    #titleArticle{
        top: 10%;
        left: 50%;
        right: 40%;
        font-size: 30px;
    }

    #titleArticle h2{
        margin: 0;
    }

    .columnArticle{
        flex-direction: row;
        width: 100vw;
        justify-content: space-evenly;
        align-items: center;
    }
    .columnArticle .row{
        flex-direction: column;
        align-items: center;
    }

    .columnArticle .row:nth-of-type(2){
        flex-direction: row;
        align-items: flex-end;
    }

    .columnArticle .row:nth-of-type(3){
        justify-content: flex-start;
        align-items: flex-start;
    }

    .columnArticle .row img{
        width: 100%;
        height: 100%;
    }

    .buttonDesktop{
        font-family: "PP-Acma";
        font-size: 20px;
        display: flex;
        padding: 1vh 2vw;
        border: 2px white solid;
        background-color: rgba(255, 255, 255, 0.40);
        color: black;
        opacity: 0.40;
        margin: 2vh 2vw;
    }

    .buttonDesktop:hover{
        cursor: pointer;
    }

    .arrow{
        display: none;
    }
}
</style>