import { fabric } from 'fabric';

import map from 'lodash/map';
import filter from 'lodash/filter';
import flattenDeep from 'lodash/flattenDeep';
import pick from 'lodash/pick';
import { updateControl } from './canvas-special.util';
import { cloneDeep } from 'lodash';
<<<<<<< Updated upstream
import { DrawType } from 'constants/recognition-properties.constant';
import { GateColor } from 'constants/color';
=======
import { DrawType } from '../recognition-properties/recognition-properties.constant';
>>>>>>> Stashed changes

const propsOfRect: string[] = [
  'left',
  'top',
  'width',
  'height',
  'id',
  'fieldName',
  'value',
];

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
};
const createRect = (canvas: any, option: object) => {
  const rect = new fabric.Rect({
    originX: 'left',
    originY: 'top',
    strokeWidth: 1,
    stroke: 'red',
    fill: 'transparent',
    hoverCursor: 'pointer',
    selectable: true,
    lockMovementX: true,
    lockMovementY: true,
    hasControls: false,
    ...option,
  });

  if (canvas) {
    canvas.add(rect);
  }
  return rect;
};

const validateRect = (rect: any) => {
  if (!rect) {
    return false;
  }
  if (!rect.done && rect.height && rect.width) {
    return true;
  }
  return false;
};

const changeSelectable = (
  canvasInit: any,
  defaultCursor: string,
  value: boolean,
  rectCursor?: string
) => {
  if (!canvasInit) {
    return;
  }
  canvasInit.forEachObject(function (obj: any) {
    obj.selectable = value;
    obj.hoverCursor = rectCursor || defaultCursor;
  });

  canvasInit.defaultCursor = defaultCursor;

  canvasInit.renderAll();
};

const parseOrcData: any = (data: string) => {
  if (!data) {
    return null;
  }
  let dataOcr: any = typeof data === 'string' ? JSON.parse(data) : data;
  if (!dataOcr) {
    return null;
  }
  dataOcr = dataOcr.words_result;
  let result: any = flattenDeep(map(dataOcr, 'chars'));
  let i = 1;
  result = map(result, (_d) => {
    const { left, top, width, height } = _d.location;

    _d.position = {
      p1: {
        x: left,
        y: top,
      },
      p2: {
        x: left + width,
        y: top,
      },
      p3: {
        x: left + width,
        y: top + height,
      },
      p4: {
        x: left,
        y: top + height,
      },
    };
    _d.k = i;
    _d.description = _d.char;
    i++;
    delete _d.location;
    return _d;
  });
  return result;
};

const getTextFromRect = (rect: any, ocrData: any) => {
  const position = {
    p1: {
      x: rect.left,
      y: rect.top,
    },
    p2: {
      x: rect.left + rect.width,
      y: rect.top,
    },
    p3: {
      x: rect.left + rect.width,
      y: rect.top + rect.height,
    },
    p4: {
      x: rect.left,
      y: rect.top + rect.height,
    },
  };

  const result = filter(ocrData, (_d) => {
    const posiotionOcr = _d.position;
    if (
      position.p1.x < posiotionOcr.p1.x &&
      position.p1.y < posiotionOcr.p1.y &&
      position.p2.x > posiotionOcr.p2.x &&
      position.p2.y < posiotionOcr.p2.y &&
      position.p3.x > posiotionOcr.p3.x &&
      position.p3.y > posiotionOcr.p3.y
    ) {
      return true;
    }
    return false;
  });

  rect.value = map(result, 'description').join('');
  return {
    value: rect.value,
    position: position,
    rectDetail: [pick(rect, propsOfRect)],
  };
};

