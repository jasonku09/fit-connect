Polymer
  is: 'home-page'

  attached: ->
    @controller = @$.api
    @selectedUser = {}
    @selectedUser.username == null
    return

  computeUserDetailHidden: (selectedUser)->
    return selectedUser.username == undefined
