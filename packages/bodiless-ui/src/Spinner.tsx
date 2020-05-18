/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC } from 'react';
import './Spinner.css';

const BarsCount = 12;
const MaxDegrees = 360;

interface SpipperProps {
  color: string,
}

export const Spinner: FC<SpipperProps> = (props: any) => {
  const bars: any = [];
  for (let i = 0; i < BarsCount; i += 1) {
    const barStyle: any = {};
    barStyle.WebkitAnimationDelay = `${(i - BarsCount) / 10} s`;
    barStyle.animationDelay = barStyle.WebkitAnimationDelay;
    barStyle.transform = `rotate(${(i * (MaxDegrees / BarsCount))}deg) translate(146%)`;
    barStyle.WebkitTransform = barStyle.transform;
    bars.push(
      <div style={barStyle} className={`${props.color || ''} bodiless-spinner_bar`} key={i} />,
    );
  }
  return (
    <div className="bodiless-spinner">
      {bars}
    </div>
  );
};

export const ComponentFormSpinner = () => (
  <div className="bl-pt-3">
    <Spinner color="bl-bg-white" />
  </div>
);

export default Spinner;
