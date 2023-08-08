/**
 * Copyright © 2022 Johnson & Johnson
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
import { stylable } from '@bodiless/fclasses';

const Cart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="27.27"
    height="25"
    viewBox="0 0 27.27 25"
    {...props}
  >
    <g id="CART_ICON" data-name="CART ICON" transform="translate(1 1)">
      <path id="Path_5710" data-name="Path 5710" d="M-2020.75,2766.846h4.712l3.426,15.993h14.314l2.818-11h-19.487" transform="translate(2020.75 -2766.846)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <circle id="Ellipse_1822" data-name="Ellipse 1822" cx="2.404" cy="2.404" r="2.404" transform="translate(8.019 19.192)" fill="#fff" />
      <circle id="Ellipse_1823" data-name="Ellipse 1823" cx="2.404" cy="2.404" r="2.404" transform="translate(17.657 19.192)" fill="#fff" />
    </g>
  </svg>
);

const CartIcon = stylable(Cart);

export {
  CartIcon,
};
