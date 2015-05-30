Polymer
  is: "fc-client-list"

  properties:
    selectedClient:
      type: Object
      notify: true

  _computeListEmpty: (list) -> list.length > 0

  attached: ->
    @controller = @$.api
    promise = @controller.getList()
    promise.then (@list) =>
    return

  _handleTap: (e) ->
    @selectedClient = @$.repeat.itemForElement e.target
    return

  _handleFabTap: ->
    @$.dialog.open()
    return

  _handleAddTap: ->
    @$.form.submit().then =>
      @$.dialog.close()
      return
    return
