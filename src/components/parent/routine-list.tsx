import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Routine {
  id: string;
  title: string;
  description: string | null;
  tasks: Task[];
  reward_coins: number;
  is_active: boolean;
  created_at: string;
}

interface RoutineListProps {
  refreshTrigger: number;
}

export const RoutineList = ({ refreshTrigger }: RoutineListProps) => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchRoutines = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRoutines((data as any) || []);
    } catch (error) {
      console.error('Error fetching routines:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar as rotinas.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRoutineStatus = async (routineId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('routines')
        .update({ is_active: !currentStatus })
        .eq('id', routineId);

      if (error) throw error;

      setRoutines(routines.map(routine => 
        routine.id === routineId 
          ? { ...routine, is_active: !currentStatus }
          : routine
      ));

      toast({
        title: currentStatus ? "Rotina desativada" : "Rotina ativada",
        description: `A rotina foi ${currentStatus ? 'desativada' : 'ativada'} com sucesso.`,
      });
    } catch (error) {
      console.error('Error toggling routine status:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível alterar o status da rotina.",
      });
    }
  };

  const deleteRoutine = async (routineId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta rotina?")) return;

    try {
      const { error } = await supabase
        .from('routines')
        .delete()
        .eq('id', routineId);

      if (error) throw error;

      setRoutines(routines.filter(routine => routine.id !== routineId));
      toast({
        title: "Rotina excluída",
        description: "A rotina foi excluída com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting routine:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir a rotina.",
      });
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, [user, refreshTrigger]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (routines.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <p className="text-muted-foreground mb-4">Nenhuma rotina criada ainda.</p>
          <p className="text-sm text-muted-foreground">
            Crie sua primeira rotina para começar!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Suas Rotinas ({routines.length})</h3>
      
      <div className="grid gap-4">
        {routines.map((routine) => (
          <Card key={routine.id} className={`${!routine.is_active ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {routine.title}
                    <Badge variant={routine.is_active ? "default" : "secondary"}>
                      {routine.is_active ? "Ativa" : "Inativa"}
                    </Badge>
                  </CardTitle>
                  {routine.description && (
                    <CardDescription className="mt-1">
                      {routine.description}
                    </CardDescription>
                  )}
                </div>
                
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleRoutineStatus(routine.id, routine.is_active)}
                    title={routine.is_active ? "Desativar rotina" : "Ativar rotina"}
                  >
                    {routine.is_active ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteRoutine(routine.id)}
                    title="Excluir rotina"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Recompensa:</span>
                  <Badge variant="secondary" className="flex items-center gap-1 bg-gradient-coins text-black">
                    🪙 {routine.reward_coins}
                  </Badge>
                </div>
                
                <div>
                  <span className="text-sm font-medium">Tarefas ({routine.tasks.length}):</span>
                  <ul className="mt-2 space-y-1">
                    {routine.tasks.map((task, index) => (
                      <li key={task.id || index} className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                        <div className="font-medium">{task.title}</div>
                        {task.description && (
                          <div className="text-xs">{task.description}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Criada em: {new Date(routine.created_at).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};