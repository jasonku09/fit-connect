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
      userList: Array,
      testStyle: {
        type: String,
        value: 'background-color:grey'
      }
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
      if (this.lastTarget) {
        this.lastTarget.style.backgroundColor = 'white';
      }
      e.currentTarget.style.backgroundColor = 'rgb(220, 220, 220)';
      this.lastTarget = e.currentTarget;
    },
    computeClientStyle: function(username, selectedUser) {
      return 'background-color: rgb(64, 190, 255)';
    }
  });

}).call(this);
