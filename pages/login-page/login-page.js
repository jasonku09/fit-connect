(function() {
  Polymer({
    is: 'login-page',
    attached: function() {
      return this.signup = false;
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
      var data;
      this.passwordInput = this.passwordInput || '';
      data = new FormData();
      data.append("email", this.emailInput);
      data.append("phrase", this.passwordInput);
      this.$.api.body = data;
      this.$.api.url = "https://fitconnectapp.appspot.com/login";
      this.$.api.method = "POST";
      this.$.api.getList().then(this.testFunc);
    },
    handleSignupTap: function() {
      var data;
      if (!this.signup) {
        this.signup = true;
        return;
      } else {
        if (!this.nameInput || !this.emailInput || !this.passwordInput) {
          alert('Must fill in all fields');
          return;
        }
        this.passwordInput = this.passwordInput || '';
        data = new FormData();
        data.append("username", this.nameInput);
        data.append("email", this.emailInput);
        data.append("phrase", this.passwordInput);
        this.$.api.body = data;
        this.$.api.url = "https://fitconnectapp.appspot.com/api/account/create";
        this.$.api.method = "POST";
        this.$.api.getList().then(this.testFunc);
      }
    },
    handleBackTap: function() {
      this.signup = false;
    },
    testFunc: function() {
      alert('Logged in!');
    }
  });

}).call(this);
