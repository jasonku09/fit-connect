(function() {
  Polymer({
    is: 'fc-enums',
    properties: {
      ExerciseType: {
        type: Object,
        value: {
          Weights: 'weights',
          Cardio: 'cardio',
          Body: 'body'
        }
      }
    }
  });

}).call(this);
