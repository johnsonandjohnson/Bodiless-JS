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
  useEffect,
  ReactNode,
  useState,
  Fragment,
} from 'react';
import Tooltip from 'rc-tooltip';
import { DefaultContentNode } from '@bodiless/core';
import 'rc-tooltip/assets/bootstrap.css';
import uiContext from './uiContext';
import { ComponentWithMeta, ItemListProps } from './types';

enum Scale {
  Full = 1,
  Half = 2,
  Quarter = 4
}
const ItemList: React.FC<ItemListProps> = props => {
  const { components, onSelect } = props;
  const finalUI = useContext(uiContext);
  const [scale, setScale] = useState(Scale.Full);
  const styles = {
    1: {
      transformStyle: {
      },
      boxStyle: {
        width: '100%',
      },
    },
    2: {
      transformStyle: {
        width: '200%',
        transform: 'scale(.5) translate(-50%, -50%)',
      },
      boxStyle: {
        width: '50%',
      },
    },
    4: {
      transformStyle: {
        width: '400%',
        transform: 'scale(.25) translate(-150%, -150%)',
      },
      boxStyle: {
        width: '25%',
      },
    },
  };
  const { transformStyle, boxStyle } = styles[scale];

  useEffect(() => {
    // Imitate nextTick() functionality to make sure components are fully mounted.
    setTimeout(() => {
      // We are in useEffect so we know document exists
      // eslint-disable-next-line no-undef
      document.querySelectorAll('.bl-outerTransform').forEach(element => {
        // we have to cast this so that we can use style and offsetHeight
        const htmlElement = element as HTMLElement;
        htmlElement.style.height = '100%';
        htmlElement.style.height = `${htmlElement.offsetHeight / scale}px`;
      });
    });
  });
  const elems: ReactNode[] = components.slice(0, 50).map(
    (Component: ComponentWithMeta<any>, index: number) => (
      <finalUI.ItemBoxWrapper style={boxStyle} key={Component.displayName}>
        <finalUI.ItemBox key={Component.displayName}>
          <finalUI.TitleWrapper>
            {Component.title || Component.displayName || 'Untitled'}
          </finalUI.TitleWrapper>
          <div className="bl-outerTransform bl-w-full bl-bg-white">
            <div
              style={transformStyle}
            >
              <Component
                node={DefaultContentNode.dummy(String(index), [])}
              />
            </div>
          </div>
          <Tooltip
            placement="rightBottom"
            mouseLeaveDelay={0}
            overlayStyle={{
              opacity: 1,
            }}
            overlay={(
              <finalUI.ComponentDescriptionWrapper>
                <h3>{Component.title}</h3>
                <finalUI.ComponentDescriptionStyle>
                  <p>{Component.description}</p>
                </finalUI.ComponentDescriptionStyle>
              </finalUI.ComponentDescriptionWrapper>
          )}
          >
            <finalUI.ComponentDescriptionIcon>
              info
            </finalUI.ComponentDescriptionIcon>
          </Tooltip>
          <finalUI.ComponentSelectButton
            type="submit"
            onClick={event => onSelect(event, Component.displayName)}
          />
        </finalUI.ItemBox>
      </finalUI.ItemBoxWrapper>
    ),
  );
  const MoreItems = () => (
    <finalUI.ItemBoxWrapper style={boxStyle}>
      <finalUI.ItemBox>
        <finalUI.TitleWrapper>
          There are more then 50 items use filter to lower the number of items
        </finalUI.TitleWrapper>
      </finalUI.ItemBox>
    </finalUI.ItemBoxWrapper>
  );
  const isActive = (currentScale:Scale) => (currentScale === scale ? 'bl-bg-primary bl-text-white' : '');
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
      <finalUI.GridListBoxInner>
        {elems}
        {
          components.length > 50
            ? <MoreItems />
            : Fragment
        }
      </finalUI.GridListBoxInner>
    </finalUI.GridListBox>
  );
};

export default ItemList;
