(function() {
  Polymer({
    is: "fc-user-detail",
    properties: {
      userId: {
        type: String,
        observer: 'onUserChanged'
      },
      controller: Object,
      muscles: {
        type: Object,
        value: {}
      },
      router: Object
    },
    attached: function() {
      this.muscleNames = this._GetMuscleNames();
      this._GenerateRandomMuscleLoads();
    },
    onUserChanged: function() {
      this._GenerateRandomMuscleLoads();
      this.$.body.onResize();
    },
    handleWorkoutTap: function() {
      this.router.go('/user/' + this.userId + '/workout');
    },
    _GetMuscleNames: function() {
      var muscle, muscles, _i, _len;
      muscles = 'Abdominals,Abductors,Adductors,Biceps,Calves,Chest,Forearms,Glutes,Hamstrings,Lats,Lower Back,Middle Back,Neck,Obliques,Quadriceps,Shoulders,Traps,Triceps'.split(',');
      for (_i = 0, _len = muscles.length; _i < _len; _i++) {
        muscle = muscles[_i];
        (muscle.charAt(0).toLowerCase() + muscle.slice(1)).replace(/\s/g, '');
      }
      return muscles;
    },
    _GenerateRandomMuscleLoads: function() {
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
