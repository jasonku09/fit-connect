Polymer
  is: "wxy-jsonapi"

  properties:
    url: String

  hostAttributes:
    hidden: true

  getAccount: ->
    return Promise.resolve @account if @account

    accountPromise = @$.ajax.send
      url: "https://fitconnectapp.appspot.com/api/account"
      params: {"token" : @token}
      method: "GET"

    accountPromise.then (@account) -> @account

  getClientList: ->
    return Promise.resolve @list if @list

    listPromise = @$.ajax.send
      url: "https://fitconnectapp.appspot.com/api/account/clients"
      params: {"token" : @token}
      method: "GET"

    listPromise.then (@list) -> @list

  login: (email, password)->
    data = new FormData()
    data.append("email", email)
    data.append("phrase", password)

    promise = @$.ajax.send
      url: "https://fitconnectapp.appspot.com/login"
      method: "POST"
      body: data

    promise.then @_onLoginResponse.bind(this)

  addClient: (username, email)->
    data = new FormData()
    data.append("username", username)
    data.append("email", email || '')
    data.append("token", @token)

    promise = @$.ajax.send
      url: "https://fitconnectapp.appspot.com/api/account/clients"
      method: "POST"
      body: data

    promise.then () ->

  createAccount: (username, email, password)->
    data = new FormData()
    data.append("username", username)
    data.append("email", email)
    data.append("phrase", password)

    promise = @$.ajax.send
      url: "https://fitconnectapp.appspot.com/api/account/create"
      method: "POST"
      body: data

    promise.then @_onLoginResponse.bind(this)

  _onLoginResponse: (response)->
    @token = response.token
    return
