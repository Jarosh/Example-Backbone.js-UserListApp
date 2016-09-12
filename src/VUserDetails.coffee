class window.VUserDetails extends Backbone.View
  
  events:
    'click .btn-edit'   : 'onEdit'
    'click .btn-save'   : 'onSave'
    'click .btn-cancel' : 'onCancel'
    'input input'       : 'onChange'


  initialize: (options) ->
    @options = options
    @collection.on('sync', @render)
    @render()


  onEdit: (evt) ->
    $(@.el).find('.editable').removeClass('mode-show').addClass('mode-edit')
    
    
  onSave: (evt) ->
    $(evt.target).attr('disabled',true)
    
    inp = $(evt.target).closest('.mode-edit').find('input')
    mod = @collection.fullCollection.get(@options.id)
    mod.save(
      {
        email: $(@.el).find('input[name="email"]').val(),
        website: $(@.el).find('input[name="website"]').val(),
      },
      {
        patch: true
        success: ->
          $(@.el).find('.editable').removeClass('mode-edit').addClass('mode-show')
        error: (model, error) ->
          alert('An unexpected error occurred.')
      }
    )
    
    if mod.validationError
      @showErrors(mod.validationError)
      $(evt.target).attr('disabled',false)
    
    
  onCancel: (evt) ->
    @render()
    
    
  onChange: (evt) ->
    $(evt.target).closest('.mode-edit')
      .removeClass('mode-error')
      .find('.error').html('')
    
    
  showErrors: (errors) ->
    $(@.el).find('.mode-error')
      .removeClass('mode-error')
      .find('.error').html('')
    _.each(errors, (error) =>
      $(@.el).find('input[name="'+error.name+'"]')
        .closest('.mode-edit')
        .addClass('mode-error')
        .find('.error')
        .html(error.message)
    )
  
    
  template: (data) ->
    _.template(jQuery("#UserDetails").html())(data)
    
    
  render: =>
    if @collection.length
      mod = @collection.fullCollection.get(@options.id)
      $(@.el).html(@template({
          user    : mod,
      }))
      new VAddress({
          el      : $(@.el).find('.VAddress'),
          address : mod.get('address'),
      })
    @
  
  