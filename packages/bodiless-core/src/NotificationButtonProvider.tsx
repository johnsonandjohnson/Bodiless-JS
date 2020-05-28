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

import React, { FC } from 'react';
import contextMenuForm from './contextMenuForm';
import PageContextProvider from './PageContextProvider';
import { useNotifications } from './NotificationProvider';
import { getUI } from './components';

const NotificationItem = (props : any) => {
  const { notification } = props;
  return (
    <>
      <p className="bl-py-grid-1 bl-px-grid-1 bl-max-w-xl-grid-1" key={notification.id}>{notification.message}</p>
      <hr />
    </>
  );
};

const NotificationList = () => {
  const { notifications } = useNotifications();
  if (notifications.length === 0) return (<p>There are no alerts.</p>);
  return (
    <div className="bl-flex-grow">{notifications.map(n => (<NotificationItem notification={n} />))}</div>
  );
};

const Form = contextMenuForm({})(({ ui }) => {
  const { ComponentFormTitle } = getUI(ui);
  return (
    <>
      <ComponentFormTitle>Alerts</ComponentFormTitle>
      <NotificationList />
    </>
  );
});

/**
 * Provide a component to display notifications.
 *
 * @param children
 * @constructor
 */
const NotificationButtonProvider: FC = ({ children }) => {
  const { notifications } = useNotifications();
  const getMenuOptions = () => [{
    name: 'Notifications',
    label: 'Alerts',
    icon: notifications.length > 0 ? 'notification_important' : 'notifications',
    isActive: () => notifications.length > 0,
    handler: () => Form,
  }];
  return (
    <PageContextProvider getMenuOptions={getMenuOptions}>
      {children}
    </PageContextProvider>
  );
};

export default NotificationButtonProvider;
