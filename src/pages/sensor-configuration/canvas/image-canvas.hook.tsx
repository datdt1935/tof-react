import {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useImperativeHandle,
} from 'react';
import { fabric } from 'fabric';

import get from 'lodash/get';
import omit from 'lodash/omit';

import {
  guid,
  createCircle,
  createLine,
  createPolygon,
  createPolyline,
  createFakeControlCircle,
  getCurrentDataToSave,
  getOptionByType,
  validatePolyObject,
} from './image-canvas.util';

import {
  BackgroundType,
  DrawType,
} from 'constants/recognition-properties.constant';
import { updateControl } from './canvas-special.util';
import { CanvasState, initialCanvasState } from 'constants/canvas.contant';
import produce from 'immer';
import { cloneDeep } from 'lodash';

const optionCanvas: Object = {
  hoverCursor: 'pointer',
  selection: false,
  backgroundColor: 'transparent',
  stopContextMenu: true,
  targetFindTolerance: 20,
};

// action
function useImageCanvasHook(
  imageSource: string,
  finishDraw: Function,
  drawType: DrawType,
  backgroundType: BackgroundType,
  ref?: any
) {
  const [state, setState] = useState<CanvasState>(initialCanvasState);

  const containerRef = useRef(null);

  function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevState: any = usePrevious({ imageSource });

<<<<<<< Updated upstream
  const setSelection = useCallback(
    (selection: boolean) => {
      state.canvas.getObjects().forEach((object: any) => {
        if (object.type === 'polyline' || object.type === 'polygon')
          object.evented = selection;
      });
    },
    [state.canvas]
  );

  const initDrawPolyLine: any = useCallback(() => {
=======
  const initDrawPolyLine: any = () => {
>>>>>>> Stashed changes
    let activeLine: any, isDrawing: boolean;
    let pointArr: any[] = [];
    let polyName: any = null;
    let circleIndex = 0;

    const canvas = state.canvas;

    function addObjectByPoint(pointer: any) {
      polyName = polyName || guid();
      pointArr.push(pointer);
      const stroke = getOptionByType(drawType).stroke;
      createCircle(state.canvas, {
        left: pointer.x,
        top: pointer.y,
        fill: stroke,
        polyName,
        circleIndex,
      });
      const arrLength = pointArr.length;

      const lastPoint = get(pointArr, [arrLength - 1]);
      activeLine = createLine(
        state.canvas,
        [
          get(lastPoint, ['x']),
          get(lastPoint, ['y']),
          get(lastPoint, ['x']),
          get(lastPoint, ['y']),
        ],
        {
          polyName,
          stroke: stroke,
        }
      );
      circleIndex++;
      state.canvas.add(activeLine);
    }

    canvas.on('object:modified', function (option: any) {
      const object = option.target;
      if (object.type !== 'polyline' && object.type !== 'polygon') return;
      object._calcDimensions();
      object.setCoords();
      canvas.renderAll();
      const activeObject = canvas.getActiveObject();
      if (activeObject.id === object.id) {
        setState(
          produce((draft: CanvasState) => {
            draft.activeObject = object;
          })
        );
      }
      getCurrentDataToSave(object, finishDraw);
    });

    canvas.on('selection:updated', function (option: any) {
      const object = option.target;
      if (object.type !== 'polygon' && object.type !== 'polyline') return;
      if (state.activeObject) {
        createFakeControlCircle(canvas, state.activeObject);
      }
      canvas.getObjects('circle').forEach((circle: any) => {
        if (circle.polyName === object.polyName) canvas.remove(circle);
      });

      setState(
        produce((draft: CanvasState) => {
          draft.activeObject = object;
        })
      );
      canvas.renderAll();
    });
    canvas.on('selection:created', function (option: any) {
      const object = option.target;
      if (
        (object.type !== 'polygon' && object.type !== 'polyline') ||
        isDrawing
      )
        return;
=======
>>>>>>> Stashed changes

      canvas.getObjects('circle').forEach((circle: any) => {
        if (circle.polyName === object.polyName) canvas.remove(circle);
      });
      setState(
        produce((draft: CanvasState) => {
          draft.activeObject = object;
        })
      );
      canvas.renderAll();
    });

    canvas.on('before:selection:cleared', function (option: any) {
      const object = option.target;
      setState(
        produce((draft: CanvasState) => {
          draft.activeObject = null;
        })
      );
      if (object.type !== 'polygon' && object.type !== 'polyline') return;
      createFakeControlCircle(canvas, object);
    });

    canvas.on('mouse:down', function (o: any) {
      if (!isDrawing) {
        return;
      }
      const pointer = canvas.getPointer(o.e);

      addObjectByPoint(pointer);
    });

    canvas.on('mouse:move', function (o: any) {
      if (!isDrawing || !activeLine) {
        return;
      }
      const pointer = canvas.getPointer(o.e);
      activeLine.set({
        x2: pointer.x,
        y2: pointer.y,
      });
      canvas.renderAll();
    });

    canvas.on('mouse:dblclick', (o: any) => {
<<<<<<< Updated upstream
      if (!!o.target && o.target.type !== 'circle') return;
=======
>>>>>>> Stashed changes
      if (!isDrawing) {
        const pointer = canvas.getPointer(o.e);
        isDrawing = true;
        addObjectByPoint(pointer);
        setSelection(false);
        return;
      }

      const circlePoints: any[] = [];
      setSelection(true);

      canvas.remove(activeLine);
      canvas.getObjects().forEach((object: any) => {
        if (object.type === 'line' && object.polyName === polyName)
          canvas.remove(object);
        if (object.type === 'circle' && object.polyName === polyName) {
          circlePoints.push(object);
          canvas.remove(object);
        }
      });
      canvas.renderAll();
      if (!validatePolyObject(drawType, pointArr)) {
        isDrawing = false;
        pointArr = [];
        polyName = null;
        activeLine = null;
        circleIndex = 0;
        return;
      }
      if (
        drawType === DrawType.ZoneExclusion ||
        drawType === DrawType.ZoneFloor ||
        drawType === DrawType.ZoneMark
      ) {
        const polygon = createPolygon(canvas, pointArr, {
          polyName,
          drawType,
        });
        getCurrentDataToSave(polygon, finishDraw);
        setState(
          produce((draft: CanvasState) => {
            draft.activeObject = polygon;
          })
        );
      } else {
        const polyline = createPolyline(canvas, pointArr, {
          polyName,
          drawType,
        });
        getCurrentDataToSave(polyline, finishDraw);
        setState(
          produce((draft: CanvasState) => {
            draft.activeObject = polyline;
          })
        );
      }

      isDrawing = false;
      pointArr = [];
      polyName = null;
      activeLine = null;
      circleIndex = 0;
    });
  }, [state.activeObject, state.canvas, drawType, finishDraw, setSelection]);

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

  const zoomImage = useCallback(
    (zoomNumber: number) => {
      const canvas = state.canvas;
      let zoom = canvas.getZoom() * zoomNumber;
      let canvasHeight = canvas.getHeight() * zoomNumber;
      let canvasWidth = canvas.getWidth() * zoomNumber;
      if (canvasWidth > state.containerWidth) {
        const scaleW = state.containerWidth / canvasWidth;
        canvasHeight = canvasHeight * scaleW;
        canvasWidth = canvasWidth * scaleW;
        zoom = zoom * scaleW;
      }

      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);
      canvas.setZoom(zoom);
      canvas.renderAll();
    },
    [state.canvas, state.containerWidth]
  );

  // eslint-disable-next-line
  function initVideosBackground() {
    const canvas = state.canvas;
    var video = document.createElement('video');
    video.setAttribute(
      'src',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    );

    video.setAttribute('width', state.containerWidth + 'px');
    video.setAttribute('height', state.containerWidth + 'px');
    video.addEventListener('loadedmetadata', function (e) {
      canvas.setHeight(video.videoHeight);
      canvas.setWidth(video.videoWidth);
      fabric.util.requestAnimFrame(function render() {
        canvas.renderAll();
        fabric.util.requestAnimFrame(render);
      });
      var video1 = new fabric.Image(video, {
        width: video.videoWidth,
        height: video.videoHeight,
      });

      canvas.setBackgroundImage(video1, canvas.renderAll.bind(canvas));
      canvas.setDimensions({
        width: state.containerWidth,
        height: state.containerHeight,
      });
      //   const scaleH = containerHeight / video.videoHeight;
      //   console.log(scaleH);
      //   zoomImage(scaleH);
    });
    video.load();
    video.play();
    video.remove();
  }

  // eslint-disable-next-line
  const initCanvas = () => {
    const element: any = document.getElementById('image__canvas');
    if (!element) return;
    const offsetHeight = (containerRef.current as any).offsetHeight || 0;
    const offsetWidth = (containerRef.current as any).offsetWidth || 0;

    const _option: Object = {
      ...optionCanvas,
      width: offsetWidth,
      height: offsetHeight,
    };
    const canvas: any = new fabric.Canvas(element, _option);
    setState(
      produce((draft: CanvasState) => {
        draft.containerHeight = offsetHeight;
        draft.containerWidth = offsetWidth;
        draft.canvas = canvas;
      })
    );
  };

  const initImageBackground = () => {
    if (!imageSource) {
      return;
    }
    const imgElement = new Image();
    imgElement.onload = function () {
      state.canvas.setWidth(imgElement.width);
      state.canvas.setHeight(imgElement.height);

      const scaleH = state.containerHeight / imgElement.height;
      initBackground(state.canvas, imgElement);
      zoomImage(scaleH);
    };
    imgElement.onerror = () => {
      setState(
        produce((draft: CanvasState) => {
          draft.isError = true;
        })
      );
    };
    imgElement.src = imageSource;
  };

  const removeEvents = useCallback(() => {
    const canvas = state.canvas;
    canvas.off('object:modified');
    canvas.off('selection:created');
    canvas.off('selection:updated');
    canvas.off('before:selection:cleared');
    canvas.off('object:modified');

    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:dblclick');

    canvas.isDrawingMode = false;
    canvas.selection = false;

    return canvas;
  }, [state.canvas]);

  const reCalculateCanvas = useCallback(() => {
    const canvas = state.canvas;
    if (!canvas) return;
    const offsetHeight = (containerRef.current as any).offsetHeight;
    const offsetWidth = (containerRef.current as any).offsetWidth;

    setState(
      produce((draft: CanvasState) => {
        draft.containerHeight = offsetHeight;
        draft.containerWidth = offsetWidth;
      })
    );
    const canvasHeight = canvas.getHeight();
    const scaleH = offsetHeight / canvasHeight;
    zoomImage(scaleH);
  }, [containerRef, state.canvas, zoomImage]);

  useEffect(() => {
    if (prevState && prevState.imageSource !== imageSource) {
      return;
    }
    setState(
      produce((draft: CanvasState) => {
        draft.isError = false;
      })
    );
    const element = document.getElementById('image__canvas-container');
    if (!element) {
      return;
    }
    element.innerHTML = `<canvas id='image__canvas'></canvas>`;
    initCanvas();

    // eslint-disable-next-line
  }, [imageSource]);

<<<<<<< Updated upstream
  const updateObjectByPolyName = (
    name: string,
    option: any,
    reInitControl?: boolean,
    isChangedDrawType?: boolean
  ) => {
    state.canvas.getObjects().forEach((object: any) => {
      if (object.type !== 'circle' && object.polyName === name) {
        object = Object.assign(object, option);
        if (isChangedDrawType) {
          object.type = 'polyline';
        }
        if (reInitControl) {
          getCurrentDataToSave(object, finishDraw);
          updateControl(object);
        }
      }
    });

    state.canvas.renderAll();
  };

  const removePolyObject = (polyName: string) => {
    const canvas = state.canvas;
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.polyName === polyName) canvas.remove(activeObj);
    canvas.getObjects().forEach((object: any) => {
      if (object.polyName === polyName) {
        canvas.remove(object);
      }
    });
    canvas.renderAll();
  };

  const clearAll = () => {
    const canvas = state.canvas;
    if (!canvas) return;
    canvas.getObjects().forEach((object: any) => {
      canvas.remove(object);
    });
    canvas.renderAll();
  };

=======
>>>>>>> Stashed changes
  useImperativeHandle(ref, () => ({
    getAlert() {},
    createPolyObject: (data: any[]) => {
      setState(
        produce((draft: CanvasState) => {
          draft.dataRectangle = data;
        })
      );
    },
<<<<<<< Updated upstream
    clearAll: clearAll,
    updateObjectByPolyName: updateObjectByPolyName,
    removePolyObject: removePolyObject,
    reCalculateCanvas: reCalculateCanvas,
=======
    updateObjectById: (id: string) => {
      const objects = canvas.getItemsById(id);
    },
    removePolyObject: (polyName: string) => {
      canvas.remove(canvas.getActiveObject());
      canvas.getObjects().forEach((object: any) => {
        if (object.polyName === polyName) canvas.remove(object);
      });
      canvas.renderAll();
    },
>>>>>>> Stashed changes
  }));

  useEffect(() => {
    if (!state.canvas) return;
    removeEvents();
    initDrawPolyLine();
  }, [drawType, state.canvas, removeEvents, initDrawPolyLine]);

  useEffect(() => {
    if (!state.canvas) return;
    state.canvas.setZoom(1);
    if (backgroundType === BackgroundType.Video) {
      initVideosBackground();
    } else {
      initImageBackground();
    }

    // eslint-disable-next-line
  }, [backgroundType, state.canvas]);

  useEffect(() => {
    const canvas = state.canvas;
    const dataRectangle = state.dataRectangle;
    if (!canvas) return;

    if (!Array.isArray(dataRectangle) || !dataRectangle.length) return;

    canvas.getObjects().forEach((object: any) => {
      canvas.remove(object);
    });
    for (const key in dataRectangle) {
      if (Object.prototype.hasOwnProperty.call(dataRectangle, key)) {
        const data = dataRectangle[key].detail;
<<<<<<< Updated upstream

        const option = {
          ...omit(data, ['points']),
=======
        const option = {
          ...omit(data, ['points']),
          polyName: guid(),
>>>>>>> Stashed changes
          id: dataRectangle[key].id,
        };
        switch (data.drawType) {
          case DrawType.LineIn:
          case DrawType.LineOut:
          case DrawType.LineInAndOut:
            createPolyline(canvas, cloneDeep(data.points), option);
            break;
          case DrawType.ZoneFloor:
          case DrawType.ZoneExclusion:
          case DrawType.ZoneMark:
            createPolygon(canvas, cloneDeep(data.points), option);
            break;

          default:
            break;
        }
      }
    }
  }, [state.dataRectangle, state.canvas]);

  useLayoutEffect(() => {
    window.addEventListener('resize', reCalculateCanvas);
    return () => window.removeEventListener('resize', reCalculateCanvas);
  }, [reCalculateCanvas]);

  const updateActiveObject = (object: any) => {
    setState(
      produce((draft: CanvasState) => {
        draft.activeObject = { ...draft.activeObject, ...object };
      })
    );
  };

  return {
    activeObject: state.activeObject,
    updateActiveObject: updateActiveObject,

    containerRef,
    isError: state.isError,
    updateObjectByPolyName,
  };
}

export default useImageCanvasHook;
