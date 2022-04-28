export const pushDataAnalytics = (data: any, type: string) => {
  if (typeof window !== 'undefined') {
    // @ts-ignore undefined datalayer object since it is created on building time.
    window.dataLayer = window.dataLayer || [];

    // @TODO replace event_data with data.event
    // @ts-ignore undefined datalayer object since it is created on building time.
    dataLayer.push({ type: null });
    // @ts-ignore undefined datalayer object since it is created on building time.
    dataLayer.push(data);
  }
};
