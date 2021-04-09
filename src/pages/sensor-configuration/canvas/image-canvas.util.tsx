import { fabric } from 'fabric';

import map from 'lodash/map';
import filter from 'lodash/filter';
import flattenDeep from 'lodash/flattenDeep';
import pick from 'lodash/pick';
import { POINT_RADIUS } from './image-canvas.hook';

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
    ...option,
    originX: 'left',
    originY: 'top',
    radius: POINT_RADIUS,
    fill: '#f55',
    hasControls: false,
  });
  circle.on('dragover', (o: any) => {
    console.log('circle dragover');
  });

  circle.on('dragleave', (o: any) => {
    console.log('circle dragleave');
  });

  if (canvas) {
    canvas.add(circle);
  }
};

const createLine = (canvas: any, points: any[], option: any) => {
  const line = new fabric.Line(points, {
    ...option,
    strokeWidth: 2,
    stroke: '#f55',
    selectable: false,
  });
  if (canvas) {
    canvas.add(line);
  }

  return line;
};

const moveCircleAndUpdateCoordinate = (canvas: any, option: any) => {
  if (option.target.isDrawZone) {
    return;
  }

  const circleId = option.target.circleId;
  const pointer = canvas.getPointer(option.e);

  canvas.getObjects('line').forEach((line: any) => {
    if (line.src === circleId) {
      line.set({
        x1: pointer.x + POINT_RADIUS / 2,
        y1: pointer.y + POINT_RADIUS / 2,
      });
    }
    if (line.des === circleId) {
      line.set({
        x2: pointer.x + POINT_RADIUS / 2,
        y2: pointer.y + POINT_RADIUS / 2,
      });
    }
  });
  canvas.renderAll();
};

export {
  changeSelectable,
  createCircle,
  createLine,
  createRect,
  getWidthHeightAfterRotate,
  getTextFromRect,
  getTextByPoint,
  guid,
  moveCircleAndUpdateCoordinate,
  parseOrcData,
  validateRect,
};
