import flowRight from 'lodash/flowRight';
import { ComponentType } from 'react';
import { HOC } from '@bodiless/fclasses';
import {
  asBodilessHelmet,
  withMetaForm,
} from '@bodiless/components';
import { withDataLayerScript } from '../gtm';

// Define the menu item that shows when the site is in edit mode.
const useMenuOptions = () => [
  {
    name: 'gtm',
    icon: 'local_offer',
    label: 'GA4',
    group: 'page-group',
  },
];

// Define the form Title and description.
const gtmFormHeader = {
  title: 'Google Analtyics Data Layer',
  description: 'Enter the data that will be used in the Google Analytics GA4 Data Layer.',
};

/*
 * Render the script when gtm enabled.
 */
export const renderDataLayerScript = (Component : ComponentType) => {
  const attributes = { 'data-cfasync': 'false' };
  return withDataLayerScript(Component, true, attributes);
};

/**
*
 * Utility hoc to add a reusable global GA4/DataLayer data to a helmet
 * component.
 *
 * @param hocs array
 *   An array of HOCs to act on the helmet component before it renders.
 *
 * @return An HOC which will add the the DataLayer properties.
 */
export const withGlobalGA4 = (...hocs: HOC[]) => flowRight(
  asBodilessHelmet('datalayer'),
  ...hocs,
  renderDataLayerScript,
);

/**
*
 * Utility hoc to add a reusable global GA4/DataLayer form and data to a helmet
 * component.
 *
 * @param hocs array
 *   An array of HOCs to act on the helmet component before it renders.
 *
 * @return An HOC which will add the the DataLayer properties.
 */
export const withGlobalGA4Form = (...hocs: HOC[]) => flowRight(
  withMetaForm(useMenuOptions, gtmFormHeader),
  withGlobalGA4(...hocs),
);

export * from './pushDigitalDataAnalytics';
export * from './pushSearchAnalytics';
