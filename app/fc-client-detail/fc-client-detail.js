(function() {
  Polymer({
    is: "fc-client-detail",
    properties: {
      clientId: {
        type: String,
        observer: "_handleUserChanged"
      },
      controller: Object,
      muscles: {
        type: Object,
        value: {}
      },
      router: Object
    },
    attached: function() {
      this.muscleNames = this.$.body.getMuscleNames();
      this._generateRandomMuscleLoads();
    },
    _handleUserChanged: function() {
      this._generateRandomMuscleLoads();
      this.$.body.handleResize();
    },
    _handleWorkoutTap: function() {
      this.router.go("/user/" + this.clientId + "/workout");
    },
    _handleProfileTap: function() {
      this.router.go("/user/" + this.clientId);
    },
    _generateRandomMuscleLoads: function() {
      var muscleName, _i, _len, _ref;
      _ref = this.muscleNames;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        muscleName = _ref[_i];
        if (Math.random() > 0.5) {
          this.muscles[muscleName.toLowerCase()] = Math.random() * 80;
        } else {
          this.muscles[muscleName.toLowerCase()] = 0;
        }
      }
    }
  });

}).call(this);
