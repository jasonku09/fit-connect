Polymer
  is: "fc-login"

  properties:
    form:
      type: Object
      value:
        email: ""
        phrase: ""

  _handleLoginTap: ->
    promise = @$.account.login @form
    promise.then =>
      @fire 'authenticated'
      return
    return
