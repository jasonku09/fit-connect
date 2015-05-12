Polymer
  is: "wxy-jsonapi"

  properties:
    url: String
    list: Object
    method: String
    params: Object
    body: Object

  hostAttributes:
    hidden: true

  getList: ->
    return Promise.resolve @list if @list

    listPromise = @$.ajax.send
      url: @url
      params: @params
      method: @method
      body: @body

    listPromise.then (@list) -> @list
