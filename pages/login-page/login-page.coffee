Polymer
  is: 'login-page'

  attached: ->
    @signup = false
    @controller = @$.api

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
    @controller.login(@emailInput, @passwordInput).then @_onLoginResponse.bind(this)
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
      @controller.createAccount(@nameInput, @emailInput, @passwordInput).then @_onLoginResponse.bind(this)
    return

  handleBackTap: ->
    @signup = false
    return

  _onLoginResponse: (response)->
    @router.go '/'
    return
