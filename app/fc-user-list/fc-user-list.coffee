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

  controllerChanged: ->
    @controller.getList().then (@list) =>
    return

  handleItemTap: (e)->
    @selectedUser = e.currentTarget._templateInstance._data.item
    return
