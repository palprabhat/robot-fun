import Button from "./Button";

const Navbar = ({ onShowHistory }) => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 shadow-sm border-b border-gray-800">
      <div className="text-xl font-bold">Robot Fun</div>

      <div className="flex justify-between items-center">
        <Button onClick={onShowHistory}>History</Button>
      </div>
    </nav>
  );
};

export default Navbar;
