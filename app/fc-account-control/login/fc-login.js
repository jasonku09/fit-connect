(function() {
  Polymer({
    is: "fc-login",
    properties: {
      form: {
        type: Object,
        value: {
          email: "",
          phrase: ""
        }
      }
    },
    _handleLoginTap: function() {
      var promise;
      promise = this.$.account.login(this.form);
      promise.then((function(_this) {
        return function() {
          _this.fire('authenticated');
        };
      })(this));
    }
  });

}).call(this);
