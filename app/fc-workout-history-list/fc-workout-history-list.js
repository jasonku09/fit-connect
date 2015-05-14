(function() {
  Polymer({
    is: 'fc-workout-history-list',
    properties: {
      selectedWorkout: {
        type: Object,
        notify: true
      }
    },
    attached: function() {
      return this.workoutHistory = [
        {
          name: "Week 1 Cycle 1",
          created: "5/1/2015"
        }, {
          name: "Week 1 Cycle 2",
          created: "5/3/2015"
        }, {
          name: "Week 1 Cycle 3",
          created: "5/3/2015"
        }, {
          name: "Week 2 Cycle 1",
          created: "5/3/2015"
        }, {
          name: "Week 2 Cycle 2",
          created: "5/3/2015"
        }
      ];
    },
    handleWorkoutHistoryTap: function() {
      this.exerciseTypes = this.$['fc-enums'].ExerciseType;
      this.defaultExerciseType = this.exerciseTypes.Weights;
      this.selectedWorkout = {
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
      this.selectedWorkout.comments = "hello";
    }
  });

}).call(this);
