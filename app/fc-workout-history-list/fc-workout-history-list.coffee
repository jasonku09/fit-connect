Polymer
  is: "fc-workout-history-list"

  properties
    selected:
      type: Object
      notify: true

    history: Array

  _handleHistoryTap: (e) ->
    selectedWorkout = @$.repeat.itemForElement e.target
    @selected = @_parseHistory selectedWorkout
    return

  _parseHistory: (selectedWorkout) ->
    workout =
      exercises: []
      created: selectedWorkout.created || "Unknown"
      comments: selectedWorkout.comments || ""
      name: selectedWorkout.name || "New Workout"

    exercisesHash = {}
    for exercise in selectedWorkout.exercises
      if not exercisesHash[exercise.name]
        exercisesHash[exercise.name] = true
        workout.exercises.push
          name: exercise.name
          sets: [
              index: 1
              repetitions: exercise.repetitions || null
              weight: exercise.weight || null
              comments: exercise.comments || ""
          ]

      else
        index = @_findExerciseIndex workout.exercises,exercise.name
        existingExercise = workout.exercises[index]
        existingExercise.sets.push
          index: existingExercise.sets.length + 1
          repetitions: exercise.repetitions || null
          weight: exercise.weight || null
          comments: exercise.comments || ""

    workout

  _findExerciseIndex:(array, exerciseName) ->
    for exercise, index in array
      if exercise.name is exerciseName
        return index

    -1