const getTextByPoint = (point: any, orcData: any) => {
  const result = filter(orcData, (_d) => {
    const posiotionOcr = _d.position || {};
    if (
      point.x > posiotionOcr.p1.x &&
      point.y > posiotionOcr.p1.y &&
      point.x < posiotionOcr.p2.x &&
      point.y > posiotionOcr.p2.y &&
      point.x < posiotionOcr.p3.x &&
      point.y < posiotionOcr.p3.y &&
      point.x > posiotionOcr.p4.x &&
      point.y < posiotionOcr.p4.y
    ) {
      return true;
    }
    return false;
  })[0];
  if (!result) {
    return {};
  }
  return {
    value: result.description,
    position: result.position,
  };
};

const getWidthHeightAfterRotate = (position: any, angle: number) => {
  let { width, height, left, top } = position;

  switch (angle) {
    case 0:
    case 360:
      break;
    case 90:
      left = left + width;
      break;
    case 180:
      left = left + width;
      top = top + height;
      break;
    case 270:
      top = top + height;
      break;
    default:
      break;
  }

  var rad = (angle * Math.PI) / 180,
    sin = Math.sin(rad),
    cos = Math.cos(rad);

  var newWidth = Math.abs(width * cos) + Math.abs(height * sin),
    newHeight = Math.abs(width * sin) + Math.abs(height * cos);
  position.width = newWidth;
  position.height = newHeight;
  position.top = top;
  position.left = left;

  return position;
};

const createCircle = (canvas: any, option: any) => {
  const circle = new fabric.Circle({
    originX: 'center',
    originY: 'center',
    radius: 7 / canvas.getZoom(),
    fill: '#eee',
    hasControls: false,
    centeredRotation: true,
    ...option,
  });
  if (option.finish)
    circle.on('selected', (o: any) => {
      canvas.getObjects().forEach((obj: any) => {
        if (obj.type !== 'circle' && obj.polyName === o.target.polyName) {
          canvas.setActiveObject(obj);
        }
      });
    });
  if (canvas) {
    canvas.add(circle);
  }
};

const createLine = (canvas: any, points: any[], option: any) => {
  const line = new fabric.Line(points, {
    strokeWidth: 2 / canvas.getZoom(),
    stroke: '#eee',
    selectable: false,
    ...option,
  });
  if (canvas) {
    canvas.add(line);
  }

  return line;
};

const createPolyline = (canvas: any, points: any[], option: any) => {
  // create Polyline from collected points
  let polyline = new fabric.Polyline(points, {
<<<<<<< Updated upstream
    objectCaching: false,
    moveable: false,
    perPixelTargetFind: true,
    strokeWidth: 2 / canvas.getZoom(),
=======
    id: guid(),
    objectCaching: false,
    moveable: false,
    perPixelTargetFind: true,
    strokeWidth: 6,
>>>>>>> Stashed changes
    ...getOptionByType(option.drawType),
    ...option,
  });
  if (!canvas) return polyline;

  polyline = updateControl(polyline);
  canvas.add(polyline);
  canvas.renderAll();

  canvas.setActiveObject(polyline);

  return polyline;
};

const createPolygon = (canvas: any, points: any[], option: any) => {
  // create Polyline from collected points
  let polygon = new fabric.Polygon(points, {
<<<<<<< Updated upstream
    objectCaching: false,
    moveable: false,
    perPixelTargetFind: true,
    strokeWidth: 2 / canvas.getZoom(),
=======
    id: guid(),
    objectCaching: false,
    moveable: false,
    perPixelTargetFind: true,
    strokeWidth: 6,
>>>>>>> Stashed changes
    ...getOptionByType(option.drawType),
    ...option,
  });
  if (!canvas) return polygon;
  polygon = updateControl(polygon);
  canvas.add(polygon);
  canvas.renderAll();
  canvas.setActiveObject(polygon);
  return polygon;
};

const moveCircleAndUpdatePolylineCoordinate = (
  canvas: any,
  circle: any,
  objectType: string
) => {
  canvas.getObjects(objectType).forEach((object: any) => {
    if (object.polyName === circle.polyName) {
      object.points[circle.circleIndex] = { x: circle.left, y: circle.top };
      object.setCoords();
      updateControl(object);
    }
    return object;
  });

  canvas.renderAll();
};

