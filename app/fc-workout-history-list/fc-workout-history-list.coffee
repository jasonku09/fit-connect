Polymer
  is: 'fc-workout-history-list'

  properties:
    selectedWorkout:
      type: Object
      notify: true
    workoutHistory:
      type: Array

  attached: ->
    return

  handleWorkoutHistoryTap: (e)->
    selectedWorkout = @$.historyList.itemForElement e.target
    @selectedWorkout = @_parseHistory selectedWorkout
    return

  computeListEmpty: (workoutHistory)->
    return workoutHistory.length > 0

  _parseHistory: (selectedWorkout)->
    workout = {
      exercises: []
      created: selectedWorkout.created || "Unknown"
      comments: selectedWorkout.commnets || ""
      name: selectedWorkout.name || "New Workout"
    }
    exercisesHash = {}
    for exercise in selectedWorkout.exercises
      if !exercisesHash[exercise.name]
        exercisesHash[exercise.name] = true
        workout.exercises.push {
          name: exercise.name
          sets: [
            {
              index: 1
              repetitions: exercise.repetitions || null
              weight: exercise.weight || null
              comments: exercise.comments || ""
            }
          ]
        }
      else
        index = @_findExerciseIndex(workout.exercises,exercise.name)
        existingExercise = workout.exercises[index]
        existingExercise.sets.push {
          index: existingExercise.sets.length + 1
          repetitions: exercise.repetitions || null
          weight: exercise.weight || null
          comments: exercise.comments || ""
        }
    return workout

  _findExerciseIndex:(array, exerciseName)->
    for exercise, index in array
      if exercise.name == exerciseName
        return index
    return -1
