(function() {
  Polymer({
    is: "fc-exercise-entry",
    properties: {
      exercise: {
        type: Object,
        notify: true
      },
      observers: {
        'exercise.name': '_handleSetsChange'
      }
    },
    attached: function() {
      this.collapseID = 'collapse' + Math.round(Math.random() * 10000000000000);
      this.collapseClosed = true;
      this._handleSetsChange();
    },
    _handleSetsChange: function() {
      var set, totalReps, _i, _len, _ref;
      this.totalWeight = 0;
      totalReps = 0;
      if (!this.exercise) {
        return;
      }
      _ref = this.exercise.sets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        set = _ref[_i];
        if (set.repetitions && set.weight) {
          this.totalWeight += parseInt(set.repetitions * parseInt(set.weight));
          totalReps += parseInt(set.repetitions);
        }
      }
      this.numSets = this.exercise.sets.length - 1;
      return this.averageWeight = Math.round(this.totalWeight / totalReps || 0);
    },
    handleExerciseToggle: function() {
      this.collapseClosed = !this.collapseClosed;
      document.querySelector('#' + this.collapseID).toggle();
    },
    onFocus: function(e) {
      if (e.currentTarget.parentElement._templateInstance._data.item.index === this.exercise.sets.length) {
        this.exercise.sets.push({
          index: this.exercise.sets.length + 1,
          repetitions: null,
          weight: null
        });
      }
      this._updateIndexes();
      this._handleSetsChange();
    },
    onDeleteSetTap: function(e) {
      var index;
      if (this.exercise.sets.length === 1) {
        return;
      }
      index = e.currentTarget.parentElement._templateInstance._data.item.index - 1;
      this.exercise.sets.splice(index, 1);
      this._updateIndexes();
      this._handleSetsChange();
    },
    _updateIndexes: function() {
      var index, set, _i, _len, _ref;
      _ref = this.exercise.sets;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        set = _ref[index];
        set.index = index + 1;
      }
    }
  });

}).call(this);
