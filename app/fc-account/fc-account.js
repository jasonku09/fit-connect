(function() {
  var baseUri;

  baseUri = "https://fitconnectapp.appspot.com";

  Polymer({
    is: "fc-account",
    properties: {
      actions: {
        type: Object,
        readOnly: true,
        value: {
          get: baseUri + "/api/account",
          login: baseUri + "/login",
          create: baseUri + "/api/account/create"
        }
      },
      token: {
        type: String,
        notify: true
      },
      account: Object,
      router: Object
    },
    ready: function() {
      if (!this.token) {
        this.router.go("/login");
      }
    },
    get: function() {
      var promise;
      if (this.account) {
        return Promise.resolve(this.account);
      }
      promise = this.$.ajax.send({
        url: this.actions.get,
        params: {
          token: this.token
        }
      });
      return promise.then((function(_this) {
        return function(account) {
          _this.account = account;
        };
      })(this));
    },
    login: function(form) {
      var promise;
      promise = this.$.ajax.send({
        method: "POST",
        url: this.actions.login,
        body: this._createFormData(form)
      });
      return promise.then(this._handleLoginResponse.bind(this));
    },
    create: function(form) {
      var promise;
      promise = this.$.ajax.send({
        method: "POST",
        url: this.actions.create
      });
      ({
        body: this._createFormData(form)
      });
      return promise.then(this._handleLoginResponse.bind(this));
    },
    _createFormData: function(form) {
      var data, item, key;
      data = new FormData();
      for (key in form) {
        item = form[key];
        data.append(key, item);
      }
      return data;
    },
    _handleLoginResponse: function(response) {
      this.token = response.token;
    }
  });

}).call(this);
