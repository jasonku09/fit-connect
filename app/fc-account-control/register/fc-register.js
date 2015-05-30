(function() {
  Polymer({
    is: "fc-register",
    properties: {
      form: {
        type: Object,
        value: {
          username: "",
          email: "",
          phrase: ""
        }
      }
    },
    _handleRegisterTap: function() {
      var promise;
      promise = this.$.account.create(this.form);
      promise.then((function(_this) {
        return function() {
          _this.fire('authenticated');
        };
      })(this));
    }
  });

}).call(this);
