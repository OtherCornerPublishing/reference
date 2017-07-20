<template>
  <div class="vaults">
    <h2 class="header">Vaults</h2>
    <div class="row">
      <div v-for="vault in vaults">
        <div class="col-xs-6 col-sm-2">
          <router-link :to="'/vaults/'+vault._id">
            <button @click="activeVault(vault._id)" class="btn vault">{{vault.title}}</button>
            <p>{{vault.description}}</p>
          </router-link>
          
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-xs-12">
        <h2 class="header">Create a new vault</h2>
        <form @submit.prevent="createVault">
          <div class="form-group">
            <input type="text" class="form-control-small input-lg" v-model="title" placeholder="Vault Name" required>
          </div>
          <div class="form-group">
            <textarea rows="4" cols="50" class="form-control-small input-lg" v-model="description" placeholder="Description"></textarea>
          </div>
          <div  class="col-xs-4 col-xs-offset-4">
          <button class="btn vault" type="submit">Add Vault</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dashboard',
  data() {
    return {
      title: '',
      description: '',
      creatorId: this.$store.state.user._id
    }
  },
  mounted() {
    this.$store.dispatch('getVaults')
  },
  computed: {
    vaults() {
      return this.$store.state.vaults
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    createVault() {
      this.$store.dispatch('createVault', { title: this.title, description: this.description, creatorId: this.creatorId })
      this.title = ''
      this.description = ''
    },
    removeVault(vault) {
      this.$store.dispatch('removeVault', vault)
    },
    activeVault(vaultId) {
      this.$store.dispatch('getActiveVault', vaultId)
    },
    logout() {
      this.$store.dispatch('logout', this.user)
    }
  }
}
</script>
<style>

.header {
  font-family: helvetica;
  font-size: 30px;
  color: #fe0096;
}

h3 {
  font-family: helvetica;
  font-size: 18px;
  color: #fe0096;
}

a {
  color: #fe0096;
  font-size: 14px;
  font-weight: bold;
}

p.logout {
  margin-top: 25px;
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

button.vault:hover {
  background-color: #9a9a9a;
  color: #fff;
}

button.logout {
  font-size: 18px;
  color: black;
  font-weight: bold;
  font-family: Poppins;
  background-color: #fe0096;
  border-radius: 5px;
  border: 0px;
  padding: 7px;
  margin-right: 5px;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}
button.toggles {
  font-size: 18px;
  color: black;
  font-weight: bold;
  font-family: Poppins;
  background-color: #fe0096;
  border-radius: 5px;
  border: 0px;
  padding: 7px;
  margin-right: 5px;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}

button.logout:hover {
  background-color: #9a9a9a;
  color: #fff;
}

button.toggles:hover {
  background-color: #9a9a9a;
  color: #fff;
}
</style>
 