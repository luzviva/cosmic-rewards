import { useState } from "react";
import { CosmicBackground } from "@/components/cosmic/cosmic-background";
import { CosmicIcon } from "@/components/cosmic/cosmic-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Routine {
  id: string;
  description: string;
  time: string;
  duration: number;
  rewardCoins: number;
  completed: boolean;
}

interface Child {
  name: string;
  avatar: string;
  coins: number;
}

const mockChild: Child = {
  name: "Henrique",
  avatar: "👨‍🚀",
  coins: 79
};

const mockRoutines: Routine[] = [
  {
    id: "1",
    description: "Acordar, Tomar café da manhã",
    time: "08:00",
    duration: 30,
    rewardCoins: 5,
    completed: false
  },
  {
    id: "2", 
    description: "Fazer tarefa e leitura",
    time: "09:30",
    duration: 45,
    rewardCoins: 10,
    completed: true
  },
  {
    id: "3",
    description: "Ajudar a mãe em algo que ela precise, arrumar a cama e guardar a louça",
    time: "10:15",
    duration: 30,
    rewardCoins: 8,
    completed: true
  }
];

export const ChildRoutineView = () => {
  const [routines, setRoutines] = useState(mockRoutines);
  const [coins, setCoins] = useState(mockChild.coins);

  const handleRoutineComplete = (routineId: string) => {
    setRoutines(prev => prev.map(routine => {
      if (routine.id === routineId && !routine.completed) {
        setCoins(prev => prev + routine.rewardCoins);
        return { ...routine, completed: true };
      }
      return routine;
    }));
  };

  const getDayInfo = () => {
    const today = new Date();
    const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    return {
      day: today.getDate(),
      month: months[today.getMonth()],
      year: today.getFullYear(),
      weekDay: weekDays[today.getDay()],
      week: Math.ceil(today.getDate() / 7)
    };
  };

  const dayInfo = getDayInfo();

  return (
    <CosmicBackground>
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-warning mb-1">
              Rotina Espacial
            </h1>
            <p className="text-muted-foreground text-sm">
              {`quinta-feira, ${dayInfo.day} de ${dayInfo.month} de ${dayInfo.year}.`}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Child Profile */}
            <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-2xl p-3 border border-accent/20">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarFallback className="text-2xl bg-gradient-stellar">
                  {mockChild.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <div className="text-lg font-semibold text-foreground">{mockChild.name}</div>
              </div>
            </div>
            
            {/* Coins */}
            <div className="flex items-center gap-2 bg-gradient-coins rounded-2xl px-4 py-3 shadow-cosmic">
              <CosmicIcon type="coin" className="text-orange-600" size={24} />
              <span className="text-lg font-bold text-black">{coins}</span>
            </div>
            
            {/* Store Button */}
            <Button variant="cosmic" size="lg" className="rounded-xl">
              <CosmicIcon type="galaxy" size={20} />
              Loja
            </Button>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-sm text-muted-foreground mr-4">Semana: {dayInfo.week}</span>
          {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((day, index) => (
            <Badge 
              key={day}
              variant={day === dayInfo.weekDay ? "default" : "secondary"}
              className={`px-3 py-1 ${day === dayInfo.weekDay ? 'bg-warning text-warning-foreground' : ''}`}
            >
              {day}
            </Badge>
          ))}
        </div>

        {/* Routines List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {routines.map((routine) => (
            <Card key={routine.id} className={`p-6 bg-card/50 backdrop-blur-sm border transition-cosmic ${
              routine.completed ? 'border-success/40 bg-success/5' : 'border-accent/20 hover:border-accent/40'
            }`}>
              <div className="flex items-center gap-4">
                {/* Time */}
                <div className="text-center min-w-[80px]">
                  <div className="text-lg font-bold text-primary">{routine.time}</div>
                  <div className="text-xs text-muted-foreground">
                    {routine.time} - {
                      new Date(`2000-01-01T${routine.time}:00`).getTime() + routine.duration * 60000 > new Date(`2000-01-01T${routine.time}:00`).getTime() 
                        ? new Date(new Date(`2000-01-01T${routine.time}:00`).getTime() + routine.duration * 60000).toTimeString().slice(0,5)
                        : "..."
                    }
                  </div>
                </div>

                {/* Task Description */}
                <div className="flex-1">
                  <p className={`text-lg ${routine.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {routine.description}
                  </p>
                </div>

                {/* Reward */}
                <div className="flex items-center gap-2">
                  <CosmicIcon type="coin" className="text-yellow-500" size={20} />
                  <span className="font-bold text-yellow-500">{routine.rewardCoins}</span>
                </div>

                {/* Completion Checkbox */}
                <div className="flex items-center">
                  {routine.completed ? (
                    <div className="bg-success rounded-full p-2">
                      <CosmicIcon type="star" className="text-success-foreground" size={20} />
                    </div>
                  ) : (
                    <Button
                      variant="stellar"
                      size="sm"
                      onClick={() => handleRoutineComplete(routine.id)}
                      className="rounded-full px-6"
                    >
                      Completar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </CosmicBackground>
  );
};