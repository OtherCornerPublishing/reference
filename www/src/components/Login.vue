<template>
  <div class="login">
    <h4>Login</h4>
    <form @submit.prevent="login">
      <div class="form-group">
        <input type="email" class="form-control-small input-sm" v-model="email" placeholder="Email" required>
      </div>
      <div class="form-group">
        <input type="password" class="form-control-small input-sm" v-model="password" placeholder="Password" required>
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
    <p>Not a member?
      <router-link to="/register">Register</router-link>.</p>
  </div>
</template>


<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {},
  methods: {
    login() {
      this.$store.dispatch('login', { email: this.email, password: this.password })
    }
  },
  components: {}
}
</script>


<style scoped>
h4 {
  color: #fe0096;
  font-size: 16px;
  font-weight: bold;
  font-family: helvetica;
}

.btn-primary {
  background: #fe0096;
  color: #ffffff;
}

a {
  color: #fe0096;
}

p {
  padding-top: 10px;
  color: palevioletred;
}
</style>