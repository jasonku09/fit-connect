Polymer
  is: "fc-client-detail"

  properties:
    clientId:
      type: String
      observer: "_handleUserChanged"
    controller: Object
    muscles:
      type: Object
      value: {}
    router: Object

  attached: ->
    @muscleNames = @$.body.getMuscleNames()
    @_generateRandomMuscleLoads()
    return

  _handleUserChanged: ->
    @_generateRandomMuscleLoads()
    @$.body.handleResize()
    return

  _handleWorkoutTap: ->
    @router.go "/client/#{@clientId}/workout"
    return

  _handleProfileTap: ->
    @router.go "/client/#{@clientId}"
    return

  _generateRandomMuscleLoads: ->
    for muscleName in @muscleNames
      if Math.random() > 0.5
        @muscles[muscleName.toLowerCase()] = Math.random() * 80
      else
        @muscles[muscleName.toLowerCase()] = 0
    return
