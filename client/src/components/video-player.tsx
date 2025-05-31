import { X, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import type { Media } from "@shared/schema";

interface VideoPlayerProps {
  media: Media | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayer({ media, isOpen, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && media && videoRef.current) {
      setIsLoading(true);
      
      // Simulate loading delay
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.src = media.videoUrl;
          setIsLoading(false);
          
          // Auto-play the video
          videoRef.current.play().catch(error => {
            console.log('Auto-play prevented:', error);
          });
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, media]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleModalClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
    }
    onClose();
  };

  if (!isOpen || !media) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleModalClick}
    >
      <div className="relative w-full max-w-4xl bg-card rounded-lg overflow-hidden animate-scale-up">
        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/50 rounded-full transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <div className="aspect-video bg-black relative">
          <video 
            ref={videoRef}
            className="w-full h-full" 
            controls 
            preload="metadata"
          >
            <p className="text-white p-4">Your browser doesn't support video playback.</p>
          </video>
          
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          )}
        </div>
        
        {/* Video Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{media.title}</h3>
              <p className="text-gray-text">{media.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-text hover:text-white transition-colors duration-200"
              >
                <Heart className="w-6 h-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-text hover:text-white transition-colors duration-200"
              >
                <Share2 className="w-6 h-6" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-text">
            <span>{media.duration}</span>
            <span>{media.quality}</span>
            <span>{media.genre}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
