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
import { ContextMenuForm } from './contextMenuForm';
import { withMenuOptions } from './PageContextProvider';
import { useNotifications } from './NotificationProvider';
import { useMenuOptionUI } from './components/ContextMenuContext';
import type { ContextMenuFormProps } from './Types/ContextMenuTypes';

const NotificationList = () => {
  const { ComponentFormList, ComponentFormListItem } = useMenuOptionUI();
  const { notifications } = useNotifications();
  if (notifications.length === 0) return (<p>There are no alerts.</p>);
  return (
    <ComponentFormList>
      {notifications.map(n => (
        <ComponentFormListItem key={n.id}>
          {n.message}
        </ComponentFormListItem>
      ))}
    </ComponentFormList>
  );
};

const RenderForm = (props: ContextMenuFormProps) => {
  const { ComponentFormTitle } = useMenuOptionUI();
  return (
    <ContextMenuForm {...props} hasSubmit={false}>
      <ComponentFormTitle>Alerts</ComponentFormTitle>
      <NotificationList />
    </ContextMenuForm>
  );
};
// Work around "change in the order of Hooks" issue.
const renderForm = (props: ContextMenuFormProps) => <RenderForm {...props} />;

/**
 * @private
 *
 * Hook to return the notification button.
 */
const useMenuOptions = () => {
  const { notifications } = useNotifications();
  const menuOptions = [{
    name: 'Notifications',
    label: 'Alerts',
    icon: notifications.length > 0 ? 'notification_important' : 'notifications',
    isActive: notifications.length > 0,
    handler: () => renderForm,
  }];
  return menuOptions;
};

/**
 * HOC to add a notification button to the current context.
 */
const withNotificationButton = withMenuOptions({
  name: 'Notifications',
  useMenuOptions,
  root: true,
});

export default withNotificationButton;
