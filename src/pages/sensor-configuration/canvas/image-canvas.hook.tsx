import { useEffect, useState, useCallback, useRef } from 'react';
import { fabric } from 'fabric';

import get from 'lodash/get';

import {
  guid,
  createCircle,
  createLine,
  moveCircleAndUpdateCoordinate,
} from './image-canvas.util';
import { Point } from 'fabric/fabric-impl';
import {
  BackgroundType,
  DrawType,
} from '../recognition-properties/recognition-properties.constant';
// import

export const POINT_RADIUS = 5;

const optionCanvas: Object = {
  hoverCursor: 'pointer',
  selection: false,
  centeredRotation: true,
  backgroundColor: 'transparent',
};

// action
function useImageCanvasHook(
  imageSource: string,
  width: number,
  height: number,
  captureOcrData: Function,
  drawType: DrawType,
  backgroundType: BackgroundType,
  dataRectangle?: any[]
) {
  const [canvas, setCanvas] = useState<any>(null);
  const [isError, setIsError] = useState<boolean>(false);

  function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevState: any = usePrevious({ imageSource });

  const initDrawPolyLine: any = (isDrawZone?: boolean) => {
    let activeLine: any, isDown: boolean;
    let pointArr: Point[] = [];
    let polylineName: any = null;

    function addObjectByPoint(pointer: any) {
      polylineName = guid() || polylineName;
      pointArr.push(pointer);
      const circleId = guid();
      if (activeLine) {
        activeLine.des = circleId;
      }

      createCircle(canvas, {
        left: pointer.x - POINT_RADIUS / 2,
        top: pointer.y - POINT_RADIUS / 2,
        polylineName,
        circleId,
        isDrawZone,
      });
      const arrLength = pointArr.length;

      const lastPoint = get(pointArr, [arrLength - 1]);
      activeLine = createLine(
        canvas,
        [
          get(lastPoint, ['x']) + POINT_RADIUS / 2,
          get(lastPoint, ['y']) + POINT_RADIUS / 2,
          get(lastPoint, ['x']) + POINT_RADIUS / 2,
          get(lastPoint, ['y']) + POINT_RADIUS / 2,
        ],
        { src: circleId, polylineName }
      );
      canvas.add(activeLine);
    }
    canvas.on('object:moving', function (o: any) {
      const circleId = o.target.circleId;
      const pointer = canvas.getPointer(o.e);

      canvas.getObjects('line').map((line: any) => {
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
    });

    canvas.on('object:moved', function (o: any) {
      console.log(o.target.get('type'));
      const objectType = o.target.get('type');
      switch (objectType) {
        case 'polygon':
          break;
        case 'circle':
          moveCircleAndUpdateCoordinate(canvas, o);

          break;
        default:
          break;
      }
    });

    canvas.on('mouse:down', function (o: any) {
      if (o.target || !isDown) {
        return;
      }
      const pointer = canvas.getPointer(o.e);

      addObjectByPoint(pointer);
    });

    canvas.on('mouse:move', function (o: any) {
      if (!isDown || !activeLine) {
        return;
      }
      const pointer = canvas.getPointer(o.e);
      activeLine.set({
        x2: pointer.x + POINT_RADIUS / 2,
        y2: pointer.y + POINT_RADIUS / 2,
      });
      canvas.renderAll();
    });

    canvas.on('mouse:dblclick', (o: any) => {
      if (!isDown) {
        const pointer = canvas.getPointer(o.e);
        isDown = true;
        addObjectByPoint(pointer);
        return;
      }

      if (isDrawZone) {
        canvas.getObjects('line').forEach((element: any) => {
          if (element.polylineName === polylineName) canvas.remove(element);
        });
        canvas.add(
          new fabric.Polygon(pointArr, { fill: 'transparent', stroke: '#f55' })
        );
      } else {
        canvas.remove(activeLine);
        canvas.getObjects().forEach((element: any) => {
          if (element.type === 'line' && !element.des) canvas.remove(element);
        });
      }

      isDown = false;
      pointArr = [];
      polylineName = null;
      activeLine = null;
    });
  };

  // eslint-disable-next-line
  const initBackground = (canvas: any, imgElement: any) => {
    const f_img = new fabric.Image(imgElement);

    canvas.setBackgroundImage(f_img, canvas.renderAll.bind(canvas));
    canvas.setDimensions(
      {
        width: imgElement.width,
        height: imgElement.height,
      },
      {
        backstoreOnly: true,
      }
    );
  };

  // eslint-disable-next-line
  function initVideosBackground(canvas: any) {
    var video1El: any = document.getElementById('video1');
    if (!video1El) return;
    var video1 = new fabric.Image(video1El);
    video1El.load();
    video1El.play();
    console.log(video1El.width);
    canvas.setBackgroundImage(video1, canvas.renderAll.bind(canvas));
    canvas.setDimensions(
      {
        width: video1El.width,
        height: video1El.height,
      },
      {
        backstoreOnly: true,
      }
    );
    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  }

  // eslint-disable-next-line
  const initCanvas = () => {
    const element: any = document.getElementById('image__canvas');
    if (!element) return;
    const _option: Object = { ...optionCanvas, width: width, height: height };
    const canvas: any = new fabric.Canvas(element, _option);
    setCanvas(canvas);
  };

  const initImageBackground = () => {
    if (!imageSource) {
      return;
    }
    const imgElement = new Image();
    imgElement.onload = function () {
      initBackground(canvas, imgElement);
    };
    imgElement.onerror = () => {
      setIsError(true);
    };
    imgElement.src = imageSource;
  };

  const removeEvents = () => {
    canvas.off('mouse:down');
    canvas.off('mouse:up');
    canvas.off('mouse:move');

    canvas.isDrawingMode = false;
    canvas.selection = false;

    return canvas;
  };

  useEffect(() => {
    if (prevState && prevState.imageSource !== imageSource) {
      return;
    }
    setIsError(false);
    const element = document.getElementById('image__canvas-container');
    if (!element) {
      return;
    }
    element.innerHTML = `<canvas id='image__canvas'></canvas>`;
    initCanvas();

    // eslint-disable-next-line
  }, [imageSource]);

  useEffect(() => {
    if (!canvas) return;
    console.log('useEffect canvas drawType');
    removeEvents();
    initDrawPolyLine(drawType === DrawType.Zone);
    // eslint-disable-next-line
  }, [drawType, canvas]);

  useEffect(() => {
    if (!canvas) return;
    console.log('useEffect canvas backgroundType');
    if (backgroundType === BackgroundType.Video) {
      initVideosBackground(canvas);
    } else {
      initImageBackground();
    }

    // eslint-disable-next-line
  }, [backgroundType, canvas]);

  return {
    isError,
    initBackground,
    initVideosBackground,
  };
}

export default useImageCanvasHook;
