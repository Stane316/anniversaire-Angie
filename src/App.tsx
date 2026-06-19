import { useState } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import CursorGlow from './components/CursorGlow';
import FloatingHearts from './components/FloatingHearts';
import IntroOverlay from './components/IntroOverlay';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import QualitiesSection from './components/QualitiesSection';
import JournalSection from './components/JournalSection';
import StatsSection from './components/StatsSection';
import GallerySection from './components/GallerySection';
import MessageSection from './components/MessageSection';
import LetterSection from './components/LetterSection';
import FinaleSection from './components/FinaleSection';
import AudioToggle from './components/AudioToggle';
import ScrollProgressBar from './components/ScrollProgressBar';

// ═══════════════════════════════════════════════
// DATA: Story sections — 2 ans de rencontre
// ═══════════════════════════════════════════════
const storyData = [
  {
    emoji: '✨',
    label: 'Chapitre 1',
    title: 'Le Jour Où Tout a Commencé',
    text: '12 juin 2024. Une date que je n\'oublierai jamais. Le jour où nos chemins se sont croisés et où j\'ai découvert une personne exceptionnelle. Je ne savais pas encore que tu deviendrais cette amie que tout le monde rêve d\'avoir — celle qui te suit dans tes délires comme si vous les aviez répétés mille fois.',
    date: '12 Juin 2024',
  },
  {
    emoji: '🔥',
    label: 'Chapitre 2',
    title: 'La Complicité Instantanée',
    text: 'Dès le début, il y avait cette connexion bizarrement naturelle. Je fais une blague débile, tu enchéris. Je lance un délire, tu le portes comme une championne. Pas besoin de se coordonner — on est sur la même longueur d\'onde, comme si on avait préparé ça depuis toujours. C\'est tellement rare et tellement précieux.',
  },
  {
    emoji: '📖',
    label: 'Chapitre 3',
    title: 'Nos Moments de Folie',
    text: 'Entre les novelas et Nollywood à la télé, les mangas romance qu\'on dévore, la musique qui nous transporte, et parfois quelques pas de danse improvisés… chaque moment passé ensemble est un souvenir gravé. Et ces photos qu\'on s\'échangeait quotidiennement ? C\'était notre façon à nous de nous dire "je pense à toi" sans avoir besoin de mots.',
  },
  {
    emoji: '🧡',
    label: 'Chapitre 4',
    title: '2 Ans Déjà',
    text: 'Le 12 juin 2026, ça fera 2 ans. 2 ans que tu es cette personne sur qui je peux compter, celle qui sait écouter, conseiller, épauler. Tu as ce don de te mettre à l\'écoute des autres avec une sincérité désarmante. Et ce site, c\'est ma façon de te dire que tu comptes, même quand je ne le dis pas assez.',
    date: '12 Juin 2026 — 2 ans 🧡',
  },
];

// ═══════════════════════════════════════════════
// DATA: Qualities
// ═══════════════════════════════════════════════
const qualitiesData = [
  {
    emoji: '🎭',
    title: 'Reine des Délires',
    description: 'Elle entre dans tes blagues comme si c\'était un script qu\'elle connaissait par cœur. Pas besoin de répétition, le duo est naturel.',
  },
  {
    emoji: '👂',
    title: 'L\'Écoute Absolue',
    description: 'Quand tu parles, elle est là. Vraiment là. Pas juste physiquement — elle t\'écoute avec tout son cœur et te conseille avec une justesse incroyable.',
  },
  {
    emoji: '📚',
    title: 'Esprit Curieux',
    description: 'Lectrice passionnée, fan de mangas romance, addicted aux novelas et Nollywood… Angie a ce côté qui explore les histoires et les émotions.',
  },
  {
    emoji: '🎵',
    title: 'Âme Musicale',
    description: 'La musique la transporte, et quand l\'envie prend, elle danse. Parce que la vie est trop courte pour ne pas bouger sur un bon son.',
  },
  {
    emoji: '💝',
    title: 'Cœur en Or',
    description: 'Attentionnée, bienveillante, toujours prête à aider. C\'est le genre de personne qui rend le monde autour d\'elle un peu plus lumineux.',
  },
  {
    emoji: '🌟',
    title: 'Énergie Positive',
    description: 'Sa présence, c\'est du soleil en bouteille. Même les jours gris, elle trouve le moyen de te faire sourire sans même essayer.',
  },
];

