window.wxy ?= {}

wxy.JsonapiFormBehavior =
  properties:
    controller: Object
    submitted:
      type: Boolean
      value: false
    form: Object

  attached: ->
    @reset()
    return

  submit: ->
    if not @_validate()
      @submitted = true
    else
      # TODO: differentiate between edit and create
      promise = @controller.post @form
      promise.then (result) ->
        @fire 'submitted', result
        return
    return

  reset: ->
    @form = @defaultForm # need to copy here
    return