const createFakeControlCircle = (canvas: any, object: any) => {
  const points = object.points;
  for (const key in points) {
    if (Object.prototype.hasOwnProperty.call(points, key)) {
      const point: any = points[key];
      var x = point.x - object.pathOffset.x,
        y = point.y - object.pathOffset.y;
      const newPoint = fabric.util.transformPoint(
        new fabric.Point(x, y),
        object.calcTransformMatrix()
      );
      createCircle(canvas, {
        left: newPoint.x,
        top: newPoint.y,
        polyName: object.polyName,
        circleIndex: key,
        stroke: object.stroke,
        fill: object.stroke,
        finish: true,
        radius: object.cornerSize / (canvas.getZoom() * 2),
      });
    }
  }

  object.setCoords();
};

const getCurrentDataToSave = (object: any, callback?: any) => {
  object = cloneDeep(object);
  const ENUM_DATA = [
    'id',
<<<<<<< Updated upstream
    'isCreated',
=======
>>>>>>> Stashed changes
    'points',
    'drawType',
    'stroke',
    'strokeWidth',
    'fill',
    'polyName',
  ];
<<<<<<< Updated upstream

  const zoomNumber = object.canvas.getZoom();
  const points = [];
  for (const key in object.oCoords) {
    if (Object.prototype.hasOwnProperty.call(object.oCoords, key)) {
      let point: any = object.oCoords[key];
      points.push(new fabric.Point(point.x / zoomNumber, point.y / zoomNumber));
=======
  const points = object.points;

  for (const key in points) {
    if (Object.prototype.hasOwnProperty.call(points, key)) {
      const point: any = points[key];
      var x = point.x - object.pathOffset.x,
        y = point.y - object.pathOffset.y;
      points[key] = fabric.util.transformPoint(
        new fabric.Point(x, y),
        object.calcTransformMatrix()
      );
>>>>>>> Stashed changes
    }
  }

  const response = pick(object, ENUM_DATA);
  response.points = points;
  if (callback) callback(response);

  return response;
};

const getOptionByType = (drawType: DrawType) => {
  let stroke = '';
  let fill = 'transparent';

  switch (drawType) {
    case DrawType.LineIn:
    case DrawType.LineInAndOut:
    case DrawType.LineOut:
<<<<<<< Updated upstream
      stroke = GateColor.LineIn;
      break;
    case DrawType.ZoneExclusion:
      stroke = GateColor.ZoneExclusion;
=======
      stroke = '#18c7bc';
      break;
    case DrawType.ZoneExclusion:
      stroke = '#d20013';
>>>>>>> Stashed changes
      fill = 'rgba(210,0,19,0.1)';
      break;

    case DrawType.ZoneFloor:
<<<<<<< Updated upstream
      stroke = GateColor.ZoneFloor;
      fill = '#c6ff0020';
      break;
    case DrawType.ZoneMark:
      stroke = GateColor.ZoneMark;
=======
      stroke = '#c6ff00';
      fill = '#c6ff0020';
      break;
    case DrawType.ZoneMark:
      stroke = '#d500f9';
>>>>>>> Stashed changes
      fill = '#d500f920';
      break;
    default:
      break;
  }

  return { stroke, fill };
};

const validatePolyObject = (drawType: DrawType, points: any[]) => {
  if (points.length < 2) return false;
  if (
    points.length === 2 &&
    (drawType === DrawType.ZoneExclusion ||
      drawType === DrawType.ZoneFloor ||
      drawType === DrawType.ZoneMark)
  ) {
    return false;
  }

  return true;
};

export {
  changeSelectable,
  createCircle,
  createLine,
  createRect,
  createPolyline,
  createPolygon,
  createFakeControlCircle,
  getCurrentDataToSave,
  getOptionByType,
  getTextFromRect,
  getTextByPoint,
  guid,
  getWidthHeightAfterRotate,
  moveCircleAndUpdatePolylineCoordinate,
  parseOrcData,
  validateRect,
  validatePolyObject,
};
