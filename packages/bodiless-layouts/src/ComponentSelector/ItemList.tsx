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

import React, {
  useContext,
  ReactNode,
  useState,
} from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import uiContext from './uiContext';
import { ComponentWithMeta, ItemListProps, ComponentSelectorScale as Scale } from './types';

const ItemList: React.FC<ItemListProps> = props => {
  const { components, onSelect, scale: startScale = Scale.Full } = props;
  const finalUI = useContext(uiContext);
  const [scale, setScale] = useState(startScale);

  // Function to build a default title for a component from its categories.
  const title = (component: ComponentWithMeta) => component.title || component.displayName;

  // Function to build a default description for a component from its categories.
  const description = (component: ComponentWithMeta) => component.description || 'No description';

  const getRowHeight = () => {
    if (components.length <= scale) {
      return 'auto';
    }
    return `${scale * 100}%`;
  };
  const styles = {
    1: {
      transformStyle: {
        height: getRowHeight(),
        maxHeight: '100%',
      },
      boxStyle: {
        width: '100%',
      },
      outerStyle: {
      },
    },
    2: {
      transformStyle: {
        width: '200%',
        height: getRowHeight(),
        transform: 'scale(.5) translate(-50%, -50%)',
      },
      boxStyle: {
        width: '50%',
      },
      outerStyle: {
        fontSize: '200%',
      },
    },
    4: {
      transformStyle: {
        width: '400%',
        height: getRowHeight(),
        transform: 'scale(.25) translate(-150%, -150%)',
      },
      boxStyle: {
        width: '25%',
      },
      outerStyle: {
        fontSize: '400%',
      },
    },
  };
  const { transformStyle, boxStyle, outerStyle } = styles[scale];

  const maxComponents = 25;
  const maxErrorMsg = `This result set includes items which cannot be displayed. Please 
  reduce the result set to less than ${maxComponents} by filtering or searching.`;

  const elems: ReactNode[] = components.slice(0, maxComponents).map(
    (Component: ComponentWithMeta<any>) => (
      <finalUI.ItemBoxWrapper style={boxStyle} key={Component.displayName}>
        <finalUI.ItemBox key={Component.displayName} data-item-id={Component.displayName}>
          <finalUI.TitleWrapper style={outerStyle}>
            {title(Component)}
          </finalUI.TitleWrapper>
          <div
            className="bl-outerTransform bl-relative bl-w-full bl-bg-white"
          >
            <Component />
          </div>
          {description(Component) && (
          <Tooltip
            placement="rightBottom"
            mouseLeaveDelay={0}
            overlayStyle={{
              opacity: 1,
            }}
            overlay={(
              <finalUI.ComponentDescriptionWrapper>
                <h3>{title(Component)}</h3>
                <finalUI.ComponentDescriptionStyle>
                  {description(Component)}
                </finalUI.ComponentDescriptionStyle>
              </finalUI.ComponentDescriptionWrapper>
          )}
          >
            <finalUI.ComponentDescriptionIcon style={outerStyle}>
              info
            </finalUI.ComponentDescriptionIcon>
          </Tooltip>
          )}
          <finalUI.ComponentSelectButton
            type="submit"
            onClick={() => onSelect([Component.displayName])}
          />
        </finalUI.ItemBox>
      </finalUI.ItemBoxWrapper>
    ),
  );
  const MoreItems = () => (
    <finalUI.ItemBoxWrapper style={boxStyle}>
      <finalUI.ItemBox>
        <finalUI.TitleWrapper>
          {maxErrorMsg}
        </finalUI.TitleWrapper>
      </finalUI.ItemBox>
    </finalUI.ItemBoxWrapper>
  );
  const isActive = (currentScale:Scale) => (
    currentScale === scale ? 'bl-bg-primary bl-text-white' : ''
  );
  return (
    <finalUI.GridListBox>
      <finalUI.ScalingHeader>
        <finalUI.ScalingButtonFull
          className={isActive(Scale.Full)}
          onClick={() => setScale(Scale.Full)}
        />
        <finalUI.ScalingButtonHalf
          className={isActive(Scale.Half)}
          onClick={() => setScale(Scale.Half)}
        />
        <finalUI.ScalingButtonQuarter
          className={isActive(Scale.Quarter)}
          onClick={() => setScale(Scale.Quarter)}
        />
      </finalUI.ScalingHeader>
      <finalUI.GridListBoxWrapper>
        <finalUI.GridListBoxInner style={transformStyle} id="gridlistboxinner">
          {elems}
          {
            components.length > maxComponents && <MoreItems />
          }
        </finalUI.GridListBoxInner>
      </finalUI.GridListBoxWrapper>
    </finalUI.GridListBox>
  );
};

export default ItemList;
