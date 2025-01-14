import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const Legal = () => {
  const { toast } = useToast();

  const handleDeletionRequest = () => {
    toast({
      title: "Demande envoyée",
      description: "Nous traiterons ta demande dans les plus brefs délais.",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">
          ← Retour à l'accueil
        </Link>
        
        <h1 className="font-display text-4xl mb-12">Mentions légales</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Suppression des données personnelles</h2>
          <p className="text-gray-300 mb-6">
            Conformément au RGPD, tu peux demander la suppression de tes données personnelles à tout moment.
            Clique sur le bouton ci-dessous pour initier la procédure.
          </p>
          <Button onClick={handleDeletionRequest}>
            Demander la suppression de mes données
          </Button>
        </section>

        <Separator className="my-8" />
        
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Conditions Générales d'Utilisation</h2>
          <div className="prose prose-invert">
            <h3>1. Objet</h3>
            <p>
              Les présentes CGU régissent ton utilisation de l'application Moon Astral, disponible sur iOS et Android.
            </p>
            
            <h3>2. Services</h3>
            <p>
              Moon Astral te propose des services d'astrologie, de numérologie et de tarots personnalisés.
            </p>
            
            <h3>3. Protection des données</h3>
            <p>
              Nous collectons et traitons tes données conformément à notre politique de confidentialité et au RGPD.
            </p>
            
            <h3>4. Responsabilité</h3>
            <p>
              Les prédictions et conseils fournis par Moon Astral sont à titre informatif uniquement.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Legal;