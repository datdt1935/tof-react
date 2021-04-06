import React from 'react';

import SensorConfiguration from './sensor-configuration/sensor-configuration.container';

interface SensorDetailProps {}

const SensorDetail: React.FC<SensorDetailProps> = (
  props: SensorDetailProps
) => {
  return <SensorConfiguration></SensorConfiguration>;
};

export default SensorDetail;
