import { useState } from "react";
import { Coins, ShoppingCart, UserCircle, Undo2 } from "lucide-react";
import { getWeek } from "date-fns";
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

const mockRoutines: (Routine & { weekDay: number })[] = [
  // Domingo (0)
  { id: "dom1", description: "Acordar e tomar café da manhã", time: "09:00", duration: 45, rewardCoins: 5, completed: false, weekDay: 0 },
  { id: "dom2", description: "Ler um livro por 30 minutos", time: "14:30", duration: 30, rewardCoins: 8, completed: false, weekDay: 0 },
  { id: "dom3", description: "Organizar o quarto", time: "16:00", duration: 25, rewardCoins: 6, completed: false, weekDay: 0 },
  
  // Segunda-feira (1)
  { id: "seg1", description: "Acordar e se preparar para escola", time: "07:00", duration: 30, rewardCoins: 5, completed: false, weekDay: 1 },
  { id: "seg2", description: "Fazer lição de casa", time: "15:30", duration: 60, rewardCoins: 12, completed: false, weekDay: 1 },
  { id: "seg3", description: "Ajudar na cozinha", time: "18:00", duration: 20, rewardCoins: 7, completed: false, weekDay: 1 },
  
  // Terça-feira (2)
  { id: "ter1", description: "Tomar café da manhã", time: "07:30", duration: 20, rewardCoins: 3, completed: false, weekDay: 2 },
  { id: "ter2", description: "Estudar matemática", time: "16:15", duration: 45, rewardCoins: 10, completed: false, weekDay: 2 },
  { id: "ter3", description: "Guardar os brinquedos", time: "19:30", duration: 15, rewardCoins: 5, completed: false, weekDay: 2 },
  
  // Quarta-feira (3)
  { id: "qua1", description: "Acordar, Tomar café da manhã", time: "08:00", duration: 30, rewardCoins: 5, completed: false, weekDay: 3 },
  { id: "qua2", description: "Fazer tarefa e leitura", time: "09:30", duration: 45, rewardCoins: 10, completed: false, weekDay: 3 },
  { id: "qua3", description: "Ajudar a mãe em algo que ela precise, arrumar a cama e guardar a louça", time: "10:15", duration: 30, rewardCoins: 8, completed: false, weekDay: 3 },
  
  // Quinta-feira (4)
  { id: "qui1", description: "Escovar os dentes e tomar banho", time: "07:15", duration: 25, rewardCoins: 4, completed: false, weekDay: 4 },
  { id: "qui2", description: "Praticar instrumento musical", time: "17:00", duration: 40, rewardCoins: 9, completed: false, weekDay: 4 },
  { id: "qui3", description: "Organizar a mochila escolar", time: "20:00", duration: 10, rewardCoins: 3, completed: false, weekDay: 4 },
  
  // Sexta-feira (5)
  { id: "sex1", description: "Café da manhã nutritivo", time: "08:15", duration: 25, rewardCoins: 4, completed: false, weekDay: 5 },
  { id: "sex2", description: "Revisar matérias da semana", time: "15:00", duration: 50, rewardCoins: 11, completed: false, weekDay: 5 },
  { id: "sex3", description: "Arrumar o guarda-roupa", time: "18:45", duration: 35, rewardCoins: 8, completed: false, weekDay: 5 },
  
  // Sábado (6)
  { id: "sab1", description: "Dormir um pouco mais", time: "09:30", duration: 30, rewardCoins: 3, completed: false, weekDay: 6 },
  { id: "sab2", description: "Atividade física ou esporte", time: "14:00", duration: 60, rewardCoins: 15, completed: false, weekDay: 6 },
  { id: "sab3", description: "Tempo em família", time: "17:30", duration: 45, rewardCoins: 10, completed: false, weekDay: 6 }
];

interface ChildRoutineViewProps {
  onNavigate?: (view: string) => void;
}

