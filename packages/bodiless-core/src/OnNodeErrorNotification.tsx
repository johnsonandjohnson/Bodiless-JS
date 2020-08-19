/**
 * Copyright © 2020 Johnson & Johnson
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

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNotify } from './NotificationProvider';
import { useNode } from './NodeProvider';

const NODE_ERROR_NOTIFICATION_ID = 'STORE_ERROR_NOTIFICATION_ID';

const OnNodeErrorNotification = observer(() => {
  const { node } = useNode();
  const { hasError } = node;
  const notifications = hasError() ? [{
    id: NODE_ERROR_NOTIFICATION_ID,
    message: 'There is an error with saving data',
  }] : [];
  useNotify(notifications);
  return <></>;
});

export default OnNodeErrorNotification;
