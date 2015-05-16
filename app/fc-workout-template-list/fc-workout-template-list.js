(function() {
  Polymer({
    is: 'fc-workout-template-list',
    attached: function() {
      this.workoutTemplates = this.controller.getWorkoutTemplates();
      this.newTemplateExercises = [
        {
          name: ""
        }
      ];
    },
    handleFabTap: function() {
      this.newTemplateName = "";
      this.newTemplateExercises = [
        {
          name: ""
        }
      ];
      this.$.addTemplateDialog.open();
    },
    handleAddExercise: function() {
      this.newTemplateExercises.push({
        name: ""
      });
    },
    handleAddTemplate: function() {
      var template;
      template = {
        name: this.newTemplateName,
        exercises: this.newTemplateExercises
      };
      this.controller.addWorkoutTemplate(template);
      this.workoutTemplates = this.controller.getWorkoutTemplates();
      this.$.addTemplateDialog.close();
    }
  });

}).call(this);
