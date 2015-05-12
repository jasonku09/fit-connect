(function() {
  Polymer({
    is: "fc-navigation",
    properties: {
      selected: String,
      router: Object
    },
    attached: function() {
      var tab, _i, _len, _ref;
      this.tabs = [
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
          displayName: 'Import',
          icon: 'communication:import-export'
        }, {
          name: 'calendar',
          displayName: 'Calendar',
          icon: 'schedule'
        }, {
          name: 'planning',
          displayName: 'Planning',
          icon: 'assignment'
        }
      ];
      _ref = this.tabs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tab = _ref[_i];
        if (tab.name.toLowerCase() === this.selected.toLowerCase()) {
          tab["class"] = 'selected';
          tab.selected = true;
        }
      }
    },
    onItemTap: function(e) {
      this.selected = e.currentTarget._templateInstance._data.item.name;
      switch (this.selected) {
        case 'clients':
          this.router.go('/');
          break;
        case 'planning':
          this.router.go('/planning');
      }
    }
  });

}).call(this);
