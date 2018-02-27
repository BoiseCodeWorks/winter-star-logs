<template>
  <div class="login">
    <h3>Welcome To StarLogs Please Login:</h3>
    <form @submit.prevent="login">
      <input type="text"  v-model="user.email" placeholder="email">
      <input type="password" v-model="user.password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login(){
        this.$store.dispatch('login', this.user)
      }
    }
  }
</script>

<style>

</style>