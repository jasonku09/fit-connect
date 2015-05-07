Polymer
  is: "fc-user-detail"

  properties:
    userId:
      type: String
      observer: 'onUserChanged'
    controller: Object
    muscles:
      type: Object
      value: {}
    router: Object

  attached: ->
    @muscleNames = @_GetMuscleNames()
    @_GenerateRandomMuscleLoads()
    return

  onUserChanged: ->
    @_GenerateRandomMuscleLoads()
    @$.body.onResize()
    return

  handleWorkoutTap: ->
    @router.go '/user/' + @userId + '/workout'
    return

  _GetMuscleNames: ->
    muscles = 'Abdominals,Abductors,Adductors,Biceps,Calves,Chest,Forearms,Glutes,Hamstrings,Lats,Lower Back,Middle Back,Neck,Obliques,Quadriceps,Shoulders,Traps,Triceps'.split ','
    ((muscle.charAt(0).toLowerCase() + muscle.slice(1)).replace(/\s/g, '') for muscle in muscles)
    return muscles

  _GenerateRandomMuscleLoads: ->
    for muscleName in @muscleNames
      if Math.random() > 0.5
        @muscles[muscleName.toLowerCase()] = Math.random() * 80
      else
        @muscles[muscleName.toLowerCase()] = 0
    return
