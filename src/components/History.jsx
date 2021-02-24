const History = ({ history, show, onClose }) => {
  return (
    <>
      {
        <div
          className={`fixed top-0 h-full right-0 max-w-sm bg-gray-700 overflow-y-scroll transform transition-transform duration-500 ${
            show ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="sticky p-3 top-0 float-right outline-none focus:outline-none"
            onClick={onClose}
          >
            X
          </button>
          <div className="px-12 py-8" style={{ minWidth: "370px" }}>
            {history.length === 0 ? (
              <div className="flex items-center">No history available</div>
            ) : null}
            {history.map((h, i) => (
              <div
                key={i}
                className={`flex items-center space-x-4 relative history-item py-3 ${
                  h.status !== 200 ? "background-red" : "background-green"
                } `}
              >
                <div className="">{h.action}</div>
                <div className="text-sm text-gray-400">{h.time}</div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default History;
