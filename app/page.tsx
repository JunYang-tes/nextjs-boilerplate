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

const IndustryCard = ({ year, title, description, imgSrc, reverse = false }: { year: string; title: string; description: string; imgSrc: string; reverse?: boolean }) => (
  <div className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="md:w-1/2 relative py-8">
      <div className="absolute -top-8 -left-4 text-[12rem] font-extrabold text-gray-100 z-0 leading-none select-none">
        {year}
      </div>
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
        <p className="mt-6 text-lg text-gray-700 leading-loose">{description}</p>
      </div>
    </div>
    <div className="md:w-1/2">
      <Image src={imgSrc} alt={title} width={500} height={350} className="rounded-lg shadow-2xl object-cover" />
    </div>
  </div>
);

const HistoryCard = ({
  sectionTitle,
  sectionTitleEn,
  more,
  generalText, year, eventTitle, eventDescription, eventImgSrc, reverse = false }: {
    sectionTitle: string;
    sectionTitleEn: string;
    more?: boolean
    generalText: string; year: string; eventTitle: string; eventDescription: string; eventImgSrc: string; reverse?: boolean;
  }) => (
  <div className={`flex flex-col md:flex-row  gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="md:w-1/2 relative py-8 flex-col flex gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-blue-800">{sectionTitle}</h2>
        {more &&
          <button className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:opacity-90 transition-all duration-300 text-sm">
            点击了解更多
          </button>}
      </div>
      <h2 className="text-4xl font-bold text-blue-800">{sectionTitleEn}</h2>

      <p className="relative z-10 text-gray-600 leading-relaxed">{generalText}</p>
      <div className="text-[10rem] mt-auto  font-bold text-blue-100 z-0 leading-none">{year}</div>
    </div>
    <div className="md:w-1/2">
      <div className="bg-blue-50 p-8 rounded-3xl shadow-lg border border-blue-100 relative pl-12">
        {/* Timeline line */}
        <div className="absolute top-12 bottom-8 left-8 w-0.5 bg-blue-200"></div>
        {/* Timeline circle */}
        <div className="absolute top-8 left-[26px] w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white"></div>

        <h4 className="text-4xl font-bold text-blue-300">{year}</h4>
        <p className="mt-4 text-gray-600">{eventDescription}</p>
        <div className="mt-6 relative">
          <Image src={eventImgSrc} alt={eventTitle} width={400} height={250} className="rounded-lg shadow-md object-cover w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-blue-50/50 to-transparent rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

const DetailedAxis = () => {
  const ticks = [];
  const numLargeTicks = 5;
  const numSmallTicksBetween = 8;

  for (let i = 0; i < numLargeTicks; i++) {
    ticks.push({ type: 'large' });
    if (i < numLargeTicks - 1) {
      for (let j = 0; j < numSmallTicksBetween; j++) {
        if (j === numSmallTicksBetween / 2 - 1) {
          ticks.push({ type: 'medium' });
        } else {
          ticks.push({ type: 'small' });
        }
      }
    }
  }

  return (
    <div className="bg-blue-900 p-8 w-full">
      <div className="relative h-24 flex items-end justify-between">
        <div className="absolute top-[16px] left-0 w-[22%] h-20 bg-white/30  flex items-center justify-center">
          <p className="text-white font-bold text-xl">2013参才教育</p>
        </div>
        <div className="absolute b-0 left-0 right-0 h-[2px] bg-white" />
        {ticks.map((tick, index) => {
          let height = 'h-4';
          if (tick.type === 'large') height = 'h-8';
          if (tick.type === 'medium') height = 'h-6';
          return <div key={index} className={`w-0.5 ${height} bg-white`}></div>;
        })}

      </div>
    </div>
  );
};


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
      imgSrc: "/sancai.webp"
    },
  ];

  const honorsLeft = [
    "国家高新技术企业称号",
    "CMMI5 级国际权威认证",
    "“内容分发网络管理”项目入选福建省数字经济重点工程",
    "爱心奉献奖 “爱心企业”称号",
  ];
  const honorsRight = [
    "软著证书",
    "国家认证认可证书",
    "AAA级单位证书",
    "中国3.15诚信品牌证书",
    "中国互联网行业30强企业证书",
  ];

  const historyItem = {
    sectionTitle: "发展历程",
    sectionTitleEn: "DEVELOPMENT HISTORY",
    generalText: "在时代浪潮中，叁才通成科技集团由多位跨界实战型企业家于2022年8月创立，秉持“立足当下，着眼长远”信念，凭借前瞻视野布局内容分发网络、教育创新、现代农业、新能源科技等领域。从成都起步，它快速向全国辐射，整合全球资源构建多元产业链，其发展既是企业成长史，也是与时代同频、为行业注入活力的探索之旅。让我们走进其历程，探寻成长密码与奋斗故事。",
    year: "2013",
    eventTitle: "整合优质教育资源",
    eventDescription: "涵盖多类型课程，运用AI大模型打造智能学习辅导体系，助力学子与职场人士成长突破。",
    eventImgSrc: "/sancai.webp",
  };

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
                  WebkitBoxReflect: 'below -15px linear-gradient(transparent 40%, rgba(0,0,0,0.2))',
                }}
              >
                SANCAI
              </h2>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Digital Sancai Section */}
        <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: "url('/building.webp')" }}>
          <div className="absolute inset-0 bg-blue-100/30"></div> {/* Light blue overlay */}
          <div className="relative">
            <div className="text-center mb-12">
              <AnimateOnScroll animationClass="animate-fade-in-down">
                <h2 className="text-4xl font-bold text-blue-800">数字叁才</h2>
                <p className="text-lg mt-2 text-blue-900">DIGITAL SANCAI</p>
              </AnimateOnScroll>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Group Industry Section */}
        <section className="container mx-auto px-6 py-4">
          <AnimateOnScroll animationClass="animate-slide-in-up" threshold={0.5}>
            <HistoryCard
              sectionTitle="集团产业"
              more
              sectionTitleEn="GROUP INDUSTRY"
              year={"2023"}
              eventTitle="2023"
              eventDescription={`整合优质教育资源，涵盖多类型课程，运用 AI 大模型打造
智能学习辅导体系，助力学子与职场人士成长突破。`}
              eventImgSrc="/sancai.webp"
              generalText="叁才通成作为行业内的卓越企业，构建了多元且极具影响力的业务版图，旗下五大业务板块各放异彩。"
            />
          </AnimateOnScroll>
        </section>


        {/* Detailed Axis Section */}
        <DetailedAxis />

        {/* Corporate Honors Section */}
        <section className="py-24" style={{ background: 'linear-gradient(to right, #f0f4f8, #e6e9f0)' }}>
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
              {/* Left side: Image */}
              <div className="md:w-1/2">
                <AnimateOnScroll animationClass="animate-fade-in-right">
                  <div className="text-gray-600 mb-4">荣誉资质 | CDN软著证书</div>
                  <Image src="/honour.png" alt="Honors" width={500} height={400} className="rounded-lg" />
                </AnimateOnScroll>
              </div>
              {/* Right side: Text content */}
              <div className="md:w-1/2">
                <AnimateOnScroll animationClass="animate-fade-in-left">
                  <h2 className="text-3xl font-bold text-blue-900">企业荣誉</h2>
                  <p className="text-lg text-blue-900 mt-1">CORPORATE HONORS</p>
                  <p className="mt-6 text-gray-700 leading-relaxed">
                    在参才通成的发展历程中,众多荣誉资质见证了我们的成长与奋进。这些荣誉既是过往努力的勋章,更是推动我们持续前行,为客户、社会创造更大价值的动力。
                  </p>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-gray-800">
                    <ul>
                      {honorsLeft.map((honor, index) => (
                        <li key={index} className="flex items-start mt-3">
                          <span className="text-blue-800 mr-3 font-bold text-lg">•</span>
                          <span>{honor}</span>
                        </li>
                      ))}
                    </ul>
                    <ul>
                      {honorsRight.map((honor, index) => (
                        <li key={index} className="flex items-start mt-3">
                          <span className="text-blue-800 mr-3 font-bold text-lg">•</span>
                          <span>{honor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* Development History Section */}
        <section className="py-24 container mx-auto px-6">
          <div className="mt-16">
            <AnimateOnScroll animationClass="animate-slide-in-up" threshold={0.5}>
              <HistoryCard {...historyItem} />
            </AnimateOnScroll>
          </div>
        </section>
      </main>
      <DetailedAxis />

      <ScrollIndicator />
    </div>
  );
}
