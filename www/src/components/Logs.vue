<template>
  <div class="logs">
    <h3>Ship logs for Ship: {{activeShip.name}}</h3>
  </div>
</template>


<script>
  import router from '../router'
  export default {
    name: 'Logs',
    mounted(){
      if(!this.$store.state.user.name){ router.push({name: 'Login'})}
      this.$store.dispatch('getShipById', this.$route.params.shipId)
      this.$store.dispatch('getLogs', {_id: this.$route.params.shipId})
    },
    data(){
      return {
        shipId: this.$route.params.shipId
      }
    },
    computed: {
      user(){
        return this.$store.state.user
      },
      logs(){
        return this.$store.state.logs
      },
      activeShip(){
        return this.$store.state.activeShip
      }
    }
  }
</script>


<style>

</style>