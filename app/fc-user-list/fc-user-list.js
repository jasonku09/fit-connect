(function() {
  Polymer({
    is: "fc-user-list",
    properties: {
      controller: {
        type: Object,
        observer: "controllerChanged"
      }
    },
    controllerChanged: function() {
      this.controller.getList().then((function(_this) {
        return function(list) {
          _this.list = list;
        };
      })(this));
    }
  });

}).call(this);
