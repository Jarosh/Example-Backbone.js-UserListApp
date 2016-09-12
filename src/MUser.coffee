class window.MUser extends Backbone.Model
    
  defaults:
    'name'      : ''
    'username'  : ''
    'email'     : ''        
    'phone'     : ''
    'website'   : ''
    'address'   :
      'street'  : ''
      'suite'   : ''
      'city'    : ''
      'zipcode' : ''
    
  
  validate: (attrs) ->
    errors = []
    
    if not attrs.email
      errors.push({ name: 'email', message: 'Please fill email field.' })
    else if !attrs.email.match(/^\S+@\S+$/) # oversimplified regexp
      errors.push({ name: 'email', message: 'Please enter a valid email.' })
      
    if not attrs.website
      errors.push({ name: 'website', message: 'Please fill website field.' })
    else if !attrs.website.match(/^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+$/) # oversimplified regexp
      errors.push({ name: 'website', message: 'Please enter a valid website (domain name only).' })
      
    if errors.length then errors else false

