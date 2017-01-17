

var extent = Cesium.Rectangle.fromDegrees(110, 10, 179, -50);
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

var viewer = new Cesium.Viewer('cesiumContainer');
var scene = viewer.scene;

var layerFiles = [
	'/files/gbr4_2.0-0.5.png',
	'/files/gbr4_2.0-5.55.png',
	'/files/gbr4_2.0-12.75.png',
	'/files/gbr4_2.0-17.75.png',
	'/files/gbr4_2.0-23.75.png'
];

layerFiles.reverse();

for(var i = 0; i < layerFiles.length; i++){

	var height = i * 200000;
	addLayer(height, layerFiles[i]);
}

function addLayer(height, file){

	var instance = new Cesium.GeometryInstance({
		geometry : new Cesium.RectangleGeometry({
			rectangle : Cesium.Rectangle.fromDegrees(142.168788, -28.6960218, 156.8856378, -7.011908200000001),
			vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
			height: height
		})
	});

	scene.primitives.add(new Cesium.Primitive({
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

}


