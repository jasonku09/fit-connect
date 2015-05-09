Polymer
  is: "fc-workout-detail"

  properties:
    controller: Object
    muscles:
      type: Object
      value: {}
    router: Object
    workout: Object

  attached: ->
    FcData = @$.data.FcData
    @exerciseDictionary = FcData.ExerciseData.ExerciseDictionary
    @muscleNames = Object.keys FcData.ExerciseData.MuscleExerciseDictionary
    @_LoadWorkoutBody()
    @_ComputeMainMuscles()
    this.setPathValue('workout.comments', @workout.comments)
    return

  _LoadWorkoutBody: ->
    muscles = @_CreateNewMuscleDictionary()
    loadAmount = 0.25
    for exercise in @workout.exercises
      exercise = @exerciseDictionary[exercise.name]
      for muscleName, load of exercise?.muscleLoads
        loadSpent = if load then loadAmount * load else 0
        muscles[muscleName] += loadSpent
        muscles[muscleName] = 100 if muscles[muscleName] > 100

    @muscles = muscles
    return

  _CreateNewMuscleDictionary: ->
    muscles = {}
    for muscleName in @muscleNames
      muscles[muscleName] = 0
    muscles

  _ComputeMainMuscles: ->
    muscles = @_CreateNewMuscleDictionary()
    loadAmount = 0.25
    for exercise in @workout.exercises
      exercise = @exerciseDictionary[exercise.name]
      for muscleName, load of exercise?.muscleLoads
        loadSpent = if load then loadAmount * load else 0
        muscles[muscleName] += loadSpent
        muscles[muscleName] = 100 if muscles[muscleName] > 100
    sorted = []
    for muscleName in @muscleNames
      sorted.push [muscleName, muscles[muscleName]]
    sorted.sort (a, b) => b[1] - a[1]
    @mainMuscles = @_FormatMainMuscles sorted
    return

  _FormatMainMuscles: (muscles) ->
    mainMuscles = ""
    for i in [0..2]
      mainMuscles += muscles[i][0].charAt(0).toUpperCase() + muscles[i][0].slice(1)
      if i != 2
        mainMuscles += ", "
    mainMuscles
