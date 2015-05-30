Polymer
  is: "fc-register"

  properties:
    form:
      type: Object
      value:
        username: ""
        email: ""
        phrase: ""

  _handleRegisterTap: ->
    promise = @$.account.create @form
    promise.then =>
      @fire 'authenticated'
      return
    return
