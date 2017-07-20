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
              <button v-if="this.showUnKeep" @click="removeKeep(keep)" class="btn-small">UnKeep</button>
              <button type="button" title="Add Keep" class="btn btn-default" @click="showAddKeep=true">Keep</button>
              <transition name="modal" v-if="showAddKeep">
                <div class="modal-mask">
                  <div class="modal-wrapper">
                    <div class="modal-container">
                      <div class="modal-header">
                        <slot name="vaults">Vaults</slot>
                      </div>
                      <div class="modal-body">
                        <slot name="body">
                          <div class="container">
                            <div class="row">
                              <div class="col-md-2">
                                <div class="row">
                                  <div class="col-md-12" v-for="vault in vaults">
                                    <button @click="addKeep(keep, vault._id)" class="btn-small">{{vault.title}}</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </slot>
                      </div>
                      <div class="modal-footer">
                        <slot name="footer">
                          <button class="modal-default-button" @click="showAddKeep=false">Close</button>
                        </slot>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dashboard',
  data() {
    return {
      showAddKeep: false,
      title: '',
      description: '',
      creatorId: this.$store.state.user._id
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
    addKeep(keep, vaultId) {
      this.$store.dispatch('addToVault', {keep: keep, vaultId: vaultId})
    },
    logout() {
      this.$store.dispatch('logout', this.user)
    }
  }
}
</script>