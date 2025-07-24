import { useState } from "react";
import { ChildRoutineView } from "./child/child-routine-view";
import { SpaceStore } from "./store/space-store";
import { ParentDashboard } from "./parent/parent-dashboard";

type AppView = "child-routine" | "space-store" | "parent-dashboard" | "create-routine" | "edit-store" | "view-schedule" | "suggest-improvements";

export const CosmicApp = () => {
  const [currentView, setCurrentView] = useState<AppView>("child-routine");
  const [childCoins, setChildCoins] = useState(79);

  const handleNavigation = (view: string) => {
    setCurrentView(view as AppView);
  };

  const handlePurchase = (productId: string, cost: number) => {
    setChildCoins(prev => prev - cost);
    // Here you would also add the purchase to database
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "child-routine":
        return <ChildRoutineView />;
      
      case "space-store":
        return (
          <SpaceStore 
            childCoins={childCoins}
            onPurchase={handlePurchase}
            onBack={() => setCurrentView("child-routine")}
          />
        );
      
      case "parent-dashboard":
        return <ParentDashboard onNavigate={handleNavigation} />;
      
      case "create-routine":
        return (
          <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
            <div className="text-center text-foreground">
              <h2 className="text-2xl font-bold mb-4">Criar Rotina</h2>
              <p className="mb-4">Esta funcionalidade será implementada em breve!</p>
              <button 
                onClick={() => setCurrentView("parent-dashboard")}
                className="bg-primary text-primary-foreground px-4 py-2 rounded"
              >
                Voltar
              </button>
            </div>
          </div>
        );
      
      case "edit-store":
        return (
          <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
            <div className="text-center text-foreground">
              <h2 className="text-2xl font-bold mb-4">Editar Loja</h2>
              <p className="mb-4">Esta funcionalidade será implementada em breve!</p>
              <button 
                onClick={() => setCurrentView("parent-dashboard")}
                className="bg-primary text-primary-foreground px-4 py-2 rounded"
              >
                Voltar
              </button>
            </div>
          </div>
        );
      
      case "view-schedule":
        return (
          <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
            <div className="text-center text-foreground">
              <h2 className="text-2xl font-bold mb-4">Ver Programação</h2>
              <p className="mb-4">Esta funcionalidade será implementada em breve!</p>
              <button 
                onClick={() => setCurrentView("parent-dashboard")}
                className="bg-primary text-primary-foreground px-4 py-2 rounded"
              >
                Voltar
              </button>
            </div>
          </div>
        );
      
      case "suggest-improvements":
        return (
          <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
            <div className="text-center text-foreground">
              <h2 className="text-2xl font-bold mb-4">Sugerir Melhorias</h2>
              <p className="mb-4">Esta funcionalidade será implementada em breve!</p>
              <button 
                onClick={() => setCurrentView("parent-dashboard")}
                className="bg-primary text-primary-foreground px-4 py-2 rounded"
              >
                Voltar
              </button>
            </div>
          </div>
        );
      
      default:
        return <ChildRoutineView />;
    }
  };

  return (
    <div className="cosmic-app">
      {/* Header with navigation */}
      <header className="relative z-50 p-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView("child-routine")}
            className="bg-primary text-primary-foreground px-3 py-2 rounded text-sm"
          >
            Criança
          </button>
          <button
            onClick={() => setCurrentView("space-store")}
            className="bg-secondary text-secondary-foreground px-3 py-2 rounded text-sm"
          >
            Loja
          </button>
        </div>
        
        <button
          onClick={() => setCurrentView("parent-dashboard")}
          className="bg-accent text-accent-foreground px-3 py-2 rounded text-sm"
        >
          Pais
        </button>
      </header>

      {renderCurrentView()}
    </div>
  );
};