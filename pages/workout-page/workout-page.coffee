Polymer
  is: "workout-page"

  attached: ->

    @exerciseTypes = @$['fc-enums'].ExerciseType
    @defaultExerciseType = @exerciseTypes.Weights
    @workout = {}
    @workout.exercises = ["Barbell Bench Press - Medium Grip"
                          "Incline Dumbbell Press"
                          "Incline Dumbbell Flyes"
                          "Machine Shoulder (Military) Press"
                          "Arnold Dumbbell Press"]
    @workout = { exercises: [
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
    @workout.comments = "hello"
    return

  handleBackTap: ->
    @router.go '/'
    return
