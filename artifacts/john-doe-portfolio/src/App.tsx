import { type MouseEvent, type ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import heroPortrait from './assets/zulhaydar-hero.jpeg';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal-up');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function handleAboutNavigation(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const aboutLabel = document.querySelector<HTMLElement>('#about > div:first-child > p');
    if (!aboutLabel) return;

    const navbar = document.querySelector<HTMLElement>('nav[aria-label="Main navigation"]');
    const offset = (navbar?.getBoundingClientRect().height ?? 0) + 16;
    const top = aboutLabel.getBoundingClientRect().top + window.scrollY - offset;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

    window.scrollTo({ top, behavior });
  }

  return (
    <div id="top" className="min-h-[100dvh] bg-[#f7f5ef] text-[#191919]">
      <nav aria-label="Main navigation" className="fixed inset-x-0 top-0 z-50 border-b border-[#191919]/[.07] bg-[#f7f5ef]/90 backdrop-blur-xl">
        <div className="relative mx-auto max-w-[1240px] px-5 py-3 sm:px-8 md:flex md:min-h-[72px] md:items-center md:justify-between md:py-0">
          <div className="flex items-center justify-between md:w-full">
          <a href="#top" className="relative z-10 shrink-0 whitespace-nowrap text-[clamp(10px,2.9vw,15px)] font-extrabold tracking-[-.06em] sm:text-[15px]" aria-label="Zulhaydar Fathurrahman Sidiq, home" data-testid="link-home">Zulhaydar Fathurrahman Sidiq</a>
          <a href="https://wa.link/6dipv7" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-[#191919] px-4 py-2.5 text-[12px] font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[.97] sm:px-5 sm:text-[13px]" aria-label="Message me on WhatsApp" data-testid="link-whatsapp-navbar">
            <FaWhatsapp size={16} aria-hidden="true" />
            <span>WhatsApp Me</span>
          </a>
          </div>
          <div className="mt-2 flex items-center justify-center gap-x-5 border-t border-[#191919]/[.07] pt-2 md:absolute md:left-1/2 md:top-1/2 md:mt-0 md:-translate-x-1/2 md:-translate-y-1/2 md:gap-8 md:border-0 md:pt-0">
            <a href="#work" className="text-[13px] font-semibold text-[#64635f] transition-colors hover:text-[#191919]" data-testid="link-work">Work</a>
            <a href="#about" onClick={handleAboutNavigation} className="text-[13px] font-semibold text-[#64635f] transition-colors hover:text-[#191919]" data-testid="link-about">About</a>
            <a href="#experience" className="text-[13px] font-semibold text-[#64635f] transition-colors hover:text-[#191919]" data-testid="link-experience">Experience</a>
            <a href="#contact" className="text-[13px] font-semibold text-[#64635f] transition-colors hover:text-[#191919]" data-testid="link-contact">Contact</a>
          </div>
        </div>
      </nav>
      <main className="w-full overflow-hidden">
        <section className="mx-auto flex max-w-[1240px] flex-col items-start gap-10 px-5 pb-20 pt-32 sm:px-8 md:flex-row md:items-center md:gap-20 md:pb-28 md:pt-44">
          <div className="reveal-up mx-auto aspect-square w-[min(68vw,340px)] shrink-0 md:ml-7 md:mr-0 md:w-[350px]">
            <div className="h-full w-full rotate-[-6deg] overflow-hidden bg-[#dedbd1] shadow-[0_24px_60px_rgba(37,36,32,.17)] transition-transform duration-700 hover:rotate-0">
              <img src={heroPortrait} alt="Portrait of Zulhaydar Fathurrahman Sidiq" className="h-full w-full object-cover object-[center_70%]" />
            </div>
          </div>
          <div className="reveal-up reveal-delay-1 flex max-w-[700px] flex-col gap-7">
            <p className="font-mono text-[11px] uppercase tracking-[.16em] text-[#275bd7]">End-to-end multimedia production · concept to final cut</p>
            <h1 className="max-w-[760px] text-[clamp(2.8rem,6.4vw,5.6rem)] font-medium leading-[.96] tracking-[-.075em]">Hi! I’m Zulhaydar Fathurrahman Sidiq</h1>
            <div className="space-y-3 text-[18px] font-semibold leading-[1.55] tracking-[-.035em] sm:text-[21px] md:text-[23px]">
              <p>Bridging the gap between a great idea and a stunning final cut.</p>
              <p className="text-[15px] font-medium leading-relaxed tracking-[-.02em] text-[#77756f] sm:text-[17px]">Specializing in end-to-end multimedia production. Managing every stage of the creative process, from initial planning and on location execution to final editing. My goal is to transform ideas into compelling visual stories that capture attention and connect with the right audience.</p>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#275bd7] px-6 py-3 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#275bd7] focus-visible:ring-offset-2" data-testid="link-contact-me">Contact Me <ArrowUpRight size={15} aria-hidden="true" /></a>
              <a href="#work" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#191919]/20 px-6 py-3 text-[13px] font-bold transition-colors hover:border-[#275bd7] hover:text-[#275bd7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#275bd7] focus-visible:ring-offset-2" data-testid="link-view-work">View my work <ArrowDown size={14} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pb-28 sm:px-8 md:pb-40">
          <div className="reveal-up mb-16 flex flex-col items-center gap-5 text-center md:mb-24">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#77756f]">A few things I’ve helped bring to life</p>
            <h2 className="text-[clamp(3.7rem,10.2vw,8rem)] font-medium leading-[.85] tracking-[-.085em]">Selected work<span className="text-[#275bd7]">.</span></h2>
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[.14em] text-[#99968e]">Scroll to explore</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            <div className="reveal-up aspect-video overflow-hidden bg-[#ddd8ce]">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/PXa_lSYQnwk?si=odDy6LC_DYXzh649"
                title="YouTube video player"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="reveal-up aspect-video overflow-hidden bg-[#ddd8ce]">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/_xv8NUdUGS4?si=NLnlLp7KWrcrMzt0"
                title="YouTube video player"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="reveal-up aspect-video overflow-hidden bg-[#ddd8ce]">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/tAHINx4N1ic?si=RdeTcGF20k8RQYbW"
                title="YouTube video player"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
          <div className="reveal-up mb-16 md:mb-24">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[.18em] text-[#77756f]">ABOUT</p>
            <h2 className="text-[clamp(2.75rem,7vw,4rem)] font-semibold leading-[.95] tracking-[-.075em]">Zulhaydar Fathurrahman Sidiq</h2>
          </div>
          <div className="reveal-up mb-24 grid gap-10 md:mb-32 md:grid-cols-[.8fr_1.4fr] md:gap-20">
            <h3 className="max-w-[400px] text-[27px] font-semibold leading-[1.18] tracking-[-.055em] sm:text-[32px]">Good design makes the hard things feel obvious.</h3>
            <div className="space-y-5 text-[16px] leading-[1.85] text-[#55534e] sm:space-y-6 sm:text-[18px]">
              <p>Creative Production Specialist with a storytelling driven approach to media production, Information Technology, and organizational communication. Contributed to digital engagement through Instagram and TikTok content for BBPBAT (@bbpbat.official), generating over 10,000 views.</p>
              <p>Skilled in creative production, digital content management, graphic design, publication, and video editing using CapCut and Adobe Premiere Pro. Proficient in OBS Studio for live streaming and Canon/Sony mirrorless cameras, with expertise in photography and event documentation.</p>
              <p>Combines creative storytelling, technical skills, strategic communication, coordination, and administrative capabilities to support creative projects and operational needs. Passionate about turning ideas into engaging visual stories while maintaining quality, consistency, and purpose throughout the creative process.</p>
            </div>
          </div>

          <section id="experience" aria-labelledby="experience-heading" className="reveal-up scroll-mt-24 space-y-10 md:space-y-12">
            <h2 id="experience-heading" className="text-[clamp(2.4rem,5vw,3.5rem)] font-medium leading-[.95] tracking-[-.075em]">Experience<span className="text-[#275bd7]">.</span></h2>
            <ol className="relative ml-1 border-l border-[#191919]/15">
              <li className="relative pb-12 pl-7 sm:pl-9 md:pb-14">
                <span aria-hidden="true" className="absolute -left-[6px] top-[5px] h-3 w-3 rounded-full border border-[#191919] bg-[#191919]" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-bold leading-snug tracking-[-.045em] sm:text-[21px]">Photo &amp; Video Editor</h3>
                    <p className="mt-1 text-[14px] text-[#77756f]">Balai Besar Perikanan Budidaya Air Tawar Sukabumi</p>
                  </div>
                  <p className="shrink-0 font-mono text-[12px] leading-relaxed text-[#89877f] sm:pt-1 sm:text-right sm:text-[13px]">November 2025 – May 2026</p>
                </div>
                <ul className="mt-5 max-w-[850px] list-disc space-y-2 pl-4 text-[14px] leading-[1.75] text-[#65635d] marker:text-[#c8c5bc] sm:text-[15px]">
                  <li>Produced and edited educational content showcasing various cultured freshwater fish species to highlight the institution’s aquaculture programs across social media platforms.</li>
                  <li>Documented a cross-island fish distribution program and produced short-form videos for Instagram (@bbpbat.official) and TikTok, generating over 10,000 views.</li>
                  <li>Facilitated transparent external communication regarding aquaculture services and commercial fish distribution, ensuring public information was clear, accessible, and easy to understand for community members and prospective buyers.</li>
                  <li>Collaborated with internal departments to translate operational governance and public service procedures into clear and effective digital communication strategies, strengthening public awareness, information delivery, and audience engagement.</li>
                  <li>Managed stakeholder engagement through social media channels, educating the public about aquaculture programs and commercial procedures while maintaining 95% positive public sentiment.</li>
                  <li>Directed and edited documentation of weekly morning assemblies and institutional activities, ensuring 100% on-time content updates to support public relations and information transparency.</li>
                </ul>
              </li>
              <li className="relative pb-12 pl-7 sm:pl-9 md:pb-14">
                <span aria-hidden="true" className="absolute -left-[6px] top-[5px] h-3 w-3 rounded-full border border-[#c9c6be] bg-[#f7f5ef]" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-bold leading-snug tracking-[-.045em] sm:text-[21px]">AI Assisted Creative Production</h3>
                    <p className="mt-1 text-[14px] text-[#77756f]">PT Presentologics</p>
                  </div>
                  <p className="shrink-0 font-mono text-[12px] leading-relaxed text-[#89877f] sm:pt-1 sm:text-right sm:text-[13px]">December 2024 – April 2025</p>
                </div>
                <ul className="mt-5 max-w-[850px] list-disc space-y-2 pl-4 text-[14px] leading-[1.75] text-[#65635d] marker:text-[#c8c5bc] sm:text-[15px]">
                  <li>Produced and edited video content using AI-powered tools to enhance visual storytelling, streamline editing workflows, and improve overall content quality.</li>
                  <li>Designed website layouts, landing pages, and user interface concepts using AI-assisted web design tools to transform creative ideas into engaging digital experiences.</li>
                  <li>Integrated AI tools into video production and web design workflows to support creative ideation, visual development, and efficient content creation.</li>
                  <li>Refined video assets and website designs to maintain visual consistency, usability, and alignment with project objectives.</li>
                  <li>Used AI prompting techniques to generate visual assets, explore design variations, and develop creative concepts for video production and website design.</li>
                </ul>
              </li>
              <li className="relative pb-12 pl-7 sm:pl-9 md:pb-14">
                <span aria-hidden="true" className="absolute -left-[6px] top-[5px] h-3 w-3 rounded-full border border-[#c9c6be] bg-[#f7f5ef]" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-bold leading-snug tracking-[-.045em] sm:text-[21px]">UI/UX Design And Development</h3>
                    <p className="mt-1 text-[14px] text-[#77756f]">Learning X</p>
                  </div>
                  <p className="shrink-0 font-mono text-[12px] leading-relaxed text-[#89877f] sm:pt-1 sm:text-right sm:text-[13px]">February 2024 – August 2024</p>
                </div>
                <ul className="mt-5 max-w-[850px] list-disc space-y-2 pl-4 text-[14px] leading-[1.75] text-[#65635d] marker:text-[#c8c5bc] sm:text-[15px]">
                  <li>Created user interface designs and interactive prototypes using Figma to develop intuitive and user-friendly digital experiences.</li>
                  <li>Developed wireframes, user flows, and website layouts in Figma to improve navigation, usability, and content organization.</li>
                  <li>Designed responsive website mockups for desktop and mobile devices, ensuring visual consistency across different screen sizes.</li>
                  <li>Applied UI/UX design principles, including typography, color theory, spacing, and visual hierarchy, to enhance the overall user experience.</li>
                  <li>Organized reusable design components and maintained consistent design systems in Figma to support efficient design iterations and collaboration.</li>
                  <li>Refined page layouts and interactive elements to create a consistent user experience across book discovery, search results, and resource detail pages.</li>
                  <li>Reviewed design flows and interactive prototypes to identify usability issues and refine user journeys before implementation.</li>
                  <li>Designed clear interaction states for buttons, search filters, forms, and navigation elements to improve interface clarity and user engagement.</li>
                </ul>
              </li>
              <li className="relative pb-2 pl-7 sm:pl-9">
                <span aria-hidden="true" className="absolute -left-[6px] top-[5px] h-3 w-3 rounded-full border border-[#c9c6be] bg-[#f7f5ef]" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-bold leading-snug tracking-[-.045em] sm:text-[21px]">Digital Library Experience Design</h3>
                    <p className="mt-1 text-[14px] text-[#77756f]">PT Global Investment Insititusi</p>
                  </div>
                  <p className="shrink-0 font-mono text-[12px] leading-relaxed text-[#89877f] sm:pt-1 sm:text-right sm:text-[13px]">August 2023 – December 2023</p>
                </div>
                <ul className="mt-5 max-w-[850px] list-disc space-y-2 pl-4 text-[14px] leading-[1.75] text-[#65635d] marker:text-[#c8c5bc] sm:text-[15px]">
                  <li>Developed and enhanced web applications using React.js and Tailwind CSS to present and organize digital content while improving overall workflow efficiency.</li>
                  <li>Designed responsive and user-friendly interfaces to improve data presentation, information accessibility, and navigation across multiple devices.</li>
                  <li>Structured and organized digital information into well-designed web interfaces to improve content discoverability and provide a seamless user experience.</li>
                  <li>Leveraged AI-assisted tools to support code writing, debugging, problem-solving, and feature development, while reviewing the results to ensure application quality and functionality.</li>
                  <li>Conducted website testing and feature refinement to identify bugs, improve usability, and ensure application functionality met project requirements.</li>
                  <li>Enhanced digital experiences by developing reusable website components, maintaining UI consistency, and implementing effective front-end development practices.</li>
                  <li>Implemented interactive website features and refined user flows to make digital content easier to explore, access, and navigate across the platform.</li>
                </ul>
              </li>
            </ol>
          </section>
        </section>
      </main>
      <footer id="contact" className="mt-12 border-t border-[#191919]/15">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center px-5 py-24 text-center sm:px-8 md:py-32">
          <p className="reveal-up mb-6 font-mono text-[10px] uppercase tracking-[.18em] text-[#77756f]">Good work starts with a conversation</p>
          <h2 className="reveal-up max-w-[900px] text-[clamp(3.5rem,9vw,7rem)] font-medium leading-[.9] tracking-[-.08em]">Have a good one<br className="hidden sm:block" /> in mind<span className="text-[#275bd7]">?</span></h2>
          <a href="https://wa.link/6dipv7" target="_blank" rel="noopener noreferrer" className="reveal-up reveal-delay-1 mt-10 inline-flex items-center gap-3 rounded-full bg-[#191919] px-7 py-4 text-[14px] font-bold text-white transition-transform hover:scale-[1.04] active:scale-[.97] sm:px-8 sm:py-[18px] sm:text-[16px]" aria-label="Message me on WhatsApp" data-testid="link-whatsapp-footer">
            <FaWhatsapp size={18} aria-hidden="true" />
            <span>WhatsApp Me</span>
          </a>
          <div className="mt-24 flex w-full justify-center border-t border-[#191919]/10 pt-6 text-[11px] font-semibold text-[#66645e]">
            <a href="https://www.linkedin.com/in/zulhaydar" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#275bd7]" data-testid="link-linkedin">LINKEDIN <ArrowUpRight className="ml-1 inline" size={11} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
