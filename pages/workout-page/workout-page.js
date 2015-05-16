(function() {
  Polymer({
    is: "workout-page",
    properties: {
      selectedWorkout: {
        type: Object
      }
    },
    attached: function() {
      this.controller = this.$.api;
      this.controller.getWorkoutHistory(this.userId).then(this._onWorkoutHistoryResponse.bind(this));
      this.workoutTemplates = this.controller.getWorkoutTemplates();
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
        exercises: [],
        name: "New Workout",
        created: moment(new Date()).format('MMMM D, YYYY')
      };
      this.toolbarText = "Client / Workouts / " + this.selectedWorkout.name;
    },
    handleBackTap: function() {
      if (this.selectedWorkout) {
        this.selectedWorkout = null;
        this.toolbarText = "Client / Workouts";
      } else {
        this.router.go('/');
      }
    },
    _onWorkoutHistoryResponse: function(list) {
      var entry, history, _i, _len, _ref;
      history = [];
      _ref = list.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        if (entry.created) {
          entry.created = moment(entry.created).format('MMMM D, YYYY');
        }
      }
      this.workoutHistory = list.data;
    }
  });

}).call(this);
