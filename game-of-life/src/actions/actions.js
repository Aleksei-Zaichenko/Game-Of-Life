export const IS_DISABLED = false;

export function updateState(changeState) {
  console.log(changeState);
  return {
    type: IS_DISABLED,
    payload: changeState,
  };
}
