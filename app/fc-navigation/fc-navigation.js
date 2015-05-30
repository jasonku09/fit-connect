(function() {
  Polymer({
    is: "fc-navigation",
    properties: {
      selected: String,
      router: Object,
      tabs: {
        type: Array,
        value: [
          {
            name: 'clients',
            displayName: 'Clients',
            icon: 'social:people-outline',
            handler: (function(_this) {
              return function() {
                _this.router.go("/");
              };
            })(this)
          }, {
            name: 'planning',
            displayName: 'Planning',
            icon: 'assignment',
            handler: (function(_this) {
              return function() {
                _this.router.go("/planning");
              };
            })(this)
          }, {
            name: 'inbox',
            displayName: 'Inbox',
            icon: 'mail'
          }, {
            name: 'import',
            displayName: 'Import',
            icon: 'communication:import-export'
          }, {
            name: 'calendar',
            displayName: 'Calendar',
            icon: 'schedule'
          }
        ]
      }
    },
    _handleItemTap: function(e) {
      this.selected = this.$.repeat.itemForElement(e.target);
      this.selected._handler();
    }
  });

}).call(this);
