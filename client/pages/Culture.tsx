import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Share2,
  MessageCircle,
  BookOpen,
  Star,
  Trophy,
  ChevronRight,
  Play,
  Award,
  Sparkles,
  Globe
} from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";

export default function Culture() {
  const { content, getContentByType, likeContent, incrementViews, addComment } = useData();
  const { toast } = useToast();
  
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [currentQuiz, setCurrentQuiz] = useState<{
    id: number;
    title: string;
    quiz?: {
      questions: Array<{
        id: number;
        question: string;
        options: string[];
        correct: number;
        explanation: string;
      }>;
    };
  } | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Get cultural content from centralized data
  const culturalContent = getContentByType("Cultural Content");
  
  const festivals = culturalContent.filter(item => item.category === "Festival");
  const traditions = culturalContent.filter(item => item.category === "Tradition");
  const quizContent = culturalContent.filter(item => item.category === "Quiz");

  const handleLike = (id: number) => {
    if (!likedItems.has(id)) {
      likeContent(id);
      setLikedItems(new Set([...likedItems, id]));
      toast({
        title: "Liked!",
        description: "You liked this content",
      });
    }
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this cultural content: ${title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Link copied to clipboard",
      });
    }
  };

  const handleComment = (id: number) => {
    addComment(id);
    toast({
      title: "Comment Added",
      description: "Your comment has been added",
    });
  };

  const handleReadMore = (id: number, title: string) => {
    incrementViews(id);
    toast({
      title: "Reading Article",
      description: `Opening "${title}"`,
    });
  };

  const startQuiz = (quiz: typeof currentQuiz) => {
    setCurrentQuiz(quiz);
    setQuizAnswers({});
    setQuizScore(null);
    setShowQuizResults(false);
    incrementViews(quiz.id);
  };

  const submitQuiz = () => {
    if (!currentQuiz?.quiz?.questions) return;
    
    const questions = currentQuiz.quiz.questions;
    let correct = 0;
    
    questions.forEach((question: { id: number; correct: number }) => {
      if (quizAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    
    const score = Math.round((correct / questions.length) * 100);
    setQuizScore(score);
    setShowQuizResults(true);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}%`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ethiopian-green-50 to-ethiopian-yellow-50 py-16 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-6">Ethiopian Culture</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover the rich heritage, vibrant traditions, and timeless festivals that define Ethiopia's cultural identity
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-ethiopian-green-500" />
                <span>{festivals.length} Festivals</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-ethiopian-yellow-500" />
                <span>{traditions.length} Traditions</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-ethiopian-red-500" />
                <span>{quizContent.length} Interactive Quizzes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="festivals" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="festivals" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Festivals ({festivals.length})
            </TabsTrigger>
            <TabsTrigger value="traditions" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Traditions ({traditions.length})
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Cultural Quiz ({quizContent.length})
            </TabsTrigger>
          </TabsList>

          {/* Festivals Tab */}
          <TabsContent value="festivals" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Ethiopian Festivals</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the spiritual depth and joyous celebrations that mark Ethiopia's religious and cultural calendar
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {festivals.map((festival) => (
                <Card key={festival.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {festival.image && (
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${festival.image})` }}>
                      <div className="h-full bg-black bg-opacity-40 flex items-end p-4">
                        <div className="text-white">
                          {festival.featured && (
                            <Badge className="bg-ethiopian-yellow-500 text-white mb-2">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{festival.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{festival.description || festival.content}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {festival.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className={`h-4 w-4 ${likedItems.has(festival.id) ? 'text-red-500 fill-current' : ''}`} />
                          {festival.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {festival.comments}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {festival.createdAt}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                        onClick={() => handleReadMore(festival.id, festival.title)}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read More
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLike(festival.id)}
                      >
                        <Heart className={`w-4 h-4 ${likedItems.has(festival.id) ? 'text-red-500 fill-current' : ''}`} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShare(festival.title)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleComment(festival.id)}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {festivals.length === 0 && (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Festivals Found</h3>
                <p className="text-muted-foreground">Check back later for festival content.</p>
              </div>
            )}
          </TabsContent>

          {/* Traditions Tab */}
          <TabsContent value="traditions" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Ethiopian Traditions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore the time-honored customs and practices that have shaped Ethiopian society for generations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {traditions.map((tradition) => (
                <Card key={tradition.id} className="overflow-hidden">
                  <div className="flex">
                    {tradition.image && (
                      <div className="w-1/3 h-48 bg-cover bg-center" style={{ backgroundImage: `url(${tradition.image})` }}>
                        <div className="h-full bg-black bg-opacity-20"></div>
                      </div>
                    )}
                    
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold">{tradition.title}</h3>
                        {tradition.featured && (
                          <Badge className="bg-ethiopian-green-500 text-white">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-4 text-sm line-clamp-4">
                        {tradition.description || tradition.content}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {tradition.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className={`h-3 w-3 ${likedItems.has(tradition.id) ? 'text-red-500 fill-current' : ''}`} />
                            {tradition.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {tradition.comments}
                          </span>
                        </div>
                        <span>By {tradition.author}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-ethiopian-yellow-500 hover:bg-ethiopian-yellow-600 text-white"
                          onClick={() => handleReadMore(tradition.id, tradition.title)}
                        >
                          Learn More
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLike(tradition.id)}
                        >
                          <Heart className={`w-4 h-4 ${likedItems.has(tradition.id) ? 'text-red-500 fill-current' : ''}`} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShare(tradition.title)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {traditions.length === 0 && (
              <div className="text-center py-12">
                <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Traditions Found</h3>
                <p className="text-muted-foreground">Check back later for tradition content.</p>
              </div>
            )}
          </TabsContent>

          {/* Cultural Quiz Tab */}
          <TabsContent value="quiz" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Test Your Cultural Knowledge</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Challenge yourself with questions about Ethiopian culture, traditions, and history
              </p>
            </div>

            {/* Quiz Selection */}
            {!currentQuiz && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizContent.map((quiz) => (
                  <Card key={quiz.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startQuiz(quiz)}>
                    <CardContent className="p-6 text-center">
                      <Trophy className="h-12 w-12 text-ethiopian-yellow-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                      <p className="text-muted-foreground mb-4">{quiz.description}</p>
                      
                      {quiz.quiz?.questions && (
                        <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span>{quiz.quiz.questions.length} Questions</span>
                          <span>•</span>
                          <span>{quiz.views} Attempts</span>
                        </div>
                      )}

                      <Button className="w-full bg-ethiopian-green-500 hover:bg-ethiopian-green-600">
                        <Play className="w-4 h-4 mr-2" />
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Active Quiz */}
            {currentQuiz && !showQuizResults && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{currentQuiz.title}</span>
                    <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
                      Exit Quiz
                    </Button>
                  </CardTitle>
                  <Progress 
                    value={(Object.keys(quizAnswers).length / (currentQuiz.quiz?.questions?.length || 1)) * 100} 
                    className="w-full"
                  />
                </CardHeader>
                <CardContent>
                  {currentQuiz.quiz?.questions?.map((question, index: number) => (
                    <div key={question.id} className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option: string, optionIndex: number) => (
                          <Button
                            key={optionIndex}
                            variant={quizAnswers[question.id] === optionIndex ? "default" : "outline"}
                            className="w-full text-left justify-start"
                            onClick={() => setQuizAnswers({...quizAnswers, [question.id]: optionIndex})}
                          >
                            {String.fromCharCode(65 + optionIndex)}. {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {Object.keys(quizAnswers).length === currentQuiz.quiz?.questions?.length && (
                    <Button 
                      className="w-full bg-ethiopian-green-500 hover:bg-ethiopian-green-600 mt-6"
                      onClick={submitQuiz}
                    >
                      Submit Quiz
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quiz Results */}
            {currentQuiz && showQuizResults && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
                  <div className="text-3xl font-bold text-ethiopian-green-500 my-4">
                    {quizScore}%
                  </div>
                  <p className="text-muted-foreground">
                    {quizScore! >= 80 ? "Excellent! You're a culture expert!" :
                     quizScore! >= 60 ? "Good job! You know your culture well." :
                     "Keep learning! There's always more to discover."}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentQuiz.quiz?.questions?.map((question, index: number) => (
                      <div key={question.id} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">{index + 1}. {question.question}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Your answer: {question.options[quizAnswers[question.id]]} 
                          {quizAnswers[question.id] === question.correct ? 
                            <span className="text-green-600 ml-2">✓ Correct</span> : 
                            <span className="text-red-600 ml-2">✗ Incorrect</span>
                          }
                        </p>
                        {quizAnswers[question.id] !== question.correct && (
                          <p className="text-sm text-green-600">
                            Correct answer: {question.options[question.correct]}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-2">{question.explanation}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <Button 
                      className="flex-1"
                      onClick={() => startQuiz(currentQuiz)}
                    >
                      Retake Quiz
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setCurrentQuiz(null)}
                    >
                      Choose Another Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {quizContent.length === 0 && !currentQuiz && (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Quizzes Available</h3>
                <p className="text-muted-foreground">Check back later for interactive quizzes.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
