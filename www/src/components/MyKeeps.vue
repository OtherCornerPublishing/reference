<template>
  <div class="keeps">
    <h2 class="header">Keeps</h2>
    <div class="row">
      <div v-for="keep in keeps">
        <div class="col-xs-6 col-sm-2">
          <div class="thumbnail">
            <img src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAnSAAAAJDU1YzJmNDRmLWZkYjgtNDVjOS05YzdjLWRiMWJkMjQyNzgwYw.png">
            <div class="caption">
              <h3>{{keep.title}}</h3>
              <p>{{keep.body}}</p>
              <button @click="deleteKeep(keep)" class="btn-small btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Create a new keep</h3>
        <form @submit.prevent="createKeep">
          <div class="form-group">
            <input type="text" class="form-control-small input-lg" v-model="title" placeholder="Keep Name" required>
          </div>
          <div class="form-group">
            <textarea rows="4" cols="50" class="form-control-small input-lg" v-model="body" placeholder="Body"></textarea>
          </div>
          <button class="btn vault" type="submit">Add Keep</button>
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
      imageURL: 'sadas',
      body: '',
      tags: '',
      articleURL: 'asda',
      creatorId: this.$store.state.user._id,
      private: false
    }
  },
  mounted() {
    this.$store.dispatch('getVaults')
    this.$store.dispatch('getKeeps')
  },
  computed: {
    vaults() {
      return this.$store.state.vaults
    },
    keeps() {
      return this.$store.state.keeps
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    createKeep() {
      this.$store.dispatch('createKeep', { title: this.title, imageURL: this.imageURL, body: this.body, tags: this.tags, articleURL: this.articleURL, creatorId: this.creatorId, private: this.private })
    },
    removeKeep(keep) {
      updateKeep(keep)
      this.$store.dispatch('getKeepsByVaultId', this.activeVault._id)
    },
    updateKeep(keep) {
      this.$store.dispatch('updateKeep', keep)
    },
    deleteKeep(keep) {
      this.$store.dispatch('deleteKeep', keep)
    },
    logout() {
      this.$store.dispatch('logout', this.user)
    }
  }
}
</script>