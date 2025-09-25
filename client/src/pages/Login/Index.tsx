import { Link } from "react-router-dom";
import { Calendar, Sparkles, Users, Heart, Camera, Music } from "lucide-react";
import { AuthButton } from "../../components/auth/AuthButton"; 

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-pink-200/50 to-purple-200/50 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-10 w-56 h-56 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-full blur-3xl" />
      
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">craveEvents</span>
            <p className="text-xs text-gray-500 -mt-1">Celebrate every moment</p>
          </div>
        </div>
        <Link to="/userLogin">
          <AuthButton variant="outline">Sign In</AuthButton>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 mb-8">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-700">Where Dreams Become Reality</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Create{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
              Unforgettable
            </span>
            {" "}Events
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            From intimate celebrations to grand occasions, we bring your vision to life with 
            creativity, elegance, and attention to every detail. Let us make your special moments extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link to="/auth">
              <AuthButton size="lg" className="w-full sm:w-auto group bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-none">
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Planning Today
              </AuthButton>
            </Link>
            <AuthButton variant="outline" size="lg" className="w-full sm:w-auto border-pink-300 text-pink-700 hover:bg-pink-50">
              <Camera className="w-5 h-5" />
              View Our Gallery
            </AuthButton>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Wedding Ceremonies</h3>
              <p className="text-gray-600 leading-relaxed">From intimate vows to grand celebrations, we create magical wedding experiences that reflect your unique love story.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Events</h3>
              <p className="text-gray-600 leading-relaxed">Professional gatherings that inspire and connect. From conferences to company celebrations, we deliver excellence.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Music className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Special Celebrations</h3>
              <p className="text-gray-600 leading-relaxed">Birthdays, anniversaries, and milestone moments deserve to be celebrated in style. We make every occasion memorable.</p>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-lg text-gray-600 mb-4">Trusted by hundreds of happy clients</p>
            <div className="flex justify-center items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Sparkles key={i} className="w-5 h-5 text-pink-500 fill-current" />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-900">4.9/5 Customer Rating</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;