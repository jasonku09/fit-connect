Polymer
  #http://scalemybusiness.com/how-should-innovators-really-talk-to-their-customers/
  is: "fc-exercise-entry"

  properties:
    exercise:
      type: Object
      notify: true

    observers:
      'exercise.name' : '_handleSetsChange'

  attached: ->
    # Generate a random unqiue collapse ID for toggling purposes
    @collapseID = 'collapse' + Math.round(Math.random() * 10000000000000)
    @collapseClosed = true
    @_handleSetsChange()
    return

  _handleSetsChange:->
    @totalWeight = 0
    totalReps = 0
    return if !@exercise
    for set in @exercise.sets
      if set.repetitions && set.weight
        @totalWeight += parseInt set.repetitions * parseInt set.weight
        totalReps += parseInt set.repetitions
    @numSets = @exercise.sets.length - 1
    @averageWeight = Math.round @totalWeight / totalReps or 0
    return

  handleExerciseToggle:->
    @collapseClosed = !@collapseClosed
    document.querySelector('#' + @collapseID).toggle()
    return

  onFocus: (e)->
    if e.currentTarget.parentElement._templateInstance._data.item.index == @exercise.sets.length
      @exercise.sets.push {
        index: @exercise.sets.length + 1
        repetitions: null
        weight: null
      }
    @_updateIndexes()
    @_handleSetsChange()
    return

  onDeleteSetTap: (e)->
    if @exercise.sets.length == 1
      return
    index = e.currentTarget.parentElement._templateInstance._data.item.index - 1
    @exercise.sets.splice index, 1
    @_updateIndexes()
    @_handleSetsChange()
    return

  _updateIndexes: ->
    for set, index in @exercise.sets
      set.index = index + 1
    return
