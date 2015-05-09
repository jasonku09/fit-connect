(function() {
  Polymer({
    is: "workout-page",
    attached: function() {
      this.exerciseTypes = this.$['fc-enums'].ExerciseType;
      this.defaultExerciseType = this.exerciseTypes.Weights;
      this.workout = {};
      this.workout.exercises = ["Barbell Bench Press - Medium Grip", "Incline Dumbbell Press", "Incline Dumbbell Flyes", "Machine Shoulder (Military) Press", "Arnold Dumbbell Press"];
      this.workout = {
        exercises: [
          {
            name: "Barbell Bench Press - Medium Grip",
            type: this.exerciseTypes.Weights,
            sets: [
              {
                index: 1,
                repetitions: null,
                weight: null
              }
            ],
            comments: ""
          }, {
            name: "Incline Dumbbell Press",
            type: this.exerciseTypes.Body,
            sets: [
              {
                index: 1,
                repetitions: null,
                weight: null
              }
            ],
            comments: ""
          }, {
            name: "Incline Dumbbell Flyes",
            type: this.exerciseTypes.Cardio,
            sets: [
              {
                index: 1,
                repetitions: null,
                weight: null
              }
            ],
            comments: ""
          }, {
            name: "Machine Shoulder (Military) Press",
            type: this.exerciseTypes.Cardio,
            sets: [
              {
                index: 1,
                repetitions: null,
                weight: null
              }
            ],
            comments: ""
          }, {
            name: "Arnold Dumbbell Press",
            type: this.exerciseTypes.Cardio,
            sets: [
              {
                index: 1,
                repetitions: null,
                weight: null
              }
            ],
            comments: ""
          }
        ]
      };
      this.workout.comments = "hello";
    },
    handleBackTap: function() {
      this.router.go('/');
    }
  });

}).call(this);
