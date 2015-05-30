baseUri = "https://fitconnectapp.appspot.com"

Polymer
  is: "fc-account"

  properties:
    actions:
      type: Object
      readOnly: true
      value:
        get: baseUri + "/api/account"
        login: baseUri + "/login"
        create: baseUri + "/api/account/create"
    token:
      type: String
      notify: true
    account: Object
    router: Object

  ready: ->
    @router.go "/login" if not @token
    return

  get: ->
    return Promise.resolve @account if @account

    promise = @$.ajax.send
      url: @actions.get
      params:
        token: @token

    promise.then (@account) =>

  login: (form) ->
    promise = @$.ajax.send
      method: "POST"
      url: @actions.login
      body: @_createFormData form

    promise.then @_handleLoginResponse.bind @

  create: (form) ->
    promise = @$.ajax.send
      method: "POST"
      url: @actions.create

    body: @_createFormData form

    promise.then @_handleLoginResponse.bind @

  _createFormData: (form) ->
    data = new FormData()
    data.append key, item for key, item of form
    data

  _handleLoginResponse: (response) ->
    @token = response.token
    return
