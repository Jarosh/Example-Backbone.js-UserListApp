(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.AppRouter = (function(superClass) {
    extend(AppRouter, superClass);

    function AppRouter() {
      return AppRouter.__super__.constructor.apply(this, arguments);
    }

    AppRouter.prototype.$container = $('#app');

    AppRouter.prototype.routes = {
      "": 'viewUserListing',
      "users": 'viewUserListing',
      "users/:id": 'viewUserDetails'
    };

    AppRouter.prototype.initialize = function() {
      this.collection_user = new CUser(null, {
        mode: 'client',
        state: {
          pageSize: 5
        }
      });
      this.collection_user.fetch();
      this.viewUserListing();
      Backbone.history.start({
        root: '/',
        pushState: true
      });
      window.onpopstate = (function(_this) {
        return function() {
          return APP.INST.navigate(Backbone.history.fragment, true);
        };
      })(this);
      return $(document).on('click', 'a:not([data-bypass])', function(evt) {
        var href, protocol;
        href = $(this).attr('href');
        protocol = this.protocol + '//';
        if (href.slice(protocol.length) !== protocol) {
          evt.preventDefault();
          return APP.INST.navigate(href, true);
        }
      });
    };

    AppRouter.prototype.viewUserListing = function() {
      return this.$container.html((new VUserListing({
        collection: this.collection_user
      })).render().el);
    };

    AppRouter.prototype.viewUserDetails = function(id) {
      return this.$container.html((new VUserDetails({
        collection: this.collection_user,
        id: id
      })).render().el);
    };

    return AppRouter;

  })(Backbone.Router);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.MUser = (function(superClass) {
    extend(MUser, superClass);

    function MUser() {
      return MUser.__super__.constructor.apply(this, arguments);
    }

    MUser.prototype.defaults = {
      'name': '',
      'username': '',
      'email': '',
      'phone': '',
      'website': '',
      'address': {
        'street': '',
        'suite': '',
        'city': '',
        'zipcode': ''
      }
    };

    MUser.prototype.validate = function(attrs) {
      var errors;
      errors = [];
      if (!attrs.email) {
        errors.push({
          name: 'email',
          message: 'Please fill email field.'
        });
      } else if (!attrs.email.match(/^\S+@\S+$/)) {
        errors.push({
          name: 'email',
          message: 'Please enter a valid email.'
        });
      }
      if (!attrs.website) {
        errors.push({
          name: 'website',
          message: 'Please fill website field.'
        });
      } else if (!attrs.website.match(/^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+$/)) {
        errors.push({
          name: 'website',
          message: 'Please enter a valid website (domain name only).'
        });
      }
      if (errors.length) {
        return errors;
      } else {
        return false;
      }
    };

    return MUser;

  })(Backbone.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.CUser = (function(superClass) {
    extend(CUser, superClass);

    function CUser() {
      return CUser.__super__.constructor.apply(this, arguments);
    }

    CUser.prototype.model = MUser;

    CUser.prototype.url = APP.HOST.api + '/users';

    CUser.prototype.initialize = function(models, options) {};

    return CUser;

  })(Backbone.PageableCollection);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.VAddress = (function(superClass) {
    extend(VAddress, superClass);

    function VAddress() {
      this.render = bind(this.render, this);
      return VAddress.__super__.constructor.apply(this, arguments);
    }

    VAddress.prototype.initialize = function(options) {
      this.options = options;
      return this.render();
    };

    VAddress.prototype.template = function(data) {
      return _.template(jQuery("#Address").html())(data);
    };

    VAddress.prototype.render = function() {
      $(this.el).html(this.template({
        address: this.options.address
      }));
      return this;
    };

    return VAddress;

  })(Backbone.View);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.VUserDetails = (function(superClass) {
    extend(VUserDetails, superClass);

    function VUserDetails() {
      this.render = bind(this.render, this);
      return VUserDetails.__super__.constructor.apply(this, arguments);
    }

    VUserDetails.prototype.events = {
      'click .btn-edit': 'onEdit',
      'click .btn-save': 'onSave',
      'click .btn-cancel': 'onCancel',
      'input input': 'onChange'
    };

    VUserDetails.prototype.initialize = function(options) {
      this.options = options;
      this.collection.on('sync', this.render);
      return this.render();
    };

    VUserDetails.prototype.onEdit = function(evt) {
      return $(this.el).find('.editable').removeClass('mode-show').addClass('mode-edit');
    };

    VUserDetails.prototype.onSave = function(evt) {
      var inp, mod;
      $(evt.target).attr('disabled', true);
      inp = $(evt.target).closest('.mode-edit').find('input');
      mod = this.collection.fullCollection.get(this.options.id);
      mod.save({
        email: $(this.el).find('input[name="email"]').val(),
        website: $(this.el).find('input[name="website"]').val()
      }, {
        patch: true,
        success: function() {
          return $(this.el).find('.editable').removeClass('mode-edit').addClass('mode-show');
        },
        error: function(model, error) {
          return alert('An unexpected error occurred.');
        }
      });
      if (mod.validationError) {
        this.showErrors(mod.validationError);
        return $(evt.target).attr('disabled', false);
      }
    };

    VUserDetails.prototype.onCancel = function(evt) {
      return this.render();
    };

    VUserDetails.prototype.onChange = function(evt) {
      return $(evt.target).closest('.mode-edit').removeClass('mode-error').find('.error').html('');
    };

    VUserDetails.prototype.showErrors = function(errors) {
      $(this.el).find('.mode-error').removeClass('mode-error').find('.error').html('');
      return _.each(errors, (function(_this) {
        return function(error) {
          return $(_this.el).find('input[name="' + error.name + '"]').closest('.mode-edit').addClass('mode-error').find('.error').html(error.message);
        };
      })(this));
    };

    VUserDetails.prototype.template = function(data) {
      return _.template(jQuery("#UserDetails").html())(data);
    };

    VUserDetails.prototype.render = function() {
      var mod;
      if (this.collection.length) {
        mod = this.collection.fullCollection.get(this.options.id);
        $(this.el).html(this.template({
          user: mod
        }));
        new VAddress({
          el: $(this.el).find('.VAddress'),
          address: mod.get('address')
        });
      }
      return this;
    };

    return VUserDetails;

  })(Backbone.View);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.VUserListing = (function(superClass) {
    extend(VUserListing, superClass);

    function VUserListing() {
      this.render = bind(this.render, this);
      return VUserListing.__super__.constructor.apply(this, arguments);
    }

    VUserListing.prototype.events = {
      'click .page': 'onPaginate'
    };

    VUserListing.prototype.initialize = function(options) {
      this.options = options;
      this.collection.on('sync', this.render);
      return this.render();
    };

    VUserListing.prototype.onPaginate = function(evt) {
      this.collection.state.currentPage = parseInt($(evt.target).attr('data-page'));
      return this.render();
    };

    VUserListing.prototype.template = function(data) {
      return _.template(jQuery("#UserListing").html())(data);
    };

    VUserListing.prototype.renderPagination = function() {
      return _.template(jQuery("#Paginator").html())({
        collection: this.collection
      });
    };

    VUserListing.prototype.render = function() {
      $(this.el).html(this.template({
        collection: this.collection,
        pagination: this.renderPagination()
      }));
      return this;
    };

    return VUserListing;

  })(Backbone.View);

}).call(this);
