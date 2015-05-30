(function() {
  if (window.wxy == null) {
    window.wxy = {};
  }

  wxy.JsonapiFormBehavior = {
    properties: {
      controller: Object,
      submitted: {
        type: Boolean,
        value: false
      },
      form: Object
    },
    attached: function() {
      this.reset();
    },
    submit: function() {
      var promise;
      if (!this._validate()) {
        this.submitted = true;
      } else {
        promise = this.controller.post(this.form);
        promise.then(function(result) {
          this.fire('submitted', result);
        });
      }
    },
    reset: function() {
      this.form = this.defaultForm;
    }
  };

}).call(this);
