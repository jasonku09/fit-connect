Polymer
  is: "workout-page"

  properties:
    selectedWorkout:
      type: Object

  attached: ->
    @selectedWorkout = null
    @toolbarText = "Client / Workouts"
    return

  computeDetailsHidden: (selectedWorkout)->
    return selectedWorkout == null

  computeListHidden: (selectedWorkout)->
    return selectedWorkout != null

  handleFabTap: ->
    @selectedWorkout = { exercises: [] }
    @toolbarText = "Client / Workouts / WorkoutName"
    return

  handleBackTap: ->
    if @selectedWorkout
      @selectedWorkout = null
      @toolbarText = "Client / Workouts"
    else
      @router.go '/'
    return
