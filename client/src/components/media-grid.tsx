import { Play } from "lucide-react";
import type { Media } from "@shared/schema";

interface MediaGridProps {
  media: Media[];
  onMediaClick: (media: Media) => void;
}

export function MediaGrid({ media, onMediaClick }: MediaGridProps) {
  const getRatingColor = (rating?: string) => {
    switch (rating) {
      case "4K": return "bg-red-600";
      case "HD": return "bg-yellow-500 text-black";
      case "NEW": return "bg-purple-600";
      case "18+": return "bg-red-600";
      case "PG": return "bg-blue-600";
      case "TRENDING": return "bg-orange-600";
      case "LIVE": return "bg-pink-600";
      default: return "bg-green-600";
    }
  };

  if (media.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No media content available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {media.map((item) => (
        <div 
          key={item.id}
          className="media-item group cursor-pointer animate-fade-in" 
          onClick={() => onMediaClick(item)}
        >
          <div className="relative overflow-hidden rounded-lg bg-card">
            <img 
              src={item.thumbnailUrl} 
              alt={item.title}
              className="w-full h-32 md:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="w-12 h-12 text-white" fill="currentColor" />
              </div>
            </div>
            {item.rating && (
              <div className="absolute top-2 right-2">
                <span className={`${getRatingColor(item.rating)} text-white text-xs px-2 py-1 rounded font-medium`}>
                  {item.rating}
                </span>
              </div>
            )}
            <div className="absolute bottom-2 left-2 right-2">
              <span className="text-white text-xs bg-black/60 px-2 py-1 rounded">
                {item.duration}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <h4 className="font-medium text-white group-hover:text-red-600 transition-colors duration-200">
              {item.title}
            </h4>
            <p className="text-sm text-gray-text mt-1">
              {item.genre} • {item.year}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
