(function() {
  Polymer({
    is: "workout-page",
    properties: {
      selectedWorkout: {
        type: Object
      }
    },
    attached: function() {
      this.selectedWorkout = null;
      this.toolbarText = "Client / Workouts";
    },
    computeDetailsHidden: function(selectedWorkout) {
      return selectedWorkout === null;
    },
    computeListHidden: function(selectedWorkout) {
      return selectedWorkout !== null;
    },
    handleFabTap: function() {
      this.selectedWorkout = {
        exercises: []
      };
      this.toolbarText = "Client / Workouts / WorkoutName";
    },
    handleBackTap: function() {
      if (this.selectedWorkout) {
        this.selectedWorkout = null;
        this.toolbarText = "Client / Workouts";
      } else {
        this.router.go('/');
      }
    }
  });

}).call(this);
