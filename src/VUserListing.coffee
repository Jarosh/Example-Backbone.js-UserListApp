class window.VUserListing extends Backbone.View
    
  events:
    'click .page' : 'onPaginate'
    
    
  initialize: (options) ->
    @options = options        
    @collection.on('sync', @render)
    @render()

  
  onPaginate: (evt) ->
    @collection.state.currentPage = parseInt($(evt.target).attr('data-page'))
    @render()
    

  template: (data) ->
    _.template(jQuery("#UserListing").html())(data)


  renderPagination: () ->
    _.template(jQuery("#Paginator").html())({
        collection : @collection,
    })
    

  render: =>
    $(@.el).html(@template({
        collection : @collection,
        pagination : @renderPagination(),
    }))
    @