export const ChildRoutineView = ({ onNavigate }: ChildRoutineViewProps = {}) => {
  const [routines, setRoutines] = useState(mockRoutines);
  const [coins, setCoins] = useState(mockChild.coins);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [completingRoutine, setCompletingRoutine] = useState<string | null>(null);

  const handleRoutineComplete = (routineId: string) => {
    setCompletingRoutine(routineId);
    
    setTimeout(() => {
      setRoutines(prev => prev.map(routine => {
        if (routine.id === routineId && !routine.completed) {
          setCoins(prev => prev + routine.rewardCoins);
          return { ...routine, completed: true };
        }
        return routine;
      }));
      
      setTimeout(() => {
        setCompletingRoutine(null);
      }, 500);
    }, 600);
  };

  const handleRoutineUndo = (routineId: string) => {
    setRoutines(prev => prev.map(routine => {
      if (routine.id === routineId && routine.completed) {
        setCoins(prev => prev - routine.rewardCoins);
        return { ...routine, completed: false };
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
      week: getWeek(today)
    };
  };

  const dayInfo = getDayInfo();
  const currentWeekDay = selectedDay !== null ? selectedDay : new Date().getDay();
  const filteredRoutines = routines.filter(routine => routine.weekDay === currentWeekDay);

  const handleDaySelect = (dayIndex: number) => {
    setSelectedDay(dayIndex);
  };


  return (
    <CosmicBackground>
      <div className="container mx-auto p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-warning mb-1">
              Rotina Espacial
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {`quinta-feira, ${dayInfo.day} de ${dayInfo.month} de ${dayInfo.year}.`}
            </p>
          </div>
          
          {/* Menu Button */}
          <Button 
            variant="outline" 
            size="sm"
            className="rounded-xl h-12 sm:h-14 w-full sm:w-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <CosmicIcon type="meteor" size={18} />
            <span className="ml-2">Menu</span>
          </Button>
          
          {/* Collapsible Menu */}
          {isMenuOpen && (
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4 sm:mt-0">
              {/* Child Profile */}
              <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-2xl p-3 border border-accent/20 h-12 sm:h-14">
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border-2 border-primary">
                  <AvatarFallback className="text-sm sm:text-lg bg-gradient-stellar">
                    {mockChild.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-semibold text-foreground">{mockChild.name}</div>
                </div>
              </div>
              
              {/* Coins */}
              <div className="flex items-center justify-center gap-2 bg-gradient-coins rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-cosmic h-12 sm:h-14 min-w-[80px] sm:min-w-[100px]">
                <Coins className="text-orange-600" size={18} />
                <span className="text-base sm:text-lg font-bold text-black">{coins}</span>
              </div>
              
              {/* Store Button */}
              <Button variant="cosmic" size="sm" className="rounded-xl h-12 sm:h-14 text-xs sm:text-sm" onClick={() => onNavigate?.("space-store")}>
                <ShoppingCart size={16} />
                <span className="ml-1 sm:ml-2">Loja</span>
              </Button>
              
              {/* Parent Area Button */}
              <Button variant="outline" size="sm" className="rounded-xl h-12 sm:h-14 text-xs sm:text-sm" onClick={() => onNavigate?.("parent-dashboard")}>
                <UserCircle size={16} />
                <span className="ml-1 sm:ml-2">Pais</span>
              </Button>
            </div>
          )}
        </div>

        {/* Week Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 mb-6 sm:mb-8">
          <span className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-0 sm:mr-4">Semana: {dayInfo.week}</span>
          <div className="flex items-center gap-1 sm:gap-2">
            {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((day, index) => (
              <Badge 
                key={day}
                variant={index === currentWeekDay ? "default" : "secondary"}
                className={`px-2 py-1 text-xs cursor-pointer transition-colors hover:bg-accent/80 ${
                  index === currentWeekDay ? 'bg-warning text-warning-foreground' : ''
                }`}
                onClick={() => handleDaySelect(index)}
              >
                {day}
              </Badge>
            ))}
          </div>
        </div>

        {/* Routines List */}
        <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
          {filteredRoutines.map((routine) => (
            <Card key={routine.id} className={`p-4 sm:p-6 bg-card/50 backdrop-blur-sm border transition-all duration-500 ${
              routine.completed ? 'border-success/40 bg-success/5' : 'border-accent/20 hover:border-accent/40'
            } ${completingRoutine === routine.id ? 'animate-pulse scale-105 border-warning/60 bg-warning/10' : ''}`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                {/* Time */}
                <div className="text-center sm:text-center min-w-[70px] sm:min-w-[80px] w-full sm:w-auto">
                  <div className="text-base sm:text-lg font-bold text-primary">{routine.time}</div>
                  <div className="text-xs text-muted-foreground">
                    {routine.time} - {
                      new Date(`2000-01-01T${routine.time}:00`).getTime() + routine.duration * 60000 > new Date(`2000-01-01T${routine.time}:00`).getTime() 
                        ? new Date(new Date(`2000-01-01T${routine.time}:00`).getTime() + routine.duration * 60000).toTimeString().slice(0,5)
                        : "..."
                    }
                  </div>
                </div>

                {/* Task Description */}
                <div className="flex-1 w-full">
                  <p className={`text-sm sm:text-lg ${routine.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {routine.description}
                  </p>
                </div>

                {/* Bottom section with reward and completion button */}
                <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
                   {/* Reward */}
                   <div className={`flex items-center gap-2 transition-transform duration-300 ${
                     completingRoutine === routine.id ? 'animate-bounce' : ''
                   }`}>
                     <CosmicIcon type="coin" className="text-yellow-500" size={16} />
                     <span className="font-bold text-yellow-500 text-sm sm:text-base">{routine.rewardCoins}</span>
                   </div>

                   {/* Completion Checkbox */}
                   <div className="flex items-center gap-2">
                     {routine.completed ? (
                       <>
                         <div className="bg-success rounded-full p-1.5 sm:p-2">
                           <CosmicIcon type="star" className="text-success-foreground" size={16} />
                         </div>
                         <Button
                           variant="outline"
                           size="sm"
                           onClick={() => handleRoutineUndo(routine.id)}
                           className="rounded-full p-2 text-xs border-muted-foreground/30 hover:border-muted-foreground/50"
                         >
                           <Undo2 size={14} />
                         </Button>
                       </>
                     ) : (
                       <Button
                         variant="stellar"
                         size="sm"
                         onClick={() => handleRoutineComplete(routine.id)}
                         className="rounded-full px-4 sm:px-6 text-xs sm:text-sm"
                       >
                         Completar
                       </Button>
                     )}
                   </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </CosmicBackground>
  );
};