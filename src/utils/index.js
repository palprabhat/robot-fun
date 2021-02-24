import { Actions, RobotStates } from "../consts";

export const getAvailableActions = (state) => {
  switch (state) {
    case RobotStates.IDLE:
      return [Actions.START, Actions.REPAIR];
    case RobotStates.PICKING:
      return [Actions.PLACE, Actions.REPAIR];
    case RobotStates.PLACING:
      return [Actions.RESET, Actions.REPAIR];
    case RobotStates.REPAIRING:
      return [Actions.RESET];
    case RobotStates.FAILED:
      return [Actions.RESET, Actions.REPAIR];
    default:
      return [];
  }
};
