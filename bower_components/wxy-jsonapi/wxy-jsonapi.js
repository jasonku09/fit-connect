(function() {
  Polymer({
    is: "wxy-jsonapi",
    properties: {
      url: String,
      list: Object,
      method: String,
      params: Object,
      body: Object
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
        url: this.url,
        params: this.params,
        method: this.method,
        body: this.body
      });
      return listPromise.then(function(list) {
        this.list = list;
        return this.list;
      });
    }
  });

}).call(this);
