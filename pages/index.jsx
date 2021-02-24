import { useEffect, useState } from "react";
import { Actions, RobotStates } from "../src/consts";
import { getAvailableActions } from "../src/utils";
import Modal from "../src/components/Modal";
import History from "../src/components/History";
import RobotStateLabel from "../src/components/RobotStateLabel";
import Button from "../src/components/Button";
import Navbar from "../src/components/Navbar";

const API_URL = "http://localhost:5000";

export default function Home() {
  const [currentState, setCurrentState] = useState("");
  const [availableActions, setAvailableActions] = useState([]);
  const [failed, setFailed] = useState(0);
  const [history, setHistory] = useState([]);
  const [performingAction, setPerformingAction] = useState(false);
  const [showRepairModal, setShowRepairModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const updateRobotState = (state, action, status) => {
    setCurrentState(state);

    const availableActions = getAvailableActions(state);
    setAvailableActions(availableActions);

    if (action) {
      setHistory((prev) => [
        {
          time: new Date(Date.now()).toLocaleString("en-US"),
          action: action.toUpperCase(),
          status,
        },
        ...prev,
      ]);
    }
  };

  // Fetch initial state of Robot when page loads.
  useEffect(() => {
    const getState = async () => {
      const response = await fetch(`${API_URL}/state`);
      const data = await response.text();

      updateRobotState(data);
    };

    getState();
  }, []);

  useEffect(() => {
    if (failed >= 3) {
      setShowRepairModal(true);
    } else if (failed != 0) {
      setShowFailedModal(true);
    }
  }, [failed]);

  const performAction = async (action, retries = 3) => {
    setPerformingAction(true);

    try {
      const response = await fetch(`${API_URL}/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (response.status === 200) {
        const data = await response.json();
        updateRobotState(data.state, action, response.status);

        if (action === Actions.REPAIR) {
          setFailed(0);
        }
      } else if (response.status === 503 && retries > 1) {
        performAction(action, retries - 1);
      } else {
        setFailed((prev) => prev + 1);
        updateRobotState(RobotStates.FAILED, action, response.status);
      }
    } catch (err) {
      setFailed((prev) => prev + 1);
      updateRobotState(RobotStates.FAILED, action, 500);
    } finally {
      setPerformingAction(false);
    }
  };

  return (
    <>
      <Navbar onShowHistory={() => setShowHistory(true)} />

      <main className="flex flex-col justify-center items-center p-8">
        <div
          className="relative bg-gray-800 rounded-md py-8 px-12"
          style={{ minWidth: "320px" }}
        >
          {performingAction ? (
            <div className="absolute right-2 top-2">
              <div className="loader animate-spin-fast duration-100" />
            </div>
          ) : null}

          <div className="flex flex-col justify-center items-center space-y-8">
            <div className="flex items-center justify-between space-x-4">
              <div>Current State of the Robot:</div>
              <RobotStateLabel state={currentState} />
            </div>
            <div className="flex space-x-8">
              {availableActions.map((action) => (
                <Button
                  key={action}
                  onClick={() => performAction(action)}
                  disabled={performingAction}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <History
        history={history}
        show={showHistory}
        onClose={() => setShowHistory(false)}
      />

      {/* Show this Modal when Robot returns Failed state */}
      <Modal
        id="modal-failed"
        isOpen={showFailedModal}
        onClose={() => setShowFailedModal(false)}
      >
        <div className="flex flex-col space-y-6 max-w-xs">
          <div>The robot has failed unexpectedly!</div>
          <div className="flex justify-center items-center px-6">
            <Button onClick={() => setShowFailedModal(false)}>Ok</Button>
          </div>
        </div>
      </Modal>

      {/* Show this Modal when Robot has failed 3 times */}
      <Modal
        id="modal-repair"
        isOpen={showRepairModal}
        onClose={() => setShowRepairModal(false)}
      >
        <button
          className="absolute m-3 top-0 right-0 outline-none focus:outline-none"
          onClick={() => setShowRepairModal(false)}
        >
          X
        </button>
        <div className="flex flex-col space-y-6 max-w-xs">
          <div>
            The robot has failed multiple times do you want to repair it?
          </div>
          <div className="flex justify-between items-center px-6">
            <Button onClick={() => setShowRepairModal(false)}>Cancel</Button>
            <Button
              onClick={() => {
                performAction(Actions.REPAIR);
                setShowRepairModal(false);
              }}
              disabled={performingAction}
            >
              {Actions.REPAIR}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
