export const onAttributeMutation = (
  mutationsList: MutationRecord[],
  callback: (mutation: MutationRecord) => void
) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      callback(mutation);
    }
  });
};
