<template>
  <div class="home">
    <h1>Welcome to Keepr</h1>
    <p>Lets Get Started!</p>
    <ul>
      <li><router-link to="login"><button class="btn vault">Login</button></router-link></li>
      <li><router-link to="register"><button class="btn vault">Register</button></router-link></li>
    </ul>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'
export default {
  name: 'home',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  color: #fe0096;
}
p {
  color: #fe0096;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #fe0096;
}
button.vault {
  font-size: 25px;
  color: #000;
  font-weight: bold;
  font-family: Poppins;
  background-color: #fe0096;
  border-radius: 5px;
  border: 0px;
  padding: 10px;
  width: 100%;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}
</style>
