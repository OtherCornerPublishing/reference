import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let api = axios.create({
  baseURL: 'keeprd.herokuapp.com/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'keeprd.herokuapp.com/',
  timeout: 2000,
  withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
  user: {},
  vaults: [],
  myKeeps: [],
  activeVault: {},
  activeKeep: {},
  keeps: [],
  error: {}
}

let handleError = (err) => {
  state.error = err
}

export default new Vuex.Store({
  // ALL DATA LIVES IN THE STATE
  state,
  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  mutations: {
    setKeeps(state, keeps) {
      state.keeps = keeps
    },
    setNewKeep(state, keep) {
      state.keeps.push(keep)
    },
    setVaults(state, vaults) {
      state.vaults = vaults
    },
    setNewVault(state, vault) {
      state.vaults.push(vault)
    },
    setActiveVault(state, activeVault) {
      state.activeVault = activeVault
    },
    setMyKeeps(state, myKeeps) {
      state.myKeeps = myKeeps
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    getKeeps({ commit, dispatch }) {
      api('keeps')
        .then(res => {
          commit('setKeeps', res.data.data)
        })
        .catch(handleError)
    },
    getMyKeeps({ commit, dispatch }) {
      api('userkeeps')
        .then(res => {
          commit('setMyKeeps', res.data.data)
        })
        .catch(handleError)
    },
    getKeepsByVaultId({ commit, dispatch }, vaultId) {
      api('vaults/' + vaultId + '/keeps')
        .then(res => {
          commit('setKeeps', res.data.data)
        })
        .catch(handleError)
    },
    addToVault({ commit, dispatch }, data) {
      api.put('addtovault/' + data.keep._id, data)
        .then(res => {
          dispatch('getKeeps')
        })
        .catch(handleError)
    },
    getActiveVault({ commit, dispatch }, vaultId) {
      api('vaults/' + vaultId)
        .then(res => {
          commit('setActiveVault', res.data.data)
        })
        .catch(handleError)
    },
    getVaults({ commit, dispatch }) {
      api('uservaults')
        .then(res => {
          commit('setVaults', res.data.data)
        })
        .catch(handleError)
    },
    removeVault({ commit, dispatch }, vault) {
      api.delete('vaults/' + vault._id)
        .then(res => {
          dispatch('getVaults')
          router.push('/dashboard')
        })
        .catch(handleError)
    },
    removeKeep({ commit, dispatch }, data) {
      api.put('keeps/' + data.keep._id, data)
        .then(res => {
          dispatch('getKeepsByVaultId')
        })
        .catch(handleError)
    },
    deleteKeep({ commit, dispatch }, keep){
      console.log(keep)
      api.delete('keeps/' + keep._id)
      var keepIndex = state.keeps.indexOf(keep)
      state.keeps.splice(keepIndex, 1)
    },
    createVault({ commit, dispatch }, vault) {
      api.post('vaults', vault)
        .then(res => {
          commit('setNewVault', res.data.data)
            .then(res => {
              dispatch(getVaults)
                .then(res => {
                  commit('setVaults', res.data.data)
                })
            })
        })
        .catch(handleError)
    },
    createKeep({ commit, dispatch }, keep) {
      api.post('keeps', keep)
        .then(res => {
          commit('setNewKeep', res.data.data)
            .then(res => {
              dispatch(getKeeps)
                .then(res => {
                  commit('setKeeps', res.data.data)
                })
            })
        })
        .catch(handleError)
    },
    register({ commit, dispatch }, user) {
      auth.post('register', user)
        .then(res => {
          if (res.data.error) {
            return handleError(res.data.error)
          }
          commit('setUser', res.data.data)
          router.push('/vaults')
        })
        .catch(handleError)
    },
    login({ commit, dispatch }, user) {
      auth.post('login', user)
        .then(res => {
          commit('setUser', res.data.data)
          router.push('/dashboard')
        }).catch(handleError)
    },
    getAuth({ commit, dispatch }) {
      auth('authenticate')
        .then(res => {
          commit('setUser', res.data.data)
          if (state.user === null) {
            router.push('/login')
          } else {
            router.push('/dashboard')
          }
        }).catch(err => {
          router.push('/login')
        })
    },
    logout({ commit, dispatch }, user) {
      auth.delete('logout', user)
        .then(res => {
          router.push('/')
        }).catch(handleError)
    }
  }
})

