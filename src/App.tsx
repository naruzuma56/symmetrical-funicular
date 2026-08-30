import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AudioBusProvider } from './hooks/useAudio';
import { ReadingDirectionProvider } from './hooks/useReadingDirection';
import { InkCursor } from './components/common/InkCursor';
import { IntroSplash } from './components/common/IntroSplash';
import { MangaNav } from './components/common/MangaNav';
import { Footer } from './components/common/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';
import { MangaChapterReaderModal } from './components/modal/MangaChapterReaderModal';
import type { Project } from './types';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <AudioBusProvider>
      <ReadingDirectionProvider>
        <InkCursor />
        <AnimatePresence>{!introDone && <IntroSplash onDone={() => setIntroDone(true)} />}</AnimatePresence>

        <MangaNav />

        <main id="main-content">
          <Hero />
          <About />
          <Experience />
          <Projects onOpen={setActiveProject} />
          <Skills />
          <Certifications />
          <Contact />
        </main>

        <Footer />

        <MangaChapterReaderModal project={activeProject} onClose={() => setActiveProject(null)} />
      </ReadingDirectionProvider>
    </AudioBusProvider>
  );
}