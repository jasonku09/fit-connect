Polymer
  is: "fc-navigation"

  properties:
    selected: String
    router: Object
    tabs:
      type: Array
      value: [
        name: 'clients'
        displayName: 'Clients'
        icon: 'social:people-outline'
        handler: =>
          @router.go "/"
          return
      ,
        name: 'planning'
        displayName: 'Planning'
        icon: 'assignment'
        handler: =>
          @router.go "/planning"
          return
      ,
        name: 'inbox'
        displayName: 'Inbox'
        icon: 'mail'
      ,
        name: 'import'
        displayName: 'Import'
        icon: 'communication:import-export'
      ,
        name: 'calendar'
        displayName: 'Calendar'
        icon: 'schedule'
      ]

  _handleItemTap: (e) ->
    @selected = @$.repeat.itemForElement e.target
    @selected._handler()
    return
