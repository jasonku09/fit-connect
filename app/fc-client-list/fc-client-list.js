(function() {
  Polymer({
    is: "fc-client-list",
    properties: {
      selectedClient: {
        type: Object,
        notify: true
      }
    },
    _computeListEmpty: function(list) {
      return list.length > 0;
    },
    attached: function() {
      var promise;
      this.controller = this.$.api;
      promise = this.controller.getList();
      promise.then((function(_this) {
        return function(list) {
          _this.list = list;
        };
      })(this));
    },
    _handleTap: function(e) {
      this.selectedClient = this.$.repeat.itemForElement(e.target);
    },
    _handleFabTap: function() {
      this.$.dialog.open();
    },
    _handleAddTap: function() {
      this.$.form.submit().then((function(_this) {
        return function() {
          _this.$.dialog.close();
        };
      })(this));
    }
  });

}).call(this);
