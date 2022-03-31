import { ListComponents } from '@bodiless/components';
import { ComponentOrTag } from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';

export type SubMenuComponents = {
  OuterWrapper: ComponentOrTag<any>,
  SubmenuIndicator: ComponentOrTag<any>,
} & ListComponents;

export type SubMenuWrapperComponents = {
  SubmenuWrapper: ComponentOrTag<any>,
};

export const asSubMenuToken = asCxTokenSpec<SubMenuComponents>();
export const asSubMenuWrapperToken = asCxTokenSpec<SubMenuWrapperComponents>();
