import { RobotStates } from "../consts";

const RobotStateLabel = ({ state }) => {
  let backgroundColor = "";

  switch (state) {
    case RobotStates.PICKING:
      backgroundColor = "bg-blue-400";
      break;
    case RobotStates.PLACING:
      backgroundColor = "bg-blue-400";
      break;
    case RobotStates.FAILED:
      backgroundColor = "bg-red-400";
      break;
    case RobotStates.REPAIRING:
      backgroundColor = "bg-yellow-400";
      break;
    case RobotStates.IDLE:
    default:
      backgroundColor = "bg-green-400";
      break;
  }

  return (
    <div
      className={`inline-block py-1 px-4 rounded font-semibold text-black ${backgroundColor}`}
    >
      {state}
    </div>
  );
};

export default RobotStateLabel;
