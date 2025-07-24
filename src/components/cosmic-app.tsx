import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChildRoutineView } from "./child/child-routine-view";
import { SpaceStore } from "./store/space-store";
import { ParentDashboard } from "./parent/parent-dashboard";
import { CreateRoutineView } from "./parent/create-routine-view";
import { CosmicBackground } from "./cosmic/cosmic-background";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
type AppView = "child-routine" | "space-store" | "parent-dashboard" | "create-routine" | "edit-store" | "view-schedule" | "suggest-improvements";
export const CosmicApp = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<AppView>("child-routine");
  const [childCoins, setChildCoins] = useState(79);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);
  const handleNavigation = (view: string) => {
    setCurrentView(view as AppView);
  };
  const handlePurchase = (productId: string, cost: number) => {
    setChildCoins(prev => prev - cost);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate("/auth");
    }
  };

  if (loading) {
    return (
      <CosmicBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      </CosmicBackground>
    );
  }

  if (!user) {
    return null;
  }
  const renderCurrentView = () => {
    switch (currentView) {
      case "child-routine":
        return <ChildRoutineView onNavigate={handleNavigation} />;
      case "space-store":
        return <SpaceStore childCoins={childCoins} onPurchase={handlePurchase} onBack={() => setCurrentView("child-routine")} />;
      case "parent-dashboard":
        return <ParentDashboard onNavigate={handleNavigation} />;
      case "create-routine":
        return <CreateRoutineView onBack={() => handleNavigation("parent-dashboard")} />;
      case "edit-store":
        return <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
            <div className="text-center text-foreground">
              <h2 className="text-2xl font-bold mb-4">Editar Loja</h2>
              <p className="mb-4">Esta funcionalidade será implementada em breve!</p>
              <button onClick={() => setCurrentView("parent-dashboard")} className="bg-primary text-primary-foreground px-4 py-2 rounded">
                Voltar
              </button>
            </div>
          </div>;
      case "view-schedule":
        return <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
            <div className="text-center text-foreground">
              <h2 className="text-2xl font-bold mb-4">Ver Programação</h2>
              <p className="mb-4">Esta funcionalidade será implementada em breve!</p>
              <button onClick={() => setCurrentView("parent-dashboard")} className="bg-primary text-primary-foreground px-4 py-2 rounded">
                Voltar
              </button>
            </div>
          </div>;
      case "suggest-improvements":
        return <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
            <div className="text-center text-foreground">
              <h2 className="text-2xl font-bold mb-4">Sugerir Melhorias</h2>
              <p className="mb-4">Esta funcionalidade será implementada em breve!</p>
              <button onClick={() => setCurrentView("parent-dashboard")} className="bg-primary text-primary-foreground px-4 py-2 rounded">
                Voltar
              </button>
            </div>
          </div>;
      default:
        return <ChildRoutineView />;
    }
  };
  return (
    <CosmicBackground>
      <div className="cosmic-app">
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm"
          >
            Sair
          </Button>
        </div>
        {renderCurrentView()}
      </div>
    </CosmicBackground>
  );
};