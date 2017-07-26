const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  deck: {
    name: 'Deck',
    endpoint: 'decks'
  },
  card: {
    name: 'Card',
    endpoint: 'cards'
  }
}


export  {
  actions,
  models
}