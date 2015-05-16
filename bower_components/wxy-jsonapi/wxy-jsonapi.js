(function() {
  Polymer({
    is: "wxy-jsonapi",
    properties: {
      url: String
    },
    hostAttributes: {
      hidden: true
    },
    getAccount: function() {
      var accountPromise;
      if (this.account) {
        return Promise.resolve(this.account);
      }
      accountPromise = this.$.ajax.send({
        url: "https://fitconnectapp.appspot.com/api/account",
        params: {
          "token": this.token
        },
        method: "GET"
      });
      return accountPromise.then(function(account) {
        this.account = account;
        return this.account;
      });
    },
    createAccount: function(username, email, password) {
      var data, promise;
      data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("phrase", password);
      promise = this.$.ajax.send({
        url: "https://fitconnectapp.appspot.com/api/account/create",
        method: "POST",
        body: data
      });
      return promise.then(this._onLoginResponse.bind(this));
    },
    getClientList: function() {
      var listPromise;
      if (this.list) {
        return Promise.resolve(this.list);
      }
      listPromise = this.$.ajax.send({
        url: "https://fitconnectapp.appspot.com/api/account/clients",
        params: {
          "token": this.token
        },
        method: "GET"
      });
      return listPromise.then(function(list) {
        this.list = list;
        return this.list;
      });
    },
    getWorkoutHistory: function(userId) {
      var historyPromise;
      if (this.history) {
        return Promise.resolve(this.history);
      }
      historyPromise = this.$.ajax.send({
        url: "https://fitconnectapp.appspot.com/api/account/workouts",
        params: {
          "token": this.token,
          "user_id": userId
        },
        method: "GET"
      });
      return historyPromise.then(function(history) {
        return history;
      });
    },
    addWorkoutHistory: function(workout) {
      var data, promise;
      data = new FormData();
      data.append("name", workout.name);
      data.append("user_id", workout.userId);
      data.append("exercises", workout.exercises);
      data.append("token", this.token);
      promise = this.$.ajax.send({
        url: "https://fitconnectapp.appspot.com/api/account/workouts",
        method: "POST",
        body: data
      });
      return promise.then(function() {});
    },
    getWorkoutTemplates: function() {
      if (this.workoutTemplates) {
        return this.workoutTemplates;
      }
      this.workoutTemplates = this.$.templateStorage.value;
      return this.workoutTemplates;
    },
    addWorkoutTemplate: function(template) {
      if (!this.$.templateStorage.value) {
        this.workoutTemplates = [];
      } else {
        this.workoutTemplates = this.$.templateStorage.value;
      }
      this.workoutTemplates.push(template);
      this.$.templateStorage.save();
    },
    login: function(email, password) {
      var data, promise;
      data = new FormData();
      data.append("email", email);
      data.append("phrase", password);
      promise = this.$.ajax.send({
        url: "https://fitconnectapp.appspot.com/login",
        method: "POST",
        body: data
      });
      return promise.then(this._onLoginResponse.bind(this));
    },
    addClient: function(username, email) {
      var data, promise;
      data = new FormData();
      data.append("username", username);
      data.append("email", email || '');
      data.append("token", this.token);
      promise = this.$.ajax.send({
        url: "https://fitconnectapp.appspot.com/api/account/clients",
        method: "POST",
        body: data
      });
      return promise.then(function() {});
    },
    _onLoginResponse: function(response) {
      this.token = response.token;
    }
  });

}).call(this);
