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
      },
      token: String
    },
    controllerChanged: function() {
      this.controller.getClientList().then((function(_this) {
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
    },
    computeListEmpty: function(userList) {
      return userList.length > 0;
    },
    handleFabTap: function() {
      this.$.addClientDialog.open();
    },
    handleCancelTap: function() {
      return this.$.addClientDialog.close();
    },
    handleAddClient: function() {
      this.controller.addClient(this.nameInput, this.emailInput).then(this._onAddResponse.bind(this));
    },
    _onAddResponse: function(response) {
      this.nameInput = null;
      this.emailInput = null;
      alert("Client Added");
      this.$.addClientDialog.close();
      this.controller.getClientList().then((function(_this) {
        return function(list) {
          return _this.userList = list.data;
        };
      })(this));
    }
  });

}).call(this);
