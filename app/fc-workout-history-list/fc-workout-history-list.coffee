Polymer
  is: 'fc-workout-history-list'

  properties:
    selectedWorkout:
      type: Object
      notify: true

  attached: ->
    @workoutHistory = [
      name: "Week 1 Cycle 1"
      created: "5/1/2015"
    ,
      name: "Week 1 Cycle 2"
      created: "5/3/2015"
    ,
      name: "Week 1 Cycle 3"
      created: "5/3/2015"
    ,
      name: "Week 2 Cycle 1"
      created: "5/3/2015"
    ,
      name: "Week 2 Cycle 2"
      created: "5/3/2015"
    ]

  handleWorkoutHistoryTap: ->
    @exerciseTypes = @$['fc-enums'].ExerciseType
    @defaultExerciseType = @exerciseTypes.Weights
    @selectedWorkout = { exercises: [
      name: "Barbell Bench Press - Medium Grip"
      type: @exerciseTypes.Weights
      sets: [
        {
          index: 1
          repetitions: null
          weight: null
        }
      ]
      comments: ""
    ,
      name: "Incline Dumbbell Press"
      type: @exerciseTypes.Body
      sets: [
        {
          index: 1
          repetitions: null
          weight: null
        }
      ]
      comments: ""
    ,
      name: "Incline Dumbbell Flyes"
      type: @exerciseTypes.Cardio
      sets: [
        {
          index: 1
          repetitions: null
          weight: null
        }
      ]
      comments: ""
    ,
      name: "Machine Shoulder (Military) Press"
      type: @exerciseTypes.Cardio
      sets: [
        {
          index: 1
          repetitions: null
          weight: null
        }
      ]
      comments: ""
    ,
      name: "Arnold Dumbbell Press"
      type: @exerciseTypes.Cardio
      sets: [
        {
          index: 1
          repetitions: null
          weight: null
        }
      ]
      comments: ""
    ]}
    @selectedWorkout.comments = "hello"
    return
