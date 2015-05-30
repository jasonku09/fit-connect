(function() {
  Polymer({
    is: "login-page",
    _handleAuthenticated: function() {
      this.router.go("/");
    }
  });

}).call(this);
