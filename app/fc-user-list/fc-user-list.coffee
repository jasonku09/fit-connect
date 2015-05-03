Polymer
  is: "fc-user-list"

  properties:
    controller:
      type: Object
      observer: "controllerChanged"

  controllerChanged: ->
    @controller.getList().then (@list) =>
    return    
