(function() {
  Polymer({
    is: 'home-page',
    attached: function() {
      this.controller = this.$.api;
    }
  });

}).call(this);
