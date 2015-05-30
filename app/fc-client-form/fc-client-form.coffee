Polymer
  is: "fc-client-form"

  behaviors: [
    wxy.JsonapiFormBehavior
  ]

  properties:
    defaultForm:
      type: Object
      value:
        username: ""
        email: ""

  _validate: -> true
