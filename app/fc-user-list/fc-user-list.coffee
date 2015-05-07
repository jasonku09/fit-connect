Polymer
  is: "fc-user-list"

  properties:
    controller:
      type: Object
      observer: "controllerChanged"
    selectedUser:
      type: Object
      notify: true
    userList: Array
    testStyle:
      type: String
      value: 'background-color:grey'

  controllerChanged: ->
    @controller.getList().then (@list) =>
    return

  handleItemTap: (e)->
    @selectedUser = e.currentTarget._templateInstance._data.item

    if @lastTarget
      @lastTarget.style.backgroundColor = 'white'

    e.currentTarget.style.backgroundColor = 'rgb(220, 220, 220)'
    @lastTarget = e.currentTarget
    return

  # Doesnt work
  computeClientStyle: (username, selectedUser)->
    return 'background-color: rgb(64, 190, 255)'
