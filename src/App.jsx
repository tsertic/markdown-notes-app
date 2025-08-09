import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Navbar />{" "}
      <main className="container mx-auto p-4">
        <h1 className="text-2xl text-gray-800 dark:text-white">
          Welcome to Notes App
        </h1>
      </main>
    </div>
  );
};

export default App;
