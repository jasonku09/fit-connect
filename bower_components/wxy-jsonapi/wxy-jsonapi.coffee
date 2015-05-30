Polymer
  is: "wxy-jsonapi"

  properties:
    uri: String
    token: String
    list: Object

  getList: ->
    return Promise.resolve @list.data if @list

    promise = @$.ajax.send
      method: "GET"
      url: @uri
      params:
        token: @token

    promise.then (@list) => @list.data

  get: ->

  post: (form) ->
    form.token = @token
    @getList().then =>
      # TODO: list should contain create link
      promise = @$.ajax.send
        method: "POST"
        url: @uri # This should be create link
        body: JSON.stringify form
        params:
          token: @token

      return promise
      # TODO: do stuff with result

  put: ->

  delete: ->
