<template>
  <div>
    <h1>{{user.name}}</h1>
  </div>
</template>



<script>
  export default {
    name: 'user-profile',
    computed:{
      user(){
        return this.$store.state.user
      }
    }
  }
</script>