(function() {
  Polymer({
    is: "fc-workout-detail",
    properties: {
      controller: Object,
      muscles: {
        type: Object,
        value: {}
      },
      router: Object,
      workout: {
        type: Object,
        observer: "onWorkoutChange"
      }
    },
    attached: function() {
      var FcData;
      FcData = this.$.data.FcData;
      this.exerciseDictionary = FcData.ExerciseData.ExerciseDictionary;
      this.muscleNames = Object.keys(FcData.ExerciseData.MuscleExerciseDictionary);
    },
    onWorkoutChange: function() {
      if (!this.workout) {
        return;
      }
      this.$.body.onResize();
      if (!this.workout.exercises) {
        return;
      }
      this._LoadWorkoutBody();
      this._ComputeMainMuscles();
      this.setPathValue('workout.comments', this.workout.comments);
    },
    _LoadWorkoutBody: function() {
      var exercise, load, loadAmount, loadSpent, muscleName, muscles, _i, _len, _ref, _ref1;
      muscles = this._CreateNewMuscleDictionary();
      loadAmount = 0.25;
      _ref = this.workout.exercises;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        exercise = _ref[_i];
        exercise = this.exerciseDictionary[exercise.name];
        _ref1 = exercise != null ? exercise.muscleLoads : void 0;
        for (muscleName in _ref1) {
          load = _ref1[muscleName];
          loadSpent = load ? loadAmount * load : 0;
          muscles[muscleName] += loadSpent;
          if (muscles[muscleName] > 100) {
            muscles[muscleName] = 100;
          }
        }
      }
      this.muscles = muscles;
    },
    _CreateNewMuscleDictionary: function() {
      var muscleName, muscles, _i, _len, _ref;
      muscles = {};
      _ref = this.muscleNames;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        muscleName = _ref[_i];
        muscles[muscleName] = 0;
      }
      return muscles;
    },
    _ComputeMainMuscles: function() {
      var exercise, load, loadAmount, loadSpent, muscleName, muscles, sorted, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      muscles = this._CreateNewMuscleDictionary();
      loadAmount = 0.25;
      _ref = this.workout.exercises;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        exercise = _ref[_i];
        exercise = this.exerciseDictionary[exercise.name];
        _ref1 = exercise != null ? exercise.muscleLoads : void 0;
        for (muscleName in _ref1) {
          load = _ref1[muscleName];
          loadSpent = load ? loadAmount * load : 0;
          muscles[muscleName] += loadSpent;
          if (muscles[muscleName] > 100) {
            muscles[muscleName] = 100;
          }
        }
      }
      sorted = [];
      _ref2 = this.muscleNames;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        muscleName = _ref2[_j];
        sorted.push([muscleName, muscles[muscleName]]);
      }
      sorted.sort((function(_this) {
        return function(a, b) {
          return b[1] - a[1];
        };
      })(this));
      this.mainMuscles = this._FormatMainMuscles(sorted);
    },
    _FormatMainMuscles: function(muscles) {
      var i, mainMuscles, _i;
      mainMuscles = "";
      for (i = _i = 0; _i <= 2; i = ++_i) {
        mainMuscles += muscles[i][0].charAt(0).toUpperCase() + muscles[i][0].slice(1);
        if (i !== 2) {
          mainMuscles += ", ";
        }
      }
      return mainMuscles;
    }
  });

}).call(this);
