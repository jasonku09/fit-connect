(function() {
  Polymer({
    is: 'home-page',
    attached: function() {
      this.controller = this.$.api;
      this.selectedUser = {};
      this.selectedUser.username === null;
    },
    computeUserDetailHidden: function(selectedUser) {
      return selectedUser.username === void 0;
    }
  });

}).call(this);
