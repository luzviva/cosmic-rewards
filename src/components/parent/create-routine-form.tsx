import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface CreateRoutineFormProps {
  onRoutineCreated: () => void;
}

export const CreateRoutineForm = ({ onRoutineCreated }: CreateRoutineFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([{ id: "1", title: "", description: "" }]);
  const [rewardCoins, setRewardCoins] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "",
      description: ""
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId: string) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const updateTask = (taskId: string, field: keyof Task, value: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, [field]: value } : task
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Você precisa estar logado para criar uma rotina.",
      });
      return;
    }

    // Validação básica
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "O título da rotina é obrigatório.",
      });
      return;
    }

    const validTasks = tasks.filter(task => task.title.trim());
    if (validTasks.length === 0) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Adicione pelo menos uma tarefa válida.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('routines')
        .insert({
          user_id: user.id,
          title: title.trim(),
          description: description.trim() || null,
          tasks: validTasks as any,
          reward_coins: rewardCoins,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Rotina criada!",
        description: "A nova rotina foi criada com sucesso.",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setTasks([{ id: "1", title: "", description: "" }]);
      setRewardCoins(10);
      
      onRoutineCreated();
    } catch (error) {
      console.error('Error creating routine:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível criar a rotina. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Criar Nova Rotina
        </CardTitle>
        <CardDescription>
          Crie uma rotina personalizada para seu filho
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Rotina</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Rotina Matinal"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o objetivo da rotina..."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Tarefas</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTask}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar Tarefa
              </Button>
            </div>

            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={task.id} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={task.title}
                      onChange={(e) => updateTask(task.id, 'title', e.target.value)}
                      placeholder={`Tarefa ${index + 1}`}
                      required
                    />
                    <Input
                      value={task.description}
                      onChange={(e) => updateTask(task.id, 'description', e.target.value)}
                      placeholder="Descrição da tarefa (opcional)"
                    />
                  </div>
                  {tasks.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeTask(task.id)}
                      className="shrink-0 mt-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reward">Moedas de Recompensa</Label>
            <Input
              id="reward"
              type="number"
              min="1"
              max="100"
              value={rewardCoins}
              onChange={(e) => setRewardCoins(parseInt(e.target.value) || 1)}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            variant="cosmic"
            disabled={isLoading}
          >
            {isLoading ? (
              "Criando..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Criar Rotina
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};