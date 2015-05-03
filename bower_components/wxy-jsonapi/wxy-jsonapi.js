(function() {
  Polymer({
    is: "wxy-jsonapi",
    properties: {
      url: String,
      list: Object
    },
    hostAttributes: {
      hidden: true
    },
    getList: function() {
      var listPromise;
      if (this.list) {
        return Promise.resolve(this.list);
      }
      listPromise = this.$.ajax.send({
        url: this.url
      });
      return listPromise.then(function(list) {
        this.list = list;
        return this.list;
      });
    }
  });

}).call(this);
