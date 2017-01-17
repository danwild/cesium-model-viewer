(function(Cesium){

    'use strict';

    var CesiumModelViewer = {

        viewer: null,
        scene: null,
        extent: null,
        layerFiles: [
            '/files/gbr4_2.0-23.75.png',
            '/files/gbr4_2.0-17.75.png',
            '/files/gbr4_2.0-12.75.png',
            '/files/gbr4_2.0-5.55.png',
            '/files/gbr4_2.0-0.5.png'
        ],

        init: function(){
            this.initViewer();
            this.initLayers();
            this.initSensors();
        },

        initViewer: function(){

            this.extent = Cesium.Rectangle.fromDegrees(110, 10, 179, -50);
            Cesium.Camera.DEFAULT_VIEW_RECTANGLE = this.extent;
            Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

            this.viewer = new Cesium.Viewer('cesiumContainer', {
                animation: false,
                vrButton: true,
                timeline: false
            });
            this.scene = CesiumModelViewer.viewer.scene;

        },

        initLayers: function(){

            this.layerFiles.reverse();
            for(var i = 0; i < this.layerFiles.length; i++){
                var height = i * 200000;
                this.addLayer(height, this.layerFiles[i]);
            }

        },

        addLayer: function(height, file){

            var instance = new Cesium.GeometryInstance({
                geometry : new Cesium.RectangleGeometry({
                    rectangle : Cesium.Rectangle.fromDegrees(142.168788, -28.6960218, 156.8856378, -7.011908200000001),
                    vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                    height: height
                })
            });

            this.scene.primitives.add(new Cesium.Primitive({
                geometryInstances : instance,
                appearance : new Cesium.EllipsoidSurfaceAppearance({
                    material: new Cesium.Material({
                        fabric : {
                            uniforms : {
                                image : file,
                                repeat : new Cesium.Cartesian2(1.0, 1.0),
                                alpha : 0.5
                            },
                            components : {
                                diffuse : 'texture2D(image, fract(repeat * materialInput.st)).rgb',
                                alpha : 'texture2D(image, fract(repeat * materialInput.st)).a * alpha'
                            }
                        }
                    })
                })
            }));

        },

        initSensors: function(){

            var lat = -11;
            var lon = 146;

            for(var i = 0; i < 18; i++){

                this.viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(lon + (i *.5), lat  - i),
                    name : 'Some sensor data..',
                    ellipse : {
                        semiMinorAxis : 1000.0,
                        semiMajorAxis : 1000.0,
                        extrudedHeight : 1100000.0,
                        material : Cesium.Color.fromRandom()
                    }
                });


            }

        }
    };

    CesiumModelViewer.init();

})(Cesium);










