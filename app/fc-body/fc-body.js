(function() {
  Polymer({
    is: 'fc-body',
    properties: {
      muscles: Object,
      projector: {
        type: Object,
        value: new THREE.Projector()
      },
      defaultHSL: Number,
      theta: {
        type: Number,
        value: 0
      },
      rotateCounter: {
        type: Number,
        value: 1.5
      },
      spinSpeed: {
        type: Number,
        value: 0.005
      }
    },
    created: function() {
      this.objects = [];
      this.muscleDictionary = {};
      return this.settings = {
        color: new THREE.Color("#000000"),
        opacity: 0.5,
        yAdjust: 30
      };
    },
    ready: function() {
      this.async(function() {
        this.containerWidth = this.$.body.clientWidth;
        this.containerHeight = this.$.body.clientHeight;
        this.muscleNames = this._GetMuscleNames();
        this._CreateCamera();
        this._CreateRenderer();
        this._CreateScene();
        this.controls = new THREE.OrbitControls(this.camera, this.$.body);
        this.$.body.appendChild(this.renderer.domElement);
        this._Render();
      }, 100);
    },
    onTap: function(event, detail, sender) {
      var _ref;
      event.preventDefault();
      if ((_ref = this.selectedObject) != null) {
        _ref.material.opacity = 0.5;
      }
      this.selectedObject = this._GetIntersection(event);
    },
    onResize: function() {
      this.async(function() {
        this.containerWidth = this.$.body.clientWidth;
        this.containerHeight = this.$.body.clientHeight;
        this.camera.aspect = this.containerWidth / this.containerHeight;
        this.camera.updateProjectionMatrix();
        return this.renderer.setSize(this.containerWidth, this.containerHeight);
      }, 100);
    },
    detached: function() {
      var object, _i, _len, _ref;
      _ref = this.objects;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object = _ref[_i];
        this.scene.remove(object);
        object.material.dispose();
        object.geometry.dispose();
      }
    },
    _Render: function() {
      this._Animate();
      this.rotateCounter += this.spinSpeed;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this._Render.bind(this));
    },
    _GetIntersection: function(event) {
      var intersects, raycaster, vector, x, y;
      x = (event.x - 20) / this.containerWidth * 2 - 1;
      y = -(event.y - 20) / this.containerHeight * 2 + 1;
      vector = new THREE.Vector3(x, y, 1);
      this.projector.unprojectVector(vector, this.camera);
      raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
      intersects = raycaster.intersectObjects(this.objects);
      if (intersects.length > 0) {
        return intersects[0].object;
      } else {
        return null;
      }
    },
    _CreateCamera: function() {
      var aspectRatio, far, near, viewAngle;
      viewAngle = 60;
      aspectRatio = this.containerWidth / this.containerHeight;
      near = 1;
      far = 10000;
      this.camera = new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far);
      this.camera.position.z = 60;
    },
    _CreateScene: function() {
      this.scene = new THREE.Scene();
      this._LoadModels();
    },
    _CreateRenderer: function() {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true
      });
      this.renderer.setSize(this.containerWidth, this.containerHeight);
    },
    _LoadModels: function() {
      var muscle, _i, _len, _ref;
      this.loader = new THREE.JSONLoader();
      _ref = this.muscleNames;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        muscle = _ref[_i];
        this._LoadModel(muscle);
      }
    },
    _LoadModel: function(muscleName) {
      this.loader.load("app/fc-body/objects/hifi/" + muscleName + ".js", (function(_this) {
        return function(geometry) {
          var mesh, meshMaterial;
          meshMaterial = new THREE.MeshBasicMaterial({
            color: _this.settings.color,
            opacity: _this.settings.opacity,
            transparent: true
          });
          mesh = new THREE.Mesh(geometry, meshMaterial);
          mesh.scale.set(5, 5, 5);
          mesh.position.y -= _this.settings.yAdjust;
          _this.muscleDictionary[mesh.id] = muscleName;
          _this.scene.add(mesh);
          _this.objects.push(mesh);
          _this.defaultHSL = mesh.material.color.getHSL();
        };
      })(this));
    },
    _Animate: function() {
      if (this.selectedObject && !this.rotate) {
        this.theta = 0.1;
        this.selectedObject.material.opacity = (Math.sin(this.theta)) / 5 + 0.7;
      }
      if (this.rotate) {
        this.camera.position.x = 60 * Math.cos(this.rotateCounter);
        this.camera.position.z = 60 * Math.sin(this.rotateCounter);
        this.camera.lookAt(this.scene.position);
      }
      if (this.objects.length === 18) {
        this._UpdateMuscleColors();
      }
    },
    _UpdateMuscleColors: function() {
      var index, muscle, muscleLoad, object, _i, _j, _len, _len1, _ref, _ref1;
      _ref = this.muscleNames;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        muscle = _ref[index];
        muscleLoad = this.muscles[muscle] || 0;
        _ref1 = this.objects;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          object = _ref1[_j];
          if (this.muscleDictionary[object.id] === muscle) {
            object.material.color.setRGB(0.61 + (muscleLoad * 0.005), 0.61, 0.61);
            object.material.color.offsetHSL(0, 0, -(0.005 * muscleLoad));
          }
        }
      }
    },
    _GetMuscleNames: function() {
      var muscle, muscles, _i, _len, _results;
      muscles = 'Abdominals,Abductors,Adductors,Biceps,Calves,Chest,Forearms,Glutes,Hamstrings,Lats,Lower Back,Middle Back,Neck,Obliques,Quadriceps,Shoulders,Traps,Triceps'.split(',');
      _results = [];
      for (_i = 0, _len = muscles.length; _i < _len; _i++) {
        muscle = muscles[_i];
        _results.push((muscle.charAt(0).toLowerCase() + muscle.slice(1)).replace(/\s/g, ''));
      }
      return _results;
    }
  });

}).call(this);
