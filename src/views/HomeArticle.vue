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

    <!-- Sun svg -->
    <div class="sunSvg">
        <svg width="131" height="131" viewBox="0 0 131 131" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_14_89)">
            <path d="M64.9797 0.907471L63.6166 44.0117L56.82 1.41608L60.9121 44.3498L48.7862 2.93583L58.272 45.0229L41.0102 5.44236L55.7394 46.0188L33.6119 8.89606L53.351 47.3192L26.7108 13.2421L51.1469 48.909L20.4084 18.4135L49.1576 50.7608L14.8121 24.3281L47.4201 52.8439L10.0077 30.8883L45.9619 55.1281L6.06911 37.9967L44.8015 57.5737L3.05758 45.5406L43.9573 60.1442L1.02533 53.3952L43.4477 62.8L0 61.4447L43.2758 65.4984L0 69.5551L43.4477 68.1998L1.02533 77.6046L43.9573 70.8556L3.05758 85.4592L44.8015 73.426L6.06911 93.0031L45.9619 75.8717L10.0077 100.112L47.4201 78.1558L14.8121 106.672L49.1576 80.239L20.4084 112.586L51.1469 82.0907L26.7108 117.758L53.351 83.6805L33.6119 122.104L55.7394 84.981L41.0102 125.557L58.272 85.9769L48.7862 128.064L60.9121 86.65L56.82 129.584L63.6166 86.9881L64.9797 130.092L64.9797 0.907471Z" fill="white"/>
            <path d="M64.9795 0V5.15618L66.2351 44.9194L73.0348 2.32379L68.9427 45.2575L81.0655 3.84354L71.5797 45.9305L88.8415 6.35006L74.1154 46.9265L96.2398 9.80376L76.5037 48.2269L103.144 14.1498L78.7079 49.8167L109.443 19.3212L80.6941 51.6684L115.04 25.2358L82.4316 53.7547L119.847 31.799L83.8929 56.0358L123.786 38.9074L85.0533 58.4845L126.797 46.4513L85.8975 61.058L128.833 54.309L86.4102 63.7138L129.858 62.3554L86.5821 66.4121L129.858 70.4689L86.4102 69.1105L128.833 78.5153L85.8975 71.7663L126.797 86.3729L85.0533 74.3398L123.786 93.9169L83.8929 76.7885L119.847 101.025L82.4316 79.0696L115.04 107.589L80.6941 81.1559L109.443 113.503L78.7079 83.0076L103.144 118.674L76.5037 84.5974L96.2398 123.021L74.1154 85.8978L88.8415 126.474L71.5797 86.8937L81.0655 128.981L68.9396 87.5668L73.0317 130.501L66.2351 87.9049L64.9795 127.668V131.012C101.443 131.012 131.003 101.686 131.003 65.5137C131.003 29.3412 101.443 0 64.9795 0Z" fill="white"/>
        </g>
        <defs>
            <clipPath id="clip0_14_89">
                <rect width="131" height="131" fill="white"/>
            </clipPath>
        </defs>
        </svg>
    </div>

    <!-- star svg -->
    <div class="starSvg">
        <svg width="91" height="166" viewBox="0 0 91 166" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 86.2709C31.0227 86.2709 42.1955 66.0729 42.1955 0C42.3977 66.4 53.5832 86.2709 91 86.2709C54.0899 86.2709 42.3947 98.7308 42.1981 164.298C42.1981 164.861 42.1972 165.429 42.1955 166C42.1955 165.429 42.1964 164.861 42.1981 164.298C42.1942 98.5585 30.2436 86.2709 0 86.2709Z" fill="white"/>
        </svg>
    </div>

    <!-- square svg -->
    <div class="squareSvg">
        <svg width="222" height="186" viewBox="0 0 222 186" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.25" y="0.25" width="221.5" height="185.5" stroke="white" stroke-width="0.5"/>
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

.sunSvg, 
.squareSvg, 
.starSvg{
    display: none;
}

@media screen and (min-width: 500px) {
    .columArticle{
        flex-direction: row;
    }
    .rowArticle{
        flex-direction: column;
        height: 90vh;
    }

    .rowArticle h2{
       margin: 5vh 5vw;
       padding: 1vw 1vh;
       border: 2px white solid;
       background-color: rgba(255, 255, 255, 0.40);
       color: black;
       opacity: 0.40;
    }

    .rowArticle h2:hover, .rowArticle img:hover{
        cursor: pointer;
    }

    .rowArticle:nth-child(2){
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: end;
    }

    .rowArticle:nth-child(3){
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .svg{
        top: 30%;
        left: 0;
        right: 60%;
    }

    .sunSvg, 
    .squareSvg, 
    .starSvg{
        display: block;
        position: absolute;
    }

    .sunSvg{
        top: 10%;
        left: 15%;
    }

    .squareSvg{
        z-index: -1;
        bottom: 1%;
        right: 37vw;
    }

    .starSvg{
        bottom: 30%;
        right: 20vw;
    }
}

</style>