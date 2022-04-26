export const pushDataAnalytics = (data: any) => {
  if (typeof window !== 'undefined') {
    // @ts-ignore undefined datalayer object since it is created on building time.
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore undefined datalayer object since it is created on building time.
    dataLayer.push({ event_data: null });
    // @ts-ignore undefined datalayer object since it is created on building time.
    dataLayer.push(data);
  }
};
