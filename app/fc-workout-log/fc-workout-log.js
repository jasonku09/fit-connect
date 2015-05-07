(function() {
  Polymer({
    is: "fc-workout-log",
    properties: {
      workout: Object
    },
    attached: function() {
      this.workout = {};
      this.exercises = [
        {
          name: "Bench Press",
          description: "Avg Weight: 0"
        }, {
          name: "Bench Press",
          description: "Avg Weight: 0"
        }, {
          name: "Bench Press",
          description: "Avg Weight: 0"
        }, {
          name: "Bench Press",
          description: "Avg Weight: 0"
        }
      ];
    }
  });

}).call(this);
