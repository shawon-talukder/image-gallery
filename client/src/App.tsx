import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="bg-blue-500/40 h-screen w-screen flex justify-center items-center shadow-sm">
      <div className="w-11/12 md:w-3/4 flex flex-col gap-[2px]">
        <Topbar />
      </div>
    </div>
  );
}

export default App;
