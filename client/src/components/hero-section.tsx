import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Media } from "@shared/schema";

interface HeroSectionProps {
  featuredMedia: Media | null;
  onPlayClick: (media: Media) => void;
}

export function HeroSection({ featuredMedia, onPlayClick }: HeroSectionProps) {
  if (!featuredMedia) {
    return (
      <section className="relative h-96 lg:h-[500px] overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading featured content...</div>
      </section>
    );
  }

  return (
    <section className="relative h-96 lg:h-[500px] overflow-hidden">
      <img 
        src={featuredMedia.thumbnailUrl} 
        alt={featuredMedia.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">{featuredMedia.title}</h2>
            <p className="text-lg text-gray-300 mb-6">{featuredMedia.description}</p>
            <div className="flex space-x-4">
              <Button 
                onClick={() => onPlayClick(featuredMedia)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                <span>Play Now</span>
              </Button>
              <Button 
                variant="secondary"
                className="bg-gray-700/80 hover:bg-gray-600/80 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
