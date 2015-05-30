(function() {
  Polymer({
    is: "wxy-jsonapi",
    properties: {
      uri: String,
      token: String,
      list: Object
    },
    getList: function() {
      var promise;
      if (this.list) {
        return Promise.resolve(this.list.data);
      }
      promise = this.$.ajax.send({
        method: "GET",
        url: this.uri,
        params: {
          token: this.token
        }
      });
      return promise.then((function(_this) {
        return function(list) {
          _this.list = list;
          return _this.list.data;
        };
      })(this));
    },
    get: function() {},
    post: function(form) {
      form.token = this.token;
      return this.getList().then((function(_this) {
        return function() {
          var promise;
          promise = _this.$.ajax.send({
            method: "POST",
            url: _this.uri,
            body: JSON.stringify(form),
            params: {
              token: _this.token
            }
          });
          return promise;
        };
      })(this));
    },
    put: function() {},
    "delete": function() {}
  });

}).call(this);
