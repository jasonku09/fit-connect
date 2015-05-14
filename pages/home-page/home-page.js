(function() {
  Polymer({
    is: 'home-page',
    attached: function() {
      if (!this.token) {
        return;
      }
      this.controller = this.$.api;
      this.selectedUser = {};
      this.selectedUser.username === null;
      this.controller.getClientList().then(this._handleClientsResponse.bind(this));
      this.controller.getAccount().then(this._handleAccountResponse.bind(this));
    },
    computeUserDetailHidden: function(selectedUser) {
      return selectedUser.username === void 0;
    },
    _handleClientsResponse: function(response) {
      this.userlist = response.data;
    },
    _handleAccountResponse: function(response) {
      return this.user = response.data[0];
    }
  });

}).call(this);
