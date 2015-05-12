Polymer
  is: 'login-page'

  attached: ->
    @signup = false

  computeSignupStyle: (signup)->
    if @signup
      'background-color : rgb(70, 144, 208);
       color: white;
       margin-top: 25px'
    else
      ''
  computeDialogStyle: (signup)->
    if @signup
      'height : 325px'
    else
      'height : 275px'

  handleLoginTap: ->
    @passwordInput = @passwordInput || ''
    data = new FormData()
    data.append("email", @emailInput)
    data.append("phrase", @passwordInput)
    @$.api.body = data
    @$.api.url = "https://fitconnectapp.appspot.com/login"
    @$.api.method = "POST"
    @$.api.getList().then @testFunc
    return

  handleSignupTap: ->
    if !@signup
      @signup = true
      return
    else
      # Temp Ghetto Validation
      if !@nameInput || !@emailInput || !@passwordInput
        alert('Must fill in all fields')
        return

      @passwordInput = @passwordInput || ''
      data = new FormData()
      data.append("username", @nameInput)
      data.append("email", @emailInput)
      data.append("phrase", @passwordInput)
      @$.api.body = data
      @$.api.url = "https://fitconnectapp.appspot.com/api/account/create"
      @$.api.method = "POST"
      @$.api.getList().then @testFunc
    return

  handleBackTap: ->
    @signup = false
    return

  testFunc: ->
    alert('Logged in!')
    return
