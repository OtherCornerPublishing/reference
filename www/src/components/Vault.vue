<template>
  <div class="vault">
    <div class="row">
      <div class="col-xs-6">
      </div>
      <div class="col-xs-6">
        <p class="logout pull-right">
          <router-link :to="'/dashboard'">
            <button class="logout">Dashboard</button>
          </router-link>
          <button class="logout" @click="logout(user)">Logout</button>
        </p>
      </div>
    </div>
    <h1>{{vault.title}}</h1>
    <button @click="removeVault(vault)" class="btn-small">Delete</button>
    <h2 class="header">Keeps</h2>
    <div class="row">
      <div v-for="keep in keeps">
        <div class="col-xs-6 col-sm-2">
          <div class="thumbnail">
            <img src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAnSAAAAJDU1YzJmNDRmLWZkYjgtNDVjOS05YzdjLWRiMWJkMjQyNzgwYw.png">
            <div class="caption">
              <h3>{{keep.title}}{{keep.name}}</h3>
              <p>{{keep.body}}</p>
                <button @click="removeKeep(keep)" class="btn-small">UnKeep</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Keeps from './Keeps'
export default {
  name: 'vault',
  data() {
    return {
      showUnKeep: true,
      title: '',
      imageURL: 'sadas',
      body: '',
      tags: '',
      articleURL: 'asda',
      creatorId: this.$store.state.user._id,
      private: false
    }
  },
  created(){
    this.$store.state.keeps = []
  },
  mounted() {
    this.$store.dispatch('getKeepsByVaultId', this.$route.params.id)
  },
  computed: {
    keeps() {
      return this.$store.state.keeps
    },
    vault() {
      return this.$store.state.activeVault
    }
  },
  methods: {
    removeVault(vault) {
      this.$store.dispatch('removeVault', vault)
    },
    removeKeep(keep, vault) {
      this.$store.dispatch('getKeepsByVaultId',{keep: keep, vaultId: this.vault._id})
    },
    logout() {
      this.$store.dispatch('logout', this.user)
    }
  },
  components: {
    Keeps
  }
}
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
  color: #fe0096;
}

h1 {
  font-family: helvetica;
  font-size: 30px;
  color: #fe0096;
}

h2 {
  font-family: helvetica;
  font-size: 20px;
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
  font-size: 18px;
  color: #000;
  font-weight: bold;
  font-family: Poppins;
  background-color: #fe0096;
  border-radius: 5px;
  border: 0px;
  padding: 10px;
  width: 10%;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}

button.vault:hover {
  background-color: #9a9a9a;
  color: #fff;
}

button.logout {
  font-size: 16px;
  color: black;
  font-weight: bold;
  font-family: Poppins;
  background-color: #fe0096;
  border-radius: 5px;
  border: 0px;
  padding: 7px;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}

button.logout:hover {
  background-color: #9a9a9a;
  color: #fff;
}

hr {
  border-top: 3px double #8c8b8b;
}
</style>