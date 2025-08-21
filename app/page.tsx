"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from 'react';

// Helper component to trigger animations on scroll
const AnimateOnScroll = ({ children, animationClass, delay, threshold = 0.1 }: { children: React.ReactNode; animationClass: string; delay?: string; threshold?: number }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return (
    <div ref={ref} className={inView ? `${animationClass} ${delay || ''}` : 'opacity-0'}>
      {children}
    </div>
  );
};

const ScrollIndicator = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      setIsAtBottom(atBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAtBottom) {
    return null;
  }

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="animate-bounce bg-white/20 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 text-gray-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

const AnimatedNumber = ({ target }: { target: number }) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const value = Math.floor(progress * target);
            setCurrent(value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [target]);

  return <span ref={ref}>{current}</span>;
};

const StatCard = ({ value, label }: { value: string; label: string }) => {
  const number = parseInt(value.replace('+', ''));
  return (
    <div className="text-center">
      <div className="relative inline-block">
        <p className="text-7xl font-extrabold text-blue-800 pr-4">
          <AnimatedNumber target={number} />
        </p>
        <span className="absolute bottom-1 right-0 text-3xl font-bold text-blue-800">+</span>
      </div>
      <p className="text-xl mt-2 text-gray-700">{label}</p>
    </div>
  );
};

const IndustrySection = ({ year, title, description, imgSrc, reverse = false }: { year: string; title: string; description: string; imgSrc: string; reverse?: boolean }) => (
  <div className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="md:w-1/2">
      <p className="text-6xl font-bold text-gray-200">{year}</p>
      <h3 className="text-2xl font-bold mt-4">{title}</h3>
      <p className="mt-4 text-gray-600">{description}</p>
    </div>
    <div className="md:w-1/2">
      <Image src={imgSrc} alt={title} width={500} height={350} className="rounded-lg shadow-2xl object-cover"/>
    </div>
  </div>
);

export default function Home() {
  const navLinks = [
    { title: "集团首页", href: "#" },
    { title: "集团概况", href: "#" },
    { title: "集团产业", href: "#" },
    { title: "集团新闻", href: "#" },
    { title: "人才招聘", href: "#" },
    { title: "集团党建", href: "#" },
    { title: "联系我们", href: "#" },
  ];

  const stats = [
    { value: "10+", label: "软件著作权" },
    { value: "10+", label: "发明专利" },
    { value: "1+", label: "行业一级证书" },
    { value: "10+", label: "合作客户" },
  ];

  const industries = [
    {
      year: "2013",
      title: "2013叁才教育",
      description: "整合优质教育资源，洞悉未来人才需求，采用AI大模型打造个性化教育方案，培养面向未来的复合型人才。",
      imgSrc: "/image_5.png" 
    },
  ];

  const honors = [
    "高新技术企业证书",
    "增值电信业务经营许可证",
    "CMMI3级国际认证",
    "专精特新企业",
    "ISO9001质量管理体系认证",
    "发明专利证书",
  ];
  
  const historyItems = [
    {
      year: "2013",
      title: "2013叁才农业",
      description: "整合优质教育资源，洞悉未来人才需求，采用AI大模型打造个性化教育方案，培养面向未来的复合型人才。",
      imgSrc: "/image_8.png" 
    },
  ];

  return (
    <div className="bg-white text-gray-800 font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-100/80 backdrop-blur-lg shadow-md">
        <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Image src="/image_1.png" alt="Logo" width={120} height={32} />
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map(link => (
              <a key={link.title} href={link.href} className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
                {link.title}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <Image src="/sancai.webp" alt="Hero background" layout="fill" objectFit="cover" className="z-0" />
          <div className="absolute inset-0 bg-black/30"></div> {/* Add a dark overlay for text contrast */}
          <div className="relative z-10 text-center">
            <AnimateOnScroll animationClass="animate-fade-in-down">
              <h1 className="text-6xl md:text-8xl font-extrabold text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>叁才通成</h1>
              <p className="text-2xl md:text-3xl text-white mt-2" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>SANCAITONGCHENG</p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Group Profile Section */}
        <section className="py-24 container mx-auto px-6 text-center">
          <AnimateOnScroll animationClass="animate-fade-in-up">
            <h2 className="text-4xl font-bold">集团简介</h2>
            <p className="text-lg text-gray-500 mt-2">GROUP PROFILE</p>
            <div className="max-w-4xl mx-auto">
              <p className="mt-8 text-gray-600 text-lg leading-relaxed">
                自2022年8月荣耀启航，是由多位跨界实战型企业家共同铸就的智慧结晶。集团以深邃的前瞻性国际视野为舵，精准布局城市核心战略，致力于在内容分发网络服务、教育创新、现代农业、新能源科技等前沿领域深耕細作，引领行业变革，共绘未来蓝图。
              </p>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                集团汇聚八方英才，整合全球优势资源，构建起一个集技术创新、产业融合、市场拓展于一体的强大生态系统，引领全国乃至全球数字化经济浪潮，开启新纪元的辉煌篇章。
              </p>
            </div>
          </AnimateOnScroll>
        </section>

        {/* SANCAI Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <AnimateOnScroll animationClass="animate-zoom-in">
              <h2 
                className="text-8xl md:text-9xl font-extrabold text-blue-500 tracking-widest"
                style={{ 
                  WebkitBoxReflect: 'below -15px linear-gradient(transparent, rgba(0,0,0,0.15))',
                }}
              >
                SANCAI!
              </h2>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Digital Sancai Section */}
        <section className="relative bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/building.webp')" }}>
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
          <div className="relative container mx-auto px-6 py-24">
            <div className="text-center mb-12">
              <AnimateOnScroll animationClass="animate-fade-in-down">
                <h2 className="text-4xl font-bold text-blue-800">数字叁才</h2>
                <p className="text-lg mt-2 text-blue-900">DIGITAL SANCAI</p>
              </AnimateOnScroll>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Group Industry Section */}
        <section className="py-24 container mx-auto px-6">
          <AnimateOnScroll animationClass="animate-fade-in-down" threshold={0.5}>
            <div className="text-center">
              <h2 className="text-4xl font-bold">集团产业</h2>
              <p className="text-lg text-gray-500 mt-2">GROUP INDUSTRY</p>
              <div className="inline-block w-24 h-1 bg-blue-500 mt-4"></div>
            </div>
          </AnimateOnScroll>
          <div className="mt-16 space-y-24">
            {industries.map((industry, index) => (
              <AnimateOnScroll key={index} animationClass="animate-slide-in-up" threshold={0.5}>
                <IndustrySection {...industry} />
              </AnimateOnScroll>
            ))}
          </div>
        </section>
        
        {/* Corporate Honors Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold">企业荣誉</h2>
              <p className="text-lg text-gray-500 mt-2">CORPORATE HONORS</p>
              <div className="inline-block w-24 h-1 bg-blue-500 mt-4"></div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-12 mt-16">
              <div className="md:w-1/3">
                <AnimateOnScroll animationClass="animate-fade-in-right">
                  <Image src="/honour.png" alt="Honors" width={400} height={500} className="rounded-lg shadow-2xl"/>
                </AnimateOnScroll>
              </div>
              <div className="md:w-2/3">
                <AnimateOnScroll animationClass="animate-fade-in-left">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-lg">
                    {honors.map(honor => (
                      <li key={honor} className="flex items-center">
                        <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        {honor}
                      </li>
                    ))}
                  </ul>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* Development History Section */}
        <section className="py-24 container mx-auto px-6">
          <AnimateOnScroll animationClass="animate-fade-in-down" threshold={0.5}>
            <div className="text-center">
              <h2 className="text-4xl font-bold">发展历程</h2>
              <p className="text-lg text-gray-500 mt-2">DEVELOPMENT HISTORY</p>
              <div className="inline-block w-24 h-1 bg-blue-500 mt-4"></div>
            </div>
          </AnimateOnScroll>
          <div className="mt-16 space-y-24">
            {historyItems.map((item, index) => (
              <AnimateOnScroll key={index} animationClass="animate-slide-in-up" threshold={0.5}>
                <IndustrySection {...item} reverse={index % 2 !== 0} />
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 叁才通成科技集团. All Rights Reserved.</p>
        </div>
      </footer>

      <ScrollIndicator />
    </div>
  );
}