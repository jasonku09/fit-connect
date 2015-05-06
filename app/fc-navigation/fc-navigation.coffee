Polymer
  is: "fc-navigation"

  properties:
    selected: String

  attached: ->
    @tabs = [
      name: 'clients'
      displayName: 'Clients'
      icon: 'social:people-outline'
    ,
      name: 'inbox'
      displayName: 'Inbox'
      icon: 'mail'
    ,
      name: 'import'
      displayName: 'Import/Export'
      icon: 'communication:import-export'
    ,
      name: 'calendar'
      displayName: 'Calendar'
      icon: 'schedule'
    ]

    for tab in @tabs
      if tab.name.toLowerCase() == @selected.toLowerCase()
        tab.class = 'selected'
        tab.selected = true
    return
  onItemTap: (e)->
    @selected = e.currentTarget._templateInstance._data.item.name
    return