// ═══════════════════════════════════════════════
// DATA: Gallery items
// ═══════════════════════════════════════════════
const galleryData = [
  {
    emoji: '📸',
    label: 'Selfies échangés',
    image: '/images/selfie1.jpeg',
    description: 'Nos selfies du quotidien',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #f97316 100%)',
  },
  {
    emoji: '😂',
    label: 'Fous rires',
    image: '/images/fou-rire.jpeg',
    description: 'Nos moments les plus drôles',
    gradient: 'linear-gradient(135deg, #9a3412 0%, #fb923c 50%, #fbbf24 100%)',
  },
  {
    emoji: '📱',
    label: 'Messages quotidiens',
    image: '/images/messages.jpeg',
    description: 'Des screenshots de nos conversations',
    gradient: 'linear-gradient(135deg, #431407 0%, #c2410c 50%, #f97316 100%)',
  },
  {
    emoji: '🎬',
    label: 'Sessions Nollywood',
    image: '/images/nollywood.jpeg',
    description: 'Nos sessions tv',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
  },
  {
    emoji: '🌸',
    label: 'Mode star',
    image: '/images/mode-star.jpeg',
    description: 'En mode lecture',
    gradient: 'linear-gradient(135deg, #9a3412 0%, #fdba74 50%, #fed7aa 100%)',
  },
  {
    emoji: '💃',
    label: 'Dance mode',
    image: '/images/dance-mode.jpeg',
    description: 'Tes meilleurs moves de danse',
    gradient: 'linear-gradient(135deg, #431407 0%, #ea580c 50%, #fbbf24 100%)',
  },
];

// ═══════════════════════════════════════════════
// DATA: Messages
// ═══════════════════════════════════════════════
const messagesData = [
  {
    text: 'Angie, ce surnom que toi seule portes. Bellange pour le monde, mais Angie pour moi — comme un secret précieux que je garde au fond du cœur.',
    author: 'Pour Angie',
  },
  {
    text: 'Tu sais ce qui est fou ? C\'est qu\'on n\'a même pas eu besoin d\'essayer. Notre amitié, elle s\'est installée toute seule, comme si elle avait toujours existé quelque part en attendant qu\'on la trouve.',
    author: 'Sur nous',
  },
  {
    text: 'Je t\'ai offert cette chanson que j\'ai écrite et composée pour notre amitié. Mais les mots dans une chanson, ça ne suffit pas toujours. Alors j\'ai fait ce site, pour que tu aies quelque chose que tu peux revisiter, encore et encore — pour nos 2 ans, et pour tous ceux qui viendront.',
    author: 'Pourquoi ce site',
  },
  {
    text: '2 ans. 730 jours. Des milliers de messages, des fous rires, des discussions à n\'importe quelle heure. Et toi, toujours là. Ce site, c\'est ma façon de te dire merci d\'être restée.',
    author: 'Pour nos 2 ans 🧡',
  },
  {
    text: 'Merci pour chaque discussion profonde à n\'importe quelle heure. Pour chaque "regarde ça" qui finissait en 2h de délire. Pour chaque fois où tu m\'as suivi dans mes trucs sans même poser de questions. Tu es la meilleure, Angie. Vraiment.',
    author: 'Avec tout mon cœur',
  },
];

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticleCanvas density={50} connectDistance={120} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FloatingHearts count={28} />
        </div>
      </div>
      <CursorGlow />

      {/* Intro overlay */}
      {!entered && <IntroOverlay onEnter={() => setEntered(true)} />}

      {/* Main content */}
      <div
        className="relative z-10"
        style={{
          opacity: entered ? 1 : 0,
          visibility: entered ? 'visible' : 'hidden',
          transition: 'opacity 0.8s ease',
        }}
      >
        <ScrollProgressBar />
        <AudioToggle />

        <HeroSection />

        <Divider />
        <div className="max-w-7xl mx-auto">
          {storyData.map((story, i) => (
            <StorySection
              key={i}
              emoji={story.emoji}
              label={story.label}
              title={story.title}
              text={story.text}
              date={story.date}
              index={i}
            />
          ))}
        </div>

        <Divider />
        <QualitiesSection qualities={qualitiesData} />

        <Divider />
        <JournalSection />

        <Divider />
        {/* 🆕 NEW: Stats Section */}
        <StatsSection />

        <Divider />
        <GallerySection items={galleryData} />

        <Divider />
        <MessageSection messages={messagesData} />

        <Divider />
        <LetterSection />

        <Divider />
        <FinaleSection />
      </div>
    </div>
  );
}

// Small divider component
function Divider() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <span className="mx-4 text-orange-500/30 text-xs animate-twinkle">✦</span>
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
    </div>
  );
}