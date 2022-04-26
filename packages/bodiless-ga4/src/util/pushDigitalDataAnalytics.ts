export const pushDigitalDataAnalytics = (data: any) => {
  if (typeof window !== 'undefined') {
    // @ts-ignore undefined datalayer object since it is created on building time.
    window.digitalData = window.digitalData || [];
    // @ts-ignore undefined datalayer object since it is created on building time.
    digitalData.push(data);
  }
};
