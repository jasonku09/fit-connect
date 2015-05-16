Polymer
  is: "fc-workout-log"

  properties:
    workout:
      type: Object
      notify: true
      observer: "_onWorkoutChange"
    defaultExerciseType: String
    router: Object

  attached: ->
    document.addEventListener("DOMSubtreeModified", @_focusInput.bind(this))
    return

  handleFabTap: ->
    @exerciseAdded = true
    @workout.exercises.push {
      name: ""
      sets: [
        index: 1
        repetitions: null
        weight: null
      ]
      comments: ""
    }

  handleLoadTap: ->
    @$.selectTemplateDialog.open()
    return

  handleSaveTap: ->
    @_prepareWorkoutForUpload()


  handleTemplateTap: (e)->
    selectedTemplate = @$.templateList.itemForElement e.target
    @_loadWorkout selectedTemplate
    @$.selectTemplateDialog.close()
    return

  _prepareWorkoutForUpload: ->
    exerciseArray = []
    for exercise in @workout.exercises
      for set, index in exercise.sets
        continue if index == exercise.sets.length - 1
        exerciseArray.push {
          name: exercise.name
          repetitions: set.repetitions
          weight: set.weight
        }
    workoutToUpload = {
      name: @workout.name
      exercises: JSON.stringify(exerciseArray)
      userId: @userId
    }
    @controller.addWorkoutHistory(workoutToUpload).then @onWorkoutAdd.bind(this)
    return

  onWorkoutAdd: (response)->
    alert("Workout Saved")
    return

  _loadWorkout: (template)->
    templateExercises = []
    for exercise in template.exercises
      templateExercises.push {
        name: exercise.name
        sets: [
          index: 1
          repetitions: null
          weight: null
        ]
        comments: ""
      }
    @workout.exercises = templateExercises
    this.notifyPath('workout.exercises', @workout.exercises)
    return


  _onWorkoutChange: ->
    if @workout && @workout.exercises.length == 0
      @handleFabTap()
    return

  _focusInput: ->
    if @exerciseAdded
      inputs = document.getElementsByClassName("name-input")
      inputs[inputs.length - 1].focus()
      @exerciseAdded = false
    return
