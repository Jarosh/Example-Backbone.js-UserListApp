class window.AppRouter extends Backbone.Router
  
  $container: $('#app')
    
    
  routes:
    ""          : 'viewUserListing'
    "users"     : 'viewUserListing'
    "users/:id" : 'viewUserDetails'


  initialize: ->
    @collection_user = new CUser( null, { mode: 'client', state: { pageSize: 5 } } )
    @collection_user.fetch()
    
    @viewUserListing()
    
    Backbone.history.start({ root: '/', pushState: true })
    
    window.onpopstate = () =>
      APP.INST.navigate(Backbone.history.fragment, true)
      
    $(document).on('click', 'a:not([data-bypass])', (evt) ->
      href = $(@).attr('href')
      protocol = @protocol + '//'
      if href.slice(protocol.length) isnt protocol
        evt.preventDefault()
        APP.INST.navigate(href, true)
    )
        
        
  viewUserListing: ->
    this.$container.html((new VUserListing({
      collection: @collection_user
    })).render().el)
  
  
  viewUserDetails: (id) ->
    this.$container.html((new VUserDetails({
      collection: @collection_user,
      id: id
    })).render().el)

