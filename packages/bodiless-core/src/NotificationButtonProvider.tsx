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

import React, { FC, useCallback } from 'react';
import { ContextMenuForm } from './contextMenuForm';
import PageContextProvider from './PageContextProvider';
import { useNotifications } from './NotificationProvider';
import { useUI as useFormUI } from './components/ContextMenuItem';
import type { FormProps as ContextMenuFormProps } from './contextMenuForm';

const NotificationList = () => {
  const { ComponentFormList, ComponentFormListItem } = useFormUI();
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
  const { ComponentFormTitle } = useFormUI();
  return (
    <ContextMenuForm {...props}>
      <ComponentFormTitle>Alerts</ComponentFormTitle>
      <NotificationList />
    </ContextMenuForm>
  );
};
// Work around "change in the order of Hooks" issue.
const renderForm = (props: ContextMenuFormProps) => <RenderForm {...props} />;

/**
 * Provide a component to display notifications.
 *
 * @param children
 * @constructor
 */
const NotificationButtonProvider: FC = ({ children }) => {
  const { notifications } = useNotifications();

  const getMenuOptions = useCallback(() => [{
    name: 'Notifications',
    label: 'Alerts',
    icon: notifications.length > 0 ? 'notification_important' : 'notifications',
    isActive: () => notifications.length > 0,
    handler: () => renderForm,
  }], [notifications]);
  return (
    <PageContextProvider getMenuOptions={getMenuOptions}>
      {children}
    </PageContextProvider>
  );
};

export default NotificationButtonProvider;
