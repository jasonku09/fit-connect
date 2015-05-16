Polymer
  is: 'fc-workout-template-list'

  attached: ->
    @workoutTemplates = @controller.getWorkoutTemplates()
    @newTemplateExercises = [{name:""}]
    return

  handleFabTap: ->
    @newTemplateName = ""
    @newTemplateExercises = [{name:""}]
    @$.addTemplateDialog.open()
    return

  handleAddExercise: ->
    @newTemplateExercises.push {
      name: ""
    }
    return

  handleAddTemplate: ->
    template = {
      name: @newTemplateName
      exercises: @newTemplateExercises
    }
    @controller.addWorkoutTemplate template
    @workoutTemplates = @controller.getWorkoutTemplates()
    @$.addTemplateDialog.close()
    return
