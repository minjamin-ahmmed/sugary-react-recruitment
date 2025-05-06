import { LogIn } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen flex flex-col bg-white text-zinc-950">
      <header className="w-11/12 lg:w-7/12 mx-auto border border-zinc-200 rounded-full px-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Sugary</h3>
          <Link to={"/login"}>
            {" "}
            <button className="bg-zinc-950 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-zinc-800 transition-all duration-200 ease-in-out transform hover:scale-95 active:scale-90 cursor-pointer">
              <span className="">Login</span>
              <LogIn size={20} className="text-white" />
            </button>
          </Link>
        </div>
      </header>

      <section className="flex-grow flex flex-col items-center justify-center text-center px-6 py-12 lg:py-32">
        <h1 className="text-4xl lg:text-6xl font-semibold mb-4">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-shine-gradient bg-500-auto animate-text-shine">
            Sugary
          </span>{" "}
          React
        </h1>

        <p className="text-zinc-600 mb-8 max-w-xl">
          A recruitment task implementation showcasing authentication,
          dashboard, and lazy loading.
        </p>

        <button className="bg-zinc-950 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-zinc-800 transition-all duration-200 ease-in-out transform hover:scale-95 active:scale-90 cursor-pointer">
          Get Started
        </button>
      </section>

      <footer className="border-t border-zinc-200 py-6 text-center">
        <p className="text-zinc-600 text-sm">
          &copy; {currentYear} Minjamin Ahmmed Sheefat. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Home;
