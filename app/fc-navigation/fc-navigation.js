(function() {
  Polymer({
    is: "fc-navigation",
    properties: {
      selected: String
    },
    attached: function() {
      return this.tabs = [
        {
          name: 'clients',
          displayName: 'Clients',
          icon: 'social:people-outline'
        }, {
          name: 'inbox',
          displayName: 'Inbox',
          icon: 'mail'
        }, {
          name: 'import',
          displayName: 'Import/Export',
          icon: 'communication:import-export'
        }, {
          name: 'calendar',
          displayName: 'Calendar',
          icon: 'schedule'
        }
      ];
    },
    onItemTap: function(e) {
      this.selected = e.currentTarget._templateInstance._data.item.name;
    }
  });

}).call(this);
