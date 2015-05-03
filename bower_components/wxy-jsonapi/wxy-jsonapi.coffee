Polymer
  is: "wxy-jsonapi"

  properties:
    url: String
    list: Object

  hostAttributes:
    hidden: true

  getList: ->
    return Promise.resolve @list if @list

    listPromise = @$.ajax.send
      url: @url

    listPromise.then (@list) -> @list
