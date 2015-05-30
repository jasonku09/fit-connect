(function() {
  Polymer({
    is: "fc-client-form",
    behaviors: [wxy.JsonapiFormBehavior],
    properties: {
      defaultForm: {
        type: Object,
        value: {
          username: "",
          email: ""
        }
      }
    },
    _validate: function() {
      return true;
    }
  });

}).call(this);
