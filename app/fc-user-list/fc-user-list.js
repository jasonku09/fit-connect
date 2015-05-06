(function() {
  Polymer({
    is: "fc-user-list",
    properties: {
      controller: {
        type: Object,
        observer: "controllerChanged"
      },
      selectedUser: {
        type: Object,
        notify: true
      },
      userList: Array
    },
    controllerChanged: function() {
      this.controller.getList().then((function(_this) {
        return function(list) {
          _this.list = list;
        };
      })(this));
    },
    handleItemTap: function(e) {
      this.selectedUser = e.currentTarget._templateInstance._data.item;
    }
  });

}).call(this);
