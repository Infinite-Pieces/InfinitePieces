import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const CommunityGallery = () => {
  // Example community puzzles data
  const communityPuzzles = [
    {
      id: 1,
      title: "Mountain Sunrise",
      creator: "Sarah J.",
      image: "/api/placeholder/300/200",
      likes: 245,
      comments: 12,
      pieces: 1000
    },
    {
      id: 2,
      title: "Fantasy Castle",
      creator: "Mike R.",
      image: "/api/placeholder/300/200",
      likes: 189,
      comments: 8,
      pieces: 500
    },
    {
      id: 3,
      title: "Ocean Dreams",
      creator: "Emma L.",
      image: "/api/placeholder/300/200",
      likes: 312,
      comments: 15,
      pieces: 2000
    },
    // Add more puzzles as needed
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Community Gallery</CardTitle>
        <CardDescription>Discover puzzles created by our community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityPuzzles.map((puzzle) => (
            <div key={puzzle.id} className="group relative">
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <img
                  src={puzzle.image}
                  alt={puzzle.title}
                  className="object-cover transform group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium">{puzzle.title}</h3>
                    <p className="text-white/80 text-sm">by {puzzle.creator}</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">{puzzle.pieces} pieces</span>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-red-500">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-sm">{puzzle.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-blue-500">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">{puzzle.comments}</span>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityGallery;
