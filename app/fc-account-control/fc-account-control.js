(function() {
  Polymer({
    is: "fc-account-control",
    properties: {
      isRegistering: {
        type: Boolean,
        value: false
      }
    },
    _handleRegisterTap: function() {
      this.isRegistering = true;
    },
    _handleBackTap: function() {
      this.isRegistering = false;
    }
  });

}).call(this);
