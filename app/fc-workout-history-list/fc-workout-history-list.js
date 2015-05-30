(function() {
  Polymer({
    is: "fc-workout-history-list"
  }, properties({
    selected: {
      type: Object,
      notify: true
    },
    history: Array
  }), {
    _handleHistoryTap: function(e) {
      var selectedWorkout;
      selectedWorkout = this.$.repeat.itemForElement(e.target);
      this.selected = this._parseHistory(selectedWorkout);
    },
    _parseHistory: function(selectedWorkout) {
      var exercise, exercisesHash, existingExercise, index, workout, _i, _len, _ref;
      workout = {
        exercises: [],
        created: selectedWorkout.created || "Unknown",
        comments: selectedWorkout.comments || "",
        name: selectedWorkout.name || "New Workout"
      };
      exercisesHash = {};
      _ref = selectedWorkout.exercises;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        exercise = _ref[_i];
        if (!exercisesHash[exercise.name]) {
          exercisesHash[exercise.name] = true;
          workout.exercises.push({
            name: exercise.name,
            sets: [
              {
                index: 1,
                repetitions: exercise.repetitions || null,
                weight: exercise.weight || null,
                comments: exercise.comments || ""
              }
            ]
          });
        } else {
          index = this._findExerciseIndex(workout.exercises, exercise.name);
          existingExercise = workout.exercises[index];
          existingExercise.sets.push({
            index: existingExercise.sets.length + 1,
            repetitions: exercise.repetitions || null,
            weight: exercise.weight || null,
            comments: exercise.comments || ""
          });
        }
      }
      return workout;
    },
    _findExerciseIndex: function(array, exerciseName) {
      var exercise, index, _i, _len;
      for (index = _i = 0, _len = array.length; _i < _len; index = ++_i) {
        exercise = array[index];
        if (exercise.name === exerciseName) {
          return index;
        }
      }
      return -1;
    }
  });

}).call(this);
