<template>
  <div class="Home">
    <h1>Welcome to Star-Logs! {{user.name}}</h1>

    <div>
      <h3>STARFLEET</h3>
      <div v-if="ships.length < 1">
        <img src="https://cdn.dribbble.com/users/15774/screenshots/1759511/spinner.gif" alt="" height="40">
      </div>
      <div v-else-if="ships.length == 1" class="ship" v-for="ship in ships">
        <h5 class="red">{{ship.name}} THE LAST SURVIVOR</h5>
      </div>
      <div v-else class="ship" v-for="ship in ships">
        <h5 :class="{active: activeShip == ship}">{{ship.name}}
          <router-link :to="{name: 'Logs', params: {shipId: ship._id}}">Logs</router-link>
          <button @click="removeShip(ship)">DESTROY</button>
        </h5>
      </div>

      <div v-if="logs.length > 0">
        <h3>LOGS FOR {{activeShip.name}}</h3>
        <div v-for="log in logs">
          <h5>{{log.title}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserProfile from './UserProfile.vue'

  export default {
    name: 'Home',
    mounted(){
      this.$store.dispatch('getShips')
    },
    data() {
      return {
        // component data only NO API OR DB STUFF HERE
        newUserData: {}
      }
    },
    methods: {
      updateUser() {
        console.log(1)
        this.$store.dispatch('updateUser', this.newUserData)
      },
      removeShip(ship) {
        console.log(1)
        this.$store.dispatch('removeShip', ship)
      },
      getLogs(ship) {
        this.$store.dispatch('getLogs', ship)
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      logs() {
        return this.$store.state.logs
      },
      ships() {
        return this.$store.state.ships
      },
      activeShip() {
        return this.$store.state.activeShip
      }
    },
    components: { UserProfile }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .active{
    color: blue;
  }

  .red{
    color: red;
  }
</style>