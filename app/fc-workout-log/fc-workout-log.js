(function() {
  Polymer({
    is: "fc-workout-log",
    properties: {
      workout: {
        type: Object,
        notify: true,
        observer: "_onWorkoutChange"
      },
      defaultExerciseType: String,
      router: Object
    },
    attached: function() {
      document.addEventListener("DOMSubtreeModified", this._focusInput.bind(this));
    },
    handleFabTap: function() {
      this.exerciseAdded = true;
      return this.workout.exercises.push({
        name: "",
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
    handleLoadTap: function() {
      this.$.selectTemplateDialog.open();
    },
    handleSaveTap: function() {
      return this._prepareWorkoutForUpload();
    },
    handleTemplateTap: function(e) {
      var selectedTemplate;
      selectedTemplate = this.$.templateList.itemForElement(e.target);
      this._loadWorkout(selectedTemplate);
      this.$.selectTemplateDialog.close();
    },
    _prepareWorkoutForUpload: function() {
      var exercise, exerciseArray, index, set, workoutToUpload, _i, _j, _len, _len1, _ref, _ref1;
      exerciseArray = [];
      _ref = this.workout.exercises;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        exercise = _ref[_i];
        _ref1 = exercise.sets;
        for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
          set = _ref1[index];
          if (index === exercise.sets.length - 1) {
            continue;
          }
          exerciseArray.push({
            name: exercise.name,
            repetitions: set.repetitions,
            weight: set.weight
          });
        }
      }
      workoutToUpload = {
        name: this.workout.name,
        exercises: JSON.stringify(exerciseArray),
        userId: this.userId
      };
      this.controller.addWorkoutHistory(workoutToUpload).then(this.onWorkoutAdd.bind(this));
    },
    onWorkoutAdd: function(response) {
      alert("Workout Saved");
    },
    _loadWorkout: function(template) {
      var exercise, templateExercises, _i, _len, _ref;
      templateExercises = [];
      _ref = template.exercises;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        exercise = _ref[_i];
        templateExercises.push({
          name: exercise.name,
          sets: [
            {
              index: 1,
              repetitions: null,
              weight: null
            }
          ],
          comments: ""
        });
      }
      this.workout.exercises = templateExercises;
      this.notifyPath('workout.exercises', this.workout.exercises);
    },
    _onWorkoutChange: function() {
      if (this.workout && this.workout.exercises.length === 0) {
        this.handleFabTap();
      }
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
