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
import { useUI } from '../RichTextContext';

type ButtonProps = {
  onMouseDown(e: React.MouseEvent): void;
};

const NodeSelectorButton = (props: ButtonProps) => {
  const { Button } = useUI();

  return (
    // error TS2604: JSX element type 'Button' does not have any construct or call signatures.
    // @ts-ignore
    <Button {...props}>
      <MaterialIcon className="bl-material-icons" icon="more_horiz" />
    </Button>
  );
};

NodeSelectorButton.displayName = 'NodeSelectorButton';

const CloseBtn = (props: JSX.IntrinsicElements['span']) => {
  const { CloseButton } = useUI();

  return (
    // error TS2604: JSX element type 'CloseButton' does not have any construct or call signatures.
    // @ts-ignore
    <CloseButton {...props}>
      <MaterialIcon icon="cancel" />
    </CloseButton>
  );
};

type props = {
  children: React.ReactNode,
};

export const TextSelectorContext = React.createContext({ onClose: () => {} });

const TextSelectorButton = ({
  children,
}:props) => {
  const [visible, setVisible] = useState(false);
  const { Overlay, TextSelectorWrapper } = useUI();
  const textSelectorContextValue = { onClose: () => setVisible(false) };

  return (
    <RCTooltip
      visible={visible}
      placement="topLeft"
      overlayStyle={{ opacity: 1 }}
      align={{
        offset: [-40, -10],
      }}
      overlay={() => (

        // error TS2604: JSX element type 'Overlay' does not have any construct or call signatures.
        // @ts-ignore
        <Overlay>
          <TextSelectorContext.Provider value={textSelectorContextValue}>
            <CloseBtn onMouseDown={() => setVisible(false)} />
            <TextSelectorWrapper>
              { children }
            </TextSelectorWrapper>
          </TextSelectorContext.Provider>
        </Overlay>
      )}
    >
      <NodeSelectorButton
        onMouseDown={() => {
          setVisible(true);
        }}
      />
    </RCTooltip>
  );
};

TextSelectorButton.displayName = 'TextSelectorButton';

export default TextSelectorButton;
