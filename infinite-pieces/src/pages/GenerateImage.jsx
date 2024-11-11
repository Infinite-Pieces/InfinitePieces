import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Sparkles, Lightbulb, Wand2, Image as ImageIcon,
  Palette, Settings2, Layers, BookmarkPlus 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const GenerateImage = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedAI, setSelectedAI] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [favoritePrompts, setFavoritePrompts] = useState([]);
  const { user, updateTokens } = useAuth();
  const navigate = useNavigate();

  // Original AI Models
  const aiModels = [
    { id: 'dalle', name: 'DALL-E 3', description: 'Best for realistic images and artistic styles', icon: '🎨' },
    { id: 'midjourney', name: 'Midjourney', description: 'Excellent for creative and artistic renderings', icon: '🖼️' },
    { id: 'stable', name: 'Stable Diffusion', description: 'Great for detailed and customizable results', icon: '🌟' }
  ];

  // Original Prompt Suggestions
  const promptSuggestions = [
    {
      category: 'Landscapes',
      examples: [
        'A serene mountain lake at sunset with snow-capped peaks',
        'A mystical forest with bioluminescent plants and fireflies',
        'A coastal cliff overlooking a stormy ocean'
      ]
    },
    {
      category: 'Fantasy',
      examples: [
        'A magical crystal castle floating in the clouds',
        'A dragon\'s lair filled with treasures and ancient artifacts',
        'An enchanted garden with giant glowing flowers'
      ]
    },
    {
      category: 'Abstract',
      examples: [
        'A kaleidoscopic pattern of butterflies and flowers',
        'Geometric shapes flowing like water in vibrant colors',
        'A fractal universe with swirling galaxies'
      ]
    },
    {
      category: 'Cityscapes',
      examples: [
        'Futuristic city with flying vehicles and neon lights',
        'Historic European town square during a festival',
        'Modern cityscape at golden hour with reflective skyscrapers'
      ]
    }
  ];

  // New Style Modifiers
  const styleModifiers = [
    { id: 'colorful', name: 'Colorful', icon: '🌈', description: 'Vibrant and varied colors' },
    { id: 'monochrome', name: 'Monochrome', icon: '⚫️', description: 'Single color variations' },
    { id: 'vintage', name: 'Vintage', icon: '📷', description: 'Retro aesthetic' },
    { id: 'minimalist', name: 'Minimalist', icon: '◽️', description: 'Simple and clean' },
    { id: 'detailed', name: 'Detailed', icon: '🔍', description: 'Rich in details' }
  ];

  // New Difficulty Levels
  const difficultyLevels = [
    { id: 'easy', name: 'Easy', description: 'Great for beginners', pieces: '100-300' },
    { id: 'medium', name: 'Medium', description: 'Perfect for casual puzzlers', pieces: '500-750' },
    { id: 'hard', name: 'Hard', description: 'For experienced puzzlers', pieces: '1000+' }
  ];

  const handleGenerate = () => {
    if (user.tokens > 0 && selectedAI && prompt) {
      updateTokens(user.tokens - 1);
      navigate('/');
    }
  };

  const handlePromptClick = (suggestion) => {
    setPrompt(suggestion);
  };

  const handleSavePrompt = () => {
    if (prompt && !favoritePrompts.includes(prompt)) {
      setFavoritePrompts([...favoritePrompts, prompt]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Generation Section */}
          <div className="md:col-span-2 space-y-6">
            {/* Main Prompt Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-6 w-6" />
                  Create Your Puzzle Image
                </CardTitle>
                <CardDescription>
                  Describe the image you want to create for your puzzle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your dream puzzle image..."
                      className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={handleSavePrompt}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
                      title="Save prompt"
                    >
                      <BookmarkPlus className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-indigo-600" />
                      <span>{user.tokens} tokens remaining</span>
                    </div>
                    <Button
                      onClick={handleGenerate}
                      disabled={!selectedAI || !prompt || user.tokens <= 0}
                    >
                      Generate Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Models Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Your AI Model</CardTitle>
                <CardDescription>Each model has its unique strengths</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedAI(model.id)}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        selectedAI === model.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{model.icon}</div>
                      <h3 className="font-medium">{model.name}</h3>
                      <p className="text-sm text-gray-500">{model.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Style Modifiers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Style Modifiers
                </CardTitle>
                <CardDescription>Enhance your image with these style options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {styleModifiers.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedStyle === style.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{style.icon}</div>
                      <div className="text-sm font-medium">{style.name}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Difficulty Estimator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Puzzle Difficulty
                </CardTitle>
                <CardDescription>Choose your challenge level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedDifficulty(level.id)}
                      className={`p-4 border rounded-lg text-left ${
                        selectedDifficulty === level.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'hover:border-gray-300'
                      }`}
                    >
                      <h3 className="font-medium">{level.name}</h3>
                      <p className="text-sm text-gray-500">{level.description}</p>
                      <p className="text-sm text-indigo-600 mt-1">{level.pieces} pieces</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prompt Ideas */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Prompt Ideas
                </CardTitle>
                <CardDescription>
                  Click on any suggestion to use it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {promptSuggestions.map((category) => (
                    <div key={category.category} className="space-y-3">
                      <h3 className="font-medium text-sm text-gray-500">
                        {category.category}
                      </h3>
                      <div className="space-y-2">
                        {category.examples.map((example) => (
                          <button
                            key={example}
                            onClick={() => handlePromptClick(example)}
                            className="w-full text-left p-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                          >
                            {example}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Saved Prompts */}
            {favoritePrompts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookmarkPlus className="h-5 w-5" />
                    Saved Prompts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {favoritePrompts.map((savedPrompt, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(savedPrompt)}
                        className="w-full text-left p-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                      >
                        {savedPrompt}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImage;