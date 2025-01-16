import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité de l'Application Moon Astral</h1>
          <p className="text-gray-400 mb-8">Dernière mise à jour : 10.01.2025</p>
          
          <p>Chez Moon Astral, nous accordons une importance primordiale à la confidentialité et à la protection de vos données personnelles. Cette politique de confidentialité explique comment vos informations sont collectées, utilisées, et sécurisées lorsque vous utilisez l'application mobile Moon Astral, propriété de la société Resilience (917414492), située au 10 Rue de Laborde, 75008 Paris.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Informations que nous collectons</h2>
          <p>Pour vous offrir des services personnalisés (astrologie, tarot, numérologie), nous collectons les informations suivantes :</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">1.1. Données que vous fournissez directement</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Données personnelles : Prénom, date, heure et lieu de naissance.</li>
            <li>Informations de contact : Adresse e-mail (lors de l'inscription ou pour vous contacter).</li>
            <li>Données d'achat : Informations liées aux transactions (abonnement ou achats ponctuels via l'App Store).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">1.2. Données collectées automatiquement</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Données d'utilisation : Informations sur la manière dont vous interagissez avec l'application.</li>
            <li>Données techniques : Modèle de votre appareil, système d'exploitation, et version de l'app.</li>
            <li>Adresse IP et identifiants uniques : Utilisés pour améliorer la sécurité et l'expérience utilisateur.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Utilisation de vos données</h2>
          <p>Vos informations sont collectées pour les finalités suivantes :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Personnalisation des services : Création d'analyses astrologiques, tirages de tarot, ou rapports de numérologie adaptés à vos besoins.</li>
            <li>Gestion de votre compte : Faciliter l'accès à l'application et à ses fonctionnalités.</li>
            <li>Paiements et abonnements : Traitement des transactions via l'App Store.</li>
            <li>Amélioration de l'expérience utilisateur : Analyse de l'utilisation pour optimiser les performances et l'interface de l'application.</li>
            <li>Conformité légale : Respect des obligations légales, telles que la gestion des données conformément au RGPD.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Partage de vos données</h2>
          <p>Nous ne partageons pas vos données personnelles avec des tiers, sauf dans les cas suivants :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Prestataires de services : Pour gérer l'hébergement, le paiement, ou d'autres services techniques (ces partenaires respectent les normes RGPD).</li>
            <li>Conformité légale : En cas d'exigence légale ou réglementaire, nous pourrions être amenés à transmettre vos données aux autorités compétentes.</li>
            <li>Statistiques anonymisées : Données agrégées pour des analyses internes ou études, sans possibilité d'identifier les utilisateurs.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Stockage et sécurité des données</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Hébergement en Europe : Vos données sont stockées sur des serveurs sécurisés conformes aux normes européennes, notamment le RGPD.</li>
            <li>Chiffrement : Toutes les données sensibles sont protégées par des technologies de chiffrement avancées.</li>
            <li>Confidentialité : Aucun membre de l'équipe Moon Astral n'a accès à vos conversations ou analyses personnelles.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Vos droits en matière de données personnelles</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">5.1. Accès et modification</h3>
          <p>Vous pouvez demander un accès à vos données personnelles ou leur modification via l'application ou en nous contactant à l'adresse e-mail ci-dessous.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">5.2. Suppression</h3>
          <p>Vous avez le droit de demander la suppression de vos données personnelles. Cette demande peut être effectuée via votre compte ou par e-mail. Notez que certaines données peuvent être conservées pour respecter des obligations légales.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">5.3. Opposition et portabilité</h3>
          <p>Vous pouvez vous opposer à certains traitements ou demander une copie de vos données dans un format lisible.</p>

          <p className="mt-4">Pour exercer vos droits, contactez-nous à support@moonastral.com.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies et technologies similaires</h2>
          <p>Moon Astral utilise des technologies similaires aux cookies pour analyser l'utilisation de l'application et améliorer l'expérience utilisateur. Ces données sont anonymisées et ne permettent pas de vous identifier.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Conservation des données</h2>
          <p>Vos données personnelles sont conservées aussi longtemps que nécessaire pour fournir les services ou respecter les obligations légales. Les données inutilisées ou obsolètes seront supprimées ou anonymisées.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Mineurs</h2>
          <p>L'application Moon Astral est réservée aux utilisateurs âgés de 16 ans ou plus. Nous ne collectons pas sciemment de données personnelles auprès de mineurs. Si vous êtes parent ou tuteur et pensez que votre enfant a utilisé notre application, contactez-nous pour supprimer les données concernées.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Modifications de la politique de confidentialité</h2>
          <p>Cette politique de confidentialité peut être mise à jour pour refléter des changements légaux, techniques ou commerciaux. Nous informerons les utilisateurs des modifications via une notification dans l'application.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact</h2>
          <p>Pour toute question ou demande concernant vos données personnelles, vous pouvez nous contacter :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>E-mail : support@moonastral.com</li>
            <li>Adresse postale : Resilience, 10 Rue de Laborde, 75008 Paris.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. Loi applicable</h2>
          <p>Cette politique de confidentialité est régie par le droit français. En cas de litige, les tribunaux compétents seront ceux de Paris.</p>
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-50 rounded-full bg-primary hover:bg-primary/90"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 text-white" />
      </Button>
    </>
  );
};

export default Privacy;