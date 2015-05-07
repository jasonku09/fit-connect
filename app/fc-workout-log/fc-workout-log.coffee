Polymer
  is: "fc-workout-log"

  properties:
    workout: Object

  attached: ->
    @workout = {}
    @exercises = [
      name: "Bench Press"
      description: "Avg Weight: 0"
    ,
      name: "Bench Press"
      description: "Avg Weight: 0"
    ,
      name: "Bench Press"
      description: "Avg Weight: 0"
    ,
      name: "Bench Press"
      description: "Avg Weight: 0"
    ]
    return
