import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CosmicBackground } from "@/components/cosmic/cosmic-background";
import { CreateRoutineForm } from "./create-routine-form";
import { RoutineList } from "./routine-list";

interface CreateRoutineViewProps {
  onBack: () => void;
}

export const CreateRoutineView = ({ onBack }: CreateRoutineViewProps) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRoutineCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <CosmicBackground>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">Gerenciar Rotinas</h1>
            <p className="text-muted-foreground">
              Crie e gerencie as rotinas para seus filhos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Routine Form */}
          <div>
            <CreateRoutineForm onRoutineCreated={handleRoutineCreated} />
          </div>

          {/* Routine List */}
          <div>
            <RoutineList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </CosmicBackground>
  );
};