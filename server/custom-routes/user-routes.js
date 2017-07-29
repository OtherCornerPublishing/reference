let Cards = require('../models/card')
let Decks = require('../models/deck')
let Places = require('../models/place')

export default {
  getcardsByDeckId: {
    path: '/decks/:deckId/cards',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return deck and associated cards'
      Decks.findById(req.params.deckId)
        .then(deck => {
          Cards.find({ deckId: req.params.deckId })
            .then(cards => {
              deck.cards = cards
              res.send(handleResponse(action, deck.cards))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getCardsByUserId: {
    path: '/usercards/',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return users associated cards'
      Cards.find({ userId: req.session.uid })
        .then(cards => {
          res.send(handleResponse(action, cards))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getCards: {
    path: '/cards',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get all cards'
      Cards.find()
        .then(cards => {
          var cardsList = []
          for (var i = 0; i < cards.length; i++) {
            var card = cards[i]
            if (card.secret == false) {
              cardsList.push(card)
            }
          }
          res.send(handleResponse(action, cardsList))
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