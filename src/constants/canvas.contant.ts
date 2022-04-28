import { DrawType } from './recognition-properties.constant';

export const optionCanvas: Object = {
  hoverCursor: 'pointer',
  selection: false,
  backgroundColor: 'transparent',
  stopContextMenu: true,
  targetFindTolerance: 12,
};

export interface ObjectPropertiesState {
  strokeColor: string;
  fillColor: string;
  drawType: DrawType;
}

export const initialObjectPropertiesState: ObjectPropertiesState = {
  drawType: DrawType.LineIn,
  strokeColor: 'transparent',
  fillColor: 'transparent',
};

export interface CanvasState {
  canvas: any;
  isError: boolean;
  containerWidth: number;
  containerHeight: number;
  dataRectangle: any[];
  activeObject: any;
}

export const initialCanvasState = {
  canvas: null,
  isError: false,
  containerWidth: 0,
  containerHeight: 0,
  dataRectangle: [],
  activeObject: null,
};
