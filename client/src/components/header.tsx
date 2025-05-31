import { Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-red-600">StreamHub</h1>
            <span className="text-gray-text text-sm">Premium Entertainment</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-red-600 transition-colors duration-200">Home</a>
            <a href="#" className="text-gray-text hover:text-white transition-colors duration-200">Movies</a>
            <a href="#" className="text-gray-text hover:text-white transition-colors duration-200">TV Shows</a>
            <a href="#" className="text-gray-text hover:text-white transition-colors duration-200">My List</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-text hover:text-white transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
