<template>
  <div class="content_inner" :style="'min-height:' + boxH + 'px'">
    <!-- <transition name="fade"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>
<script>
  export default {
    name: 'Content',
    data () {
      return {
      	boxH: 0
      }
    },
    methods:{
    },
    created(){
    	this.boxH = document.body.clientHeight - 50 - 40;
    },
    mounted(){
    }
  }
</script>

<style lang='scss'>
	.content_inner{margin: 20px 20px 0;background-color: #fff;}
	.fade-enter-active,
	.fade-leave-active {
	    transition: opacity .3s
	}

	.fade-enter,
	.fade-leave-active {
	    opacity: 0
	}
</style>
