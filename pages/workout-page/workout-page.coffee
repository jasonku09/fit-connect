Polymer
  is: "workout-page"

  properties:
    selectedWorkout:
      type: Object

  attached: ->
    @controller = @$.api
    @controller.getWorkoutHistory(@userId).then @_onWorkoutHistoryResponse.bind(this)
    @workoutTemplates = @controller.getWorkoutTemplates()
    @selectedWorkout = null
    @toolbarText = "Client / Workouts"
    return

  computeDetailsHidden: (selectedWorkout)->
    return selectedWorkout == null

  computeListHidden: (selectedWorkout)->
    return selectedWorkout != null

  handleFabTap: ->
    @selectedWorkout = { exercises: [], name: "New Workout", created: moment(new Date()).format('MMMM D, YYYY')}
    @toolbarText = "Client / Workouts / " + @selectedWorkout.name
    return

  handleBackTap: ->
    if @selectedWorkout
      @selectedWorkout = null
      @toolbarText = "Client / Workouts"
    else
      @router.go '/'
    return

  _onWorkoutHistoryResponse: (list)->
    history = []
    for entry in list.data
      if entry.created
        entry.created = moment(entry.created).format('MMMM D, YYYY')
    @workoutHistory = list.data
    return
