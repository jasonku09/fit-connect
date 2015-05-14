(function() {
  Polymer({
    is: 'login-page',
    attached: function() {
      this.signup = false;
      return this.controller = this.$.api;
    },
    computeSignupStyle: function(signup) {
      if (this.signup) {
        return 'background-color : rgb(70, 144, 208); color: white; margin-top: 25px';
      } else {
        return '';
      }
    },
    computeDialogStyle: function(signup) {
      if (this.signup) {
        return 'height : 325px';
      } else {
        return 'height : 275px';
      }
    },
    handleLoginTap: function() {
      this.passwordInput = this.passwordInput || '';
      this.controller.login(this.emailInput, this.passwordInput).then(this._onLoginResponse.bind(this));
    },
    handleSignupTap: function() {
      if (!this.signup) {
        this.signup = true;
        return;
      } else {
        if (!this.nameInput || !this.emailInput || !this.passwordInput) {
          alert('Must fill in all fields');
          return;
        }
        this.passwordInput = this.passwordInput || '';
        this.controller.createAccount(this.nameInput, this.emailInput, this.passwordInput).then(this._onLoginResponse.bind(this));
      }
    },
    handleBackTap: function() {
      this.signup = false;
    },
    _onLoginResponse: function(response) {
      this.router.go('/');
    }
  });

}).call(this);
