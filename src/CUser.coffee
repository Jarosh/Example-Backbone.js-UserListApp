class window.CUser extends Backbone.PageableCollection
  
  model: MUser
  url: APP.HOST.api+'/users'
    
    
  initialize: (models, options) ->

