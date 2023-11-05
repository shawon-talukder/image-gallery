const Topbar = () => {
  // handlers
  const handleClick = () => {
    console.log("I will delete");
  };
  return (
    <div className="bg-white rounded-t px-8 md:px-12 py-4 md:py-6 flex justify-between items-center mt-4">
      <div className="font-semibold text-base md:text-lg">1 items selected</div>
      <button
        disabled={false}
        className="text-rose-500 cursor-pointer font-semibold transition hover:opacity-80 disabled:cursor-not-allowed"
        onClick={handleClick}
      >
        Delete files
      </button>
    </div>
  );
};

export default Topbar;
