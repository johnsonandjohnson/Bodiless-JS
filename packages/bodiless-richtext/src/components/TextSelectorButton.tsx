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

import React, { useState } from 'react';
import RCTooltip from 'rc-tooltip';
import MaterialIcon from '@material/react-material-icon';
import { useUI, getUI } from '../RichTextContext';

type ButtonProps = {
  className: string
};

const NodeSelectorButton = (props: ButtonProps) => {
  const { Button } = getUI(useUI());

  return (
    <Button {...props}>
      <MaterialIcon className="bl-material-icons" icon="more_horiz" />
    </Button>
  );
};

NodeSelectorButton.displayName = 'NodeSelectorButton';

type props = {
  children: React.ReactNode,
};

const TextSelectorButton = ({
  children,
}:props) => {
  const [visible, setVisible] = useState(false);
  const { Overlay, TextSelectorWrapper } = getUI(useUI());
  const nodeSelectorProps = {
    className: visible ? 'bl-active node-selector-button' : '',
  };

  return (
    <RCTooltip
      trigger={['hover']}
      placement="topLeft"
      overlayStyle={{ opacity: 1 }}
      visible={visible}
      align={{
        offset: [-40, -10],
      }}
      onVisibleChange={() => { setVisible(!visible); }}
      overlay={() => (
        <Overlay>
          <TextSelectorWrapper
            onClick={(ev) => {
              const target = ev.target as HTMLElement;
              const currentTarget = ev.currentTarget as HTMLElement;
              if (currentTarget !== target && currentTarget.contains(target)) {
                const buttons = document.getElementsByClassName('node-selector-button');
                if (buttons.length) {
                  const button = buttons[0] as HTMLElement;
                  button.focus();
                }
                setVisible(!visible);
              }
            }}
          >
            { children }
          </TextSelectorWrapper>
        </Overlay>
      )}
    >
      <NodeSelectorButton {...nodeSelectorProps} />
    </RCTooltip>
  );
};

TextSelectorButton.displayName = 'TextSelectorButton';

export default TextSelectorButton;
