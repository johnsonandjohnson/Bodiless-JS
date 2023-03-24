/**
 * Copyright © 2023 Johnson & Johnson
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

import React, { useContext } from 'react';

export interface AccessControlInterface {
  /**
   * client to implement editable logic base on ACL.
   */
  canEdit: (id?: string) => boolean;

  /**
   * Able to switch ACL object.
   */
  setAcl: (acl: AclInterface) => void;
}

export interface AclInterface {
  isAllowed: (id?: string) => boolean;
}

class DefaultAcl implements AclInterface {
  // eslint-disable-next-line class-methods-use-this
  isAllowed(id?: string) {
    return true;
  }
}

export class AccessControl implements AccessControlInterface {
  // acl object holds user, role, resource and permission information,
  // It implements the `isAllowed` interface to check if current user has
  // privilege to access specific resource.
  //
  // Default acl allows accessing to all resources.
  protected acl: AclInterface;

  constructor(acl?: AclInterface) {
    this.acl = acl || new DefaultAcl();
  }

  /**
   * Check if current user can edit the resource represented by
   * given resourceId.
   *
   * @param resourceId string
   * @returns boolean
   */
  canEdit(resourceId?: string) {
    return this.acl.isAllowed(resourceId);
  }

  setAcl(acl: AclInterface) {
    this.acl = acl;
  }
}
const defaultAccessControl = new AccessControl();

export const accessContext = React.createContext<AccessControlInterface>(defaultAccessControl);

export const useAccessContext = () => useContext<AccessControlInterface>(accessContext);
