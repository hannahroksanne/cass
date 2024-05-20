export const createTimer = () => {
  const start = () => {
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      return duration;
    };
  };

  return { start };
};
