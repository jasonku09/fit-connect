Polymer
  is: "fc-navigation"

  properties:
    selected: String
    router: Object
    token:
      type: String
      notify: true


  attached: ->
    document.querySelector(".navigation").addEventListener('iron-localstorage-load', @checkToken(@router))
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
      displayName: 'Import'
      icon: 'communication:import-export'
    ,
      name: 'calendar'
      displayName: 'Calendar'
      icon: 'schedule'
    ,
      name: 'planning'
      displayName: 'Planning'
      icon: 'assignment'
    ]

    for tab in @tabs
      if tab.name.toLowerCase() == @selected.toLowerCase()
        tab.class = 'selected'
        tab.selected = true
    return

  onItemTap: (e)->
    @selected = e.currentTarget._templateInstance._data.item.name
    switch @selected
      when 'clients' then @router.go '/'
      when 'planning' then @router.go '/planning'
    return

  handleLogout: ->
    @token = null
    @router.go '/login'
    return

  checkToken:(router) ->
    if !@token
      router.go '/login'
      return
