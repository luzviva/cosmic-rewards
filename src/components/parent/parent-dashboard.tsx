import { CosmicBackground } from "@/components/cosmic/cosmic-background";
import { CosmicIcon } from "@/components/cosmic/cosmic-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ParentDashboardProps {
  onNavigate: (view: string) => void;
}

export const ParentDashboard = ({ onNavigate }: ParentDashboardProps) => {
  const dashboardOptions = [
    {
      id: "create-routine",
      title: "Criar Rotina",
      description: "Adicione novas tarefas e rotinas para seus filhos",
      icon: "star" as const,
      color: "cosmic"
    },
    {
      id: "edit-store", 
      title: "Editar Loja",
      description: "Gerencie produtos e recompensas da loja espacial",
      icon: "galaxy" as const,
      color: "stellar"
    },
    {
      id: "view-schedule",
      title: "Ver Programação", 
      description: "Visualize e acompanhe as rotinas das crianças",
      icon: "satellite" as const,
      color: "nebula"
    },
    {
      id: "suggest-improvements",
      title: "Sugerir Melhorias",
      description: "Envie sugestões para melhorar o aplicativo", 
      icon: "rocket" as const,
      color: "cosmic"
    }
  ];

  return (
    <CosmicBackground>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary animate-pulse-glow">
            Área dos Pais
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gerencie as rotinas e recompensas dos seus filhos neste painel de controle espacial
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {dashboardOptions.map((option) => (
            <Card 
              key={option.id}
              className="bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-cosmic p-8 group cursor-pointer"
              onClick={() => onNavigate(option.id)}
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="bg-gradient-stellar rounded-2xl w-16 h-16 flex items-center justify-center mx-auto group-hover:scale-110 transition-cosmic">
                  <CosmicIcon type={option.icon} className="text-primary-foreground" size={32} />
                </div>

                {/* Title and Description */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-cosmic">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {option.description}
                  </p>
                </div>

                {/* Action Button */}
                <Button 
                  variant={option.color as any}
                  className="w-full rounded-xl group-hover:scale-105 transition-cosmic"
                >
                  Acessar
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Card className="bg-success/10 border-success/30 p-4 text-center">
            <CosmicIcon type="star" className="text-success mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-success">12</div>
            <div className="text-sm text-muted-foreground">Rotinas Criadas</div>
          </Card>
          
          <Card className="bg-warning/10 border-warning/30 p-4 text-center">
            <CosmicIcon type="coin" className="text-warning mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-warning">156</div>
            <div className="text-sm text-muted-foreground">Moedas Ganhas</div>
          </Card>
          
          <Card className="bg-primary/10 border-primary/30 p-4 text-center">
            <CosmicIcon type="galaxy" className="text-primary mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-sm text-muted-foreground">Produtos na Loja</div>
          </Card>
        </div>

        {/* Back to Child View */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => onNavigate("child-view")}
            className="rounded-xl border-accent/40 hover:border-accent"
          >
            <CosmicIcon type="rocket" size={16} />
            Voltar para Visão da Criança
          </Button>
        </div>
      </div>
    </CosmicBackground>
  );
};