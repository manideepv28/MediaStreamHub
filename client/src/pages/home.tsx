import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { MediaGrid } from "@/components/media-grid";
import { VideoPlayer } from "@/components/video-player";
import type { Media } from "@shared/schema";

export default function Home() {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const { data: allMedia = [], isLoading: isLoadingMedia } = useQuery<Media[]>({
    queryKey: ['/api/media'],
  });

  const { data: featuredMedia } = useQuery<Media>({
    queryKey: ['/api/media/featured'],
  });

  const handleMediaClick = (media: Media) => {
    setSelectedMedia(media);
    setIsPlayerOpen(true);
  };

  const handlePlayerClose = () => {
    setIsPlayerOpen(false);
    setSelectedMedia(null);
  };

  const categories = [
    { name: "Movies", gradient: "from-red-600 to-red-800" },
    { name: "TV Shows", gradient: "from-blue-600 to-blue-800" },
    { name: "Documentaries", gradient: "from-green-600 to-green-800" },
    { name: "Music", gradient: "from-purple-600 to-purple-800" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <HeroSection 
        featuredMedia={featuredMedia || null} 
        onPlayClick={handleMediaClick}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">Trending Now</h3>
            <button className="text-red-600 hover:text-red-400 font-medium transition-colors duration-200">
              View All
            </button>
          </div>
          
          {isLoadingMedia ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-800 rounded-lg h-32 md:h-40 lg:h-48 mb-3"></div>
                  <div className="bg-gray-800 rounded h-4 mb-2"></div>
                  <div className="bg-gray-800 rounded h-3 w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <MediaGrid media={allMedia} onMediaClick={handleMediaClick} />
          )}
        </section>
        
        {/* Categories Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-8">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div 
                key={category.name}
                className={`category-card bg-gradient-to-br ${category.gradient} rounded-lg p-6 h-32 flex items-end cursor-pointer hover:scale-105 transition-transform duration-300`}
              >
                <h4 className="text-white font-semibold">{category.name}</h4>
              </div>
            ))}
          </div>
        </section>
      </main>

      <VideoPlayer 
        media={selectedMedia}
        isOpen={isPlayerOpen}
        onClose={handlePlayerClose}
      />
    </div>
  );
}
