class window.VAddress extends Backbone.View
    
    
  initialize: (options) ->
    @options = options
    @render()
    
    
  template: (data) ->
    _.template(jQuery("#Address").html())(data)
    
    
  render: =>
    $(@.el).html(@template({
        address : @options.address,
    }))
    @

