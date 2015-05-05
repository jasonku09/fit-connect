Polymer
  is: "fc-user-list"

  properties:
    controller:
      type: Object
      observer: "controllerChanged"
    selectedUser:
      type: Object
      notify: true

  controllerChanged: ->
    @controller.getList().then (@list) =>
    return

  attached: ->
    @list = {
      data: [
        name: 'Jason Ku'
        photo: "../../images/default_profile.png"
        created: "Joined: Mar 2, 2015"
      ,
        name: 'Helen Wu'
        photo: "../../images/default_profile.png"
        created: "Joined: Mar 2, 2015"
      ,
        name: 'Ryan Sharp'
        photo: "../../images/default_profile.png"
        created: "Joined: Mar 2, 2015"
      ]
    }

  handleItemTap: (e)->
    @selectedUser = e.currentTarget._templateInstance._data.item
    return
