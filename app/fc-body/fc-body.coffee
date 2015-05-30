Polymer
  is: 'fc-body'

  properties:
    muscles: Object

    projector:
      type: Object
      value: new THREE.Projector()

    defaultHSL: Number

    theta:
      type: Number
      value: 0

    rotate:
      type: Boolean
      value: false

    rotateCounter:
      type: Number
      value: 1.5

    spinSpeed:
      type: Number
      value: 0.005

  created: ->
    @objects = []
    @muscleDictionary = {}
    @settings =
      color: new THREE.Color "#000000"
      opacity: 0.5
      yAdjust: 30

  ready: ->
    @async ->
      @containerWidth = @$.body.clientWidth
      @containerHeight = @$.body.clientHeight

      @muscleNames = @getMuscleNames()

      @_createCamera()
      @_createRenderer()
      @_createScene()

      #if not @rotate
      @controls = new THREE.OrbitControls @camera, @$.body

      @$.body.appendChild @renderer.domElement
      @_render()
      return
    , 100
    return

  detached: ->
    for object in @objects
      @scene.remove object
      object.material.dispose()
      object.geometry.dispose()
    return

  handleResize: ->
    @async ->
      @containerWidth = @$.body.clientWidth
      @containerHeight = @$.body.clientHeight

      @camera.aspect = @containerWidth / @containerHeight
      @camera.updateProjectionMatrix()
      @renderer.setSize @containerWidth, @containerHeight
    , 100
    return

  getMuscleNames: ->
    muscles = 'Abdominals,Abductors,Adductors,Biceps,Calves,Chest,Forearms,Glutes,Hamstrings,Lats,Lower Back,Middle Back,Neck,Obliques,Quadriceps,Shoulders,Traps,Triceps'.split ','
    ((muscle.charAt(0).toLowerCase() + muscle.slice(1)).replace(/\s/g, '') for muscle in muscles)

  _handleTap: (event, detail, sender) ->
    event.preventDefault()
    @selectedObject?.material.opacity = 0.5

    @selectedObject = @_getIntersection event
    return

  _render: ->
    @_animate()
    @rotateCounter += @spinSpeed
    @renderer.render @scene, @camera
    requestAnimationFrame @_render.bind @
    return

  _getMuscleNamesetIntersection: (event) ->
    x = (event.x - 20) / @containerWidth * 2 - 1
    y = - (event.y - 20) /  @containerHeight * 2 + 1
    vector = new THREE.Vector3 x, y, 1
    @projector.unprojectVector vector, @camera
    raycaster = new THREE.Raycaster @camera.position, vector.sub(@camera.position).normalize()
    intersects = raycaster.intersectObjects @objects
    if intersects.length > 0 then intersects[0].object else null

  _createCamera: ->
    viewAngle = 60
    aspectRatio = @containerWidth / @containerHeight
    near = 1
    far = 10000
    @camera = new THREE.PerspectiveCamera viewAngle, aspectRatio, near, far
    @camera.position.z = 60
    #@camera.position.x = -50
    #cameraLookPoint = new THREE.Vector3 0, 0, 100
    #@camera.lookAt cameraLookPoint
    return

  _createScene: ->
    @scene = new THREE.Scene()
    @_loadModels()
    return

  _createRenderer: ->
    @renderer = new THREE.WebGLRenderer alpha: true
    @renderer.setSize @containerWidth, @containerHeight
    return

  _loadModels: ->
    @loader = new THREE.JSONLoader()
    @_loadModel muscle for muscle in @muscleNames
    return

  _loadModel: (muscleName) ->
    @loader.load "app/fc-body/objects/hifi/#{muscleName}.js", (geometry) =>
      meshMaterial = new THREE.MeshBasicMaterial
        color: @settings.color
        opacity: @settings.opacity
        transparent: true
      mesh = new THREE.Mesh geometry, meshMaterial
      mesh.scale.set 5, 5, 5
      mesh.position.y -= @settings.yAdjust
      @muscleDictionary[mesh.id] = muscleName
      @scene.add mesh
      @objects.push mesh
      @defaultHSL = mesh.material.color.getHSL()
      return
    return

  _animate: ->
    if @selectedObject and not @rotate
      @theta = 0.1
      @selectedObject.material.opacity = (Math.sin @theta) / 5 + 0.7

    if @rotate
      @camera.position.x = 60 * Math.cos @rotateCounter
      @camera.position.z = 60 * Math.sin @rotateCounter
      @camera.lookAt @scene.position

    if @objects.length is 18
      @_updateMuscleColors()
    return

  _updateMuscleColors: ->
    for muscle, index in @muscleNames
      muscleLoad = @muscles[muscle] or 0
      for object in @objects
        if @muscleDictionary[object.id] is muscle
          object.material.color.setRGB 0.61 + (muscleLoad * 0.005), 0.61, 0.61
          object.material.color.offsetHSL 0, 0, -(0.005 * muscleLoad)

    return
