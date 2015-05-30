Polymer
  is: "fc-account-control"

  properties:
    isRegistering:
      type: Boolean
      value: false

  _handleRegisterTap: ->
    @isRegistering = true
    return

  _handleBackTap: ->
    @isRegistering = false
    return
