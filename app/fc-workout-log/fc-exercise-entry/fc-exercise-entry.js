(function() {
  Polymer({
    is: "fc-exercise-entry",
    properties: {
      exercise: Object,
      sets: {
        type: Array,
        observer: '_handleSetsChange'
      }
    },
    attached: function() {
      this.sets = [
        {
          index: 1,
          reps: null,
          weight: null
        }
      ];
      this.collapseID = 'collapse' + Math.round(Math.random() * 10000000000000);
    },
    _handleSetsChange: function() {
      return this.description = "Sets:" + (this.sets.length - 1);
    },
    handleExerciseToggle: function() {
      document.querySelector('#' + this.collapseID).toggle();
    },
    onFocus: function(e) {
      if (e.currentTarget.parentElement._templateInstance._data.item.index === this.sets.length) {
        this.sets.push({
          index: this.sets.length + 1,
          reps: null,
          weight: null
        });
      }
      this._updateIndexes();
      this._handleSetsChange();
    },
    onDeleteSetTap: function(e) {
      var index;
      if (this.sets.length === 1) {
        return;
      }
      index = e.currentTarget.parentElement._templateInstance._data.item.index - 1;
      this.sets.splice(index, 1);
      this._updateIndexes();
      this._handleSetsChange();
    },
    _updateIndexes: function() {
      var index, set, _i, _len, _ref;
      _ref = this.sets;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        set = _ref[index];
        set.index = index + 1;
      }
    }
  });

}).call(this);
