Polymer
  is: 'home-page'

  attached: ->
    if !@token
      return
    @controller = @$.api
    @selectedUser = {}
    @selectedUser.username = null
    @controller.getClientList().then @_handleClientsResponse.bind(this)
    @controller.getAccount().then @_handleAccountResponse.bind(this)
    return

  computeUserDetailHidden: (selectedUser)->
    return selectedUser.username == undefined

  _handleClientsResponse: (response)->
    @userlist = response.data
    return

  _handleAccountResponse: (response)->
    @user = response.data[0]
