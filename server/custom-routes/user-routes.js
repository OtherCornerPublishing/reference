let Vaults = require('../models/vault')
let Keeps = require('../models/keep')

export default {
  getKeepsByVaultId: {
    path: '/vaults/:vaultId/keeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return vault and associated keeps'
      Vaults.findById(req.params.vaultId)
        .then(vault => {
          Keeps.find({ vaults: { $in: [req.params.vaultId] } })
            .then(keeps => {
              vault.keeps = keeps
              res.send(handleResponse(action, vault.keeps))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  addKeepToVault: {
    path: '/addtovault/:keepId',
    reqType: 'put',
    method(req, res, next) {
      let action = 'return vault and associated keeps'
      Keeps.findById(req.params.keepId)
        .then(keep => {
          keep.vaults.push(req.body.vaultId)
          keep.keepCount++
        })
        .catch(handleResponse)
    }
  },
  getVaultsByUserId: {
    path: '/uservaults',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return user associated keeps'
      Vaults.find({ creatorId: req.session.uid })
        .then(vaults => {
          res.send(handleResponse(action, vaults))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getKeepsByUserId: {
    path: '/userkeeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return user associated keeps'
      Keeps.find({ userId: req.session.uid })
        .then(keeps => {
          res.send(handleResponse(action, keeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getKeepsByTag: {
    path: '/keeps/:tag',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return user associated keeps'
      Keeps.find({ tags: req.params.tag })
        .then(keeps => {
          var publicKeeps = []
          for (var i = 0; i < keeps.length; i++) {
            var keep = keeps[i]
            if (keep.private == false) {
              publicKeeps.push(keep)
            }
          }
          res.send(handleResponse(action, publicKeeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getKeeps: {
    path: '/keeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find keeps'
      Keeps.find()
        .then(keeps => {
          var publicKeeps = []
          for (var i = 0; i < keeps.length; i++) {
            var keep = keeps[i]
            if (keep.private == false) {
              publicKeeps.push(keep)
            }
          }
          res.send(handleResponse(action, publicKeeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }
}

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}
        // {creatorId: req.session.uid}