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
      }
    },
    controllerChanged: function() {
      this.controller.getList().then((function(_this) {
        return function(list) {
          _this.list = list;
        };
      })(this));
    },
    attached: function() {
      return this.list = {
        data: [
          {
            name: 'Jason Ku',
            photo: "../../images/default_profile.png",
            created: "Joined: Mar 2, 2015"
          }, {
            name: 'Helen Wu',
            photo: "../../images/default_profile.png",
            created: "Joined: Mar 2, 2015"
          }, {
            name: 'Ryan Sharp',
            photo: "../../images/default_profile.png",
            created: "Joined: Mar 2, 2015"
          }
        ]
      };
    },
    handleItemTap: function(e) {
      this.selectedUser = e.currentTarget._templateInstance._data.item;
    }
  });

}).call(this);
