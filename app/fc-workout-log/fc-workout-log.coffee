Polymer
  is: "fc-workout-log"

  properties:
    workout:
      type: Object
      notify: true
    defaultExerciseType: String

  attached: ->
    document.addEventListener("DOMSubtreeModified", @_focusInput.bind(this))
    return

  handleFabTap: ->
    @exerciseAdded = true
    @workout.exercises.push {
      name: ""
      type: @defaultExerciseType
      sets: [
        index: 1
        repetitions: null
        weight: null
      ]
      comments: ""
    }

  _focusInput: ->
    if @exerciseAdded
      inputs = document.getElementsByClassName("name-input")
      inputs[inputs.length - 1].focus()
      @exerciseAdded = false
    return
