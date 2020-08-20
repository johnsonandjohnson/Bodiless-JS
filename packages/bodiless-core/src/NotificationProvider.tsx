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

import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { v1 } from 'uuid';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react-lite';

type Notification = {
  id: string,
  message: string,
};

type NotificationProviderItem = Notification & {
  owner: string,
};

type Notifier = (owner: string, notifications: Notification[]) => void;

type NotificationsContextType = {
  notifications: Notification[],
  hasNotifications: () => boolean,
};
type NotifyContextType = {
  notify: Notifier,
};

const NotificationContext = React.createContext<NotificationsContextType>({
  notifications: [],
  hasNotifications: () => false,
});

const useNotifications = () => useContext(NotificationContext);

const NotifyContext = React.createContext<NotifyContextType>({
  notify: () => undefined,
});

class NotificationStore {
  @observable private notificationsMap = new Map<string, NotificationProviderItem[]>();

  @computed get hasNotifications() {
    return this.notifications.length > 0;
  }

  @computed get notifications() {
    return Array.prototype.concat.apply([], Array.from(this.notificationsMap.values()));
  }

  @action setNotifications(owner: string, notifications: NotificationProviderItem[]) {
    this.notificationsMap.set(owner, notifications);
  }
}

const notificationStore = new NotificationStore();

/**
 * A component used to provide notifications.
 *
 * @param children
 * @constructor
 */
const NotificationProvider: FC = observer(({ children }) => {
  // eslint-disable-next-line max-len
  const notify = (owner: string, newNotifications: Notification[]) => notificationStore.setNotifications(
    owner,
    newNotifications.map(n => ({ ...n, owner })),
  );
  // We memoize the notifier context value to prevent unnecessary re-renders
  // of subscribers to only this context.
  const notifyContextValue = useMemo(() => ({ notify }), [notificationStore.setNotifications]);

  return (
    <NotificationContext.Provider value={{
      notifications: notificationStore.notifications,
      hasNotifications: () => notificationStore.hasNotifications,
    }}
    >
      <NotifyContext.Provider value={notifyContextValue}>
        {children}
      </NotifyContext.Provider>
    </NotificationContext.Provider>
  );
});

/**
 * The useNotify() hook allows you to register notifications which should be
 * displayed to the user upon clicking the "Notifications" button on the main
 * menu.
 *
 * Note that you are responsible for maintaining and persisting the notifications
 * you want to display. Every time your component re-renders, all the notifications
 * it owns will be regenerated from the list provided to this hook.
 *
 * @param notifications An array of Notification objects which should be displayed.
 */
const useNotify = (notifications: Notification[]) => {
  const owner = useRef(v1()).current;
  const { notify } = useContext(NotifyContext);
  useEffect(
    () => {
      notify(owner, notifications || []);
      return () => notify(owner, []);
    },
    [notify, owner, notifications],
  );
};

export {
  NotificationProvider,
  NotificationProviderItem,
  useNotify,
  useNotifications,
};
