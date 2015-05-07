Polymer
  #http://scalemybusiness.com/how-should-innovators-really-talk-to-their-customers/
  is: "fc-exercise-entry"

  properties:
    exercise: Object
    sets:
      type: Array
      observer: '_handleSetsChange'

  attached: ->
    @sets = [
      {
        index: 1
        reps: null
        weight: null
      }
    ]
    # Generate a random unqiue collapse ID for toggling purposes
    @collapseID = 'collapse' + Math.round(Math.random() * 10000000000000)
    return

  _handleSetsChange: ->
    @description = "Sets:" + (@sets.length - 1)

  handleExerciseToggle:->
    document.querySelector('#' + @collapseID).toggle()
    return

  onFocus: (e)->
    if e.currentTarget.parentElement._templateInstance._data.item.index == @sets.length
      @sets.push {
        index: @sets.length + 1
        reps: null
        weight: null
      }
    @_updateIndexes()
    @_handleSetsChange()
    return

  onDeleteSetTap: (e)->
    if @sets.length == 1
      return
    index = e.currentTarget.parentElement._templateInstance._data.item.index - 1
    @sets.splice index, 1
    @_updateIndexes()
    @_handleSetsChange()
    return

  _updateIndexes: ->
    for set, index in @sets
      set.index = index + 1
    return
