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

  getClientList: ->
    return Promise.resolve @list if @list

    listPromise = @$.ajax.send
      url: "https://fitconnectapp.appspot.com/api/account/clients"
      params: {"token" : @token}
      method: "GET"

    listPromise.then (@list) -> @list

  getWorkoutHistory: (userId)->
    return Promise.resolve @history if @history

    historyPromise = @$.ajax.send
      url: "https://fitconnectapp.appspot.com/api/account/workouts"
      params: {"token" : @token, "user_id": userId}
      method: "GET"

    historyPromise.then (history)-> history

  addWorkoutHistory: (workout)->
    data = new FormData()
    data.append("name", workout.name)
    data.append("user_id", workout.userId)
    data.append("exercises", workout.exercises)
    data.append("token", @token)

    promise = @$.ajax.send
      url: "https://fitconnectapp.appspot.com/api/account/workouts"
      method: "POST"
      body: data

    promise.then () ->

  getWorkoutTemplates: ->
    # Temp until server is ready to accept workout templates
    return @workoutTemplates if @workoutTemplates

    @workoutTemplates = @$.templateStorage.value
    @workoutTemplates

  addWorkoutTemplate: (template)->
    if !@$.templateStorage.value
      @workoutTemplates = []
    else
      @workoutTemplates = @$.templateStorage.value
    @workoutTemplates.push template
    @$.templateStorage.save()
    return

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


  _onLoginResponse: (response)->
    @token = response.token
    return
