(function() {
  Polymer({
    is: "fc-workout-log",
    properties: {
      workout: {
        type: Object,
        notify: true
      },
      defaultExerciseType: String
    },
    attached: function() {
      document.addEventListener("DOMSubtreeModified", this._focusInput.bind(this));
    },
    _addExercise: function() {
      this.exerciseAdded = true;
      return this.workout.exercises.push({
        name: "",
        type: this.defaultExerciseType,
        sets: [
          {
            index: 1,
            repetitions: null,
            weight: null
          }
        ],
        comments: ""
      });
    },
    _focusInput: function() {
      var inputs;
      if (this.exerciseAdded) {
        inputs = document.getElementsByClassName("name-input");
        inputs[inputs.length - 1].focus();
        this.exerciseAdded = false;
      }
    }
  });

}).call(this);
