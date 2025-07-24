import { useState } from "react";
import { CosmicBackground } from "@/components/cosmic/cosmic-background";
import { CosmicIcon } from "@/components/cosmic/cosmic-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  type: 'toy' | 'treat' | 'experience';
}
const mockProducts: Product[] = [{
  id: "1",
  name: "KitKat caramelo",
  price: 6,
  image: "🍫",
  type: "treat"
}, {
  id: "2",
  name: "Carrinho da Hotwheels",
  price: 40,
  image: "🏎️",
  type: "toy"
}, {
  id: "3",
  name: "Foguete de Brinquedo",
  price: 25,
  image: "🚀",
  type: "toy"
}, {
  id: "4",
  name: "Capacete de Astronauta",
  price: 35,
  image: "👨‍🚀",
  type: "toy"
}, {
  id: "5",
  name: "Modelo de Saturno",
  price: 15,
  image: "🪐",
  type: "toy"
}, {
  id: "6",
  name: "Veículo Explorador",
  price: 50,
  image: "🛸",
  type: "toy"
}];
interface SpaceStoreProps {
  childCoins: number;
  onPurchase: (productId: string, cost: number) => void;
  onBack: () => void;
}
export const SpaceStore = ({
  childCoins,
  onPurchase,
  onBack
}: SpaceStoreProps) => {
  const [coins, setCoins] = useState(childCoins);
  const handlePurchase = (product: Product) => {
    if (coins >= product.price) {
      setCoins(prev => prev - product.price);
      onPurchase(product.id, product.price);
    }
  };
  const canAfford = (price: number) => coins >= price;
  return <CosmicBackground>
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">Loja Espacial</h1>
            <p className="text-muted-foreground">
              Use suas moedas espaciais para comprar recompensas incríveis!
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Current Coins */}
            <div className="flex items-center gap-2 bg-gradient-coins rounded-2xl px-6 py-3 shadow-cosmic">
              <CosmicIcon type="coin" className="text-orange-600" size={24} />
              <span className="text-xl font-bold text-black">Seu Saldo: {coins}</span>
            </div>
            
            {/* Back Button */}
            <Button variant="nebula" onClick={onBack} className="rounded-xl">
              <CosmicIcon type="rocket" size={20} />
              Voltar
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mockProducts.map(product => <Card key={product.id} className="bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-cosmic p-6 group">
              <div className="space-y-4">
                {/* Product Image */}
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-nebula rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-cosmic">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                  
                  {/* Type Badge */}
                  <Badge variant="secondary" className="capitalize">
                    {product.type === 'toy' ? 'Brinquedo' : product.type === 'treat' ? 'Guloseima' : 'Experiência'}
                  </Badge>
                </div>

                {/* Price and Purchase */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <CosmicIcon type="coin" className="text-yellow-500" size={24} />
                    <span className="text-2xl font-bold text-yellow-500">{product.price}</span>
                  </div>
                  
                  <Button variant={canAfford(product.price) ? "coins" : "secondary"} className="w-full rounded-xl" disabled={!canAfford(product.price)} onClick={() => handlePurchase(product)}>
                    <CosmicIcon type="star" size={16} />
                    {canAfford(product.price) ? "Comprar" : "Moedas Insuficientes"}
                  </Button>
                </div>
              </div>
            </Card>)}
        </div>

        {/* Achievement Message */}
        {coins < 10 && <Card className="bg-secondary/50 backdrop-blur-sm border-warning/30 p-6 max-w-2xl mx-auto text-center">
            <CosmicIcon type="rocket" className="text-warning mx-auto mb-4" size={32} />
            <h3 className="text-lg font-bold text-warning mb-2">
              Continue completando suas rotinas!
            </h3>
            <p className="text-muted-foreground">
              Complete mais tarefas para ganhar moedas espaciais e comprar recompensas incríveis!
            </p>
          </Card>}
      </div>
    </CosmicBackground>;
};