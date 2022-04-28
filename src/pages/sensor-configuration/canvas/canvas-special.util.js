import { fabric } from 'fabric';
function polygonPositionHandler(dim, finalMatrix, fabricObject) {
  var x = fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x,
    y = fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y;
  return fabric.util.transformPoint({ x: x, y: y }, fabric.util.multiplyTransformMatrices(fabricObject.canvas.viewportTransform, fabricObject.calcTransformMatrix()));
}

function actionHandler(eventData, transform, x, y) {
  var polygon = transform.target,
    currentControl = polygon.controls[polygon.__corner],
    mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
    polygonBaseSize = polygon._getNonTransformedDimensions(),
    size = polygon._getTransformedDimensions(0, 0),
    finalPointPosition = {
      x: (mouseLocalPosition.x * polygonBaseSize.x) / size.x + polygon.pathOffset.x,
      y: (mouseLocalPosition.y * polygonBaseSize.y) / size.y + polygon.pathOffset.y,
    };
  polygon.points[currentControl.pointIndex] = finalPointPosition;
  return true;
}

function anchorWrapper(anchorIndex, fn) {
  return function (eventData, transform, x, y) {
    var fabricObject = transform.target,
      absolutePoint = fabric.util.transformPoint(
        {
          x: fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
          y: fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y,
        },
        fabricObject.calcTransformMatrix()
      ),
      actionPerformed = fn(eventData, transform, x, y),
      newDim = fabricObject._setPositionDimensions({}),
      polygonBaseSize = fabricObject._getNonTransformedDimensions(),
      newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
      newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
    fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
    return actionPerformed;
  };
}
const updateControl = (object) => {
  object.edit = true;
  object.objectCaching = false;

  const lastControl = object.points.length - 1;
  object.cornerStyle = 'circle';
  object.cornerColor = object.stroke || '#18C7BC';
  object.cornerStrokeColor = '#fff';
  object.controls = object.points.reduce((acc, point, index) => {
    acc['p' + index] = new fabric.Control({
      positionHandler: polygonPositionHandler,
      actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
      pointIndex: index,
      point: point,
      visible: true,
    });
    return acc;
  }, {});

  object.hasBorders = false;

  return object;
};

const initFabricPrototype = () => {
  fabric.Canvas.prototype.getItemsById = function (name) {
    var objects = this.getObjects();

    for (var i = 0, len = this.size(); i < len; i++) {
      if (objects[i].id && objects[i].id === name) {
        return objects[i];
      }
    }

    return null;
  };

  fabric.Canvas.prototype.getItemsByPolyName = function (name) {
    var objects = this.getObjects();

    for (var i = 0, len = this.size(); i < len; i++) {
      if (objects[i].type !== 'circle' && objects[i].polyName && objects[i].polyName === name) {
        return objects[i];
      }
    }

    return null;
  };
};

export { updateControl, initFabricPrototype };
