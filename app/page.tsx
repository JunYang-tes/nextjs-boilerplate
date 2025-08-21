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
        setInView(entry.isIntersecting);
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

  // When out of view, element is transparent. When in view, the animation class is added.
  // The animation keyframes handle the transition from opacity 0 to 1.
  return (
    <div ref={ref} className={inView ? `${animationClass} ${delay || ''}` : 'opacity-0'}>
      {children}
    </div>
  );
};


// Helper component for stats
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center transform hover:scale-110 transition-transform duration-300">
    <p className="text-4xl font-bold text-cyan-400">{value}</p>
    <p className="text-lg text-gray-300">{label}</p>
  </div>
);

// Helper component for industry cards
const IndustryCard = ({ imgSrc, title }: { imgSrc: string; title: string }) => (
  <div className="relative overflow-hidden rounded-lg group transform hover:-translate-y-2 transition-transform duration-300">
    <Image src={imgSrc} alt={title} width={400} height={300} className="object-cover w-full h-full" />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
  </div>
);

// Helper component for honor cards
const HonorCard = ({ imgSrc, title }: { imgSrc: string; title: string }) => (
    <div className="flex flex-col items-center">
        <Image src={imgSrc} alt={title} width={200} height={280} className="rounded-lg mb-4 object-contain" />
        <p>{title}</p>
    </div>
);

const ScrollIndicator = () => (
  <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
    <div className="animate-bounce bg-white/20 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </div>
);

export default function Home() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      setIsAtBottom(atBottom);
    };

    window.addEventListener('scroll', handleScroll);
    // Check on mount as well in case the page isn't scrollable initially
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: "集团首页", href: "#" },
    {
      title: "集团概况",
      href: "#",
      submenu: [
        { title: "集团介绍", href: "#" },
        { title: "荣誉资质", href: "#" },
        { title: "组织架构", href: "#" },
        { title: "发展历程", href: "#" },
      ]
    },
    {
      title: "集团产业",
      href: "#",
      submenu: [
        { title: "蚂蚁云科", href: "#" },
        { title: "叁才教育", href: "#" },
        { title: "叁才农业", href: "#" },
        { title: "叁才融媒", href: "#" },
        { title: "星链智运", href: "#" },
      ]
    },
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
    { title: "TECHNOLOGY", imgSrc: "/image_4.png" },
    { title: "EDUCATION", imgSrc: "/image_5.png" },
    { title: "MEDIA COLLECTION", imgSrc: "/image_6.png" },
    { title: "NEW ENERGY", imgSrc: "/image_1.png" },
    { title: "AGRICULTURE", imgSrc: "/image_8.png" },
  ];
  const honors = [
      { title: "CDN经营许可证", imgSrc: "/image_9.png" },
      { title: "高新技术企业", imgSrc: "/image_9.png" },
      { title: "专精特新企业", imgSrc: "/image_9.png" },
      { title: "增值电信业务经营许可证", imgSrc: "/image_9.png" },
      { title: "CMMI3级国际认证", imgSrc: "/image_9.png" },
      { title: "ISO9001质量管理体系认证", imgSrc: "/image_9.png" },
  ];
  const history = [
      { year: "2013", description: "公司成立，进入IDC行业，实现A轮融资，发布第一代CDN产品。" },
      { year: "2015", description: "拓展云计算业务，与多家公有云厂商达成战略合作。" },
      { year: "2018", description: "布局边缘计算，推出边缘计算节点及解决方案。" },
      { year: "2021", description: "深耕教育、农业、融媒等行业，提供数字化转型方案。" },
      { year: "2023", description: "集团成立，整合资源，开启多元化发展新篇章。" },
  ];
  const qrcodes = [
    { title: "企业官网", imgSrc: "/image_10.png" },
    { title: "微信公众号", imgSrc: "/image_11.png" },
    { title: "视频号", imgSrc: "/image_12.png" },
  ];

  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-30 backdrop-blur-lg">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-cyan-400">
            <Image src="/image_1.png" alt="Logo" width={150} height={40} />
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map(link => (
              <div key={link.title} className="relative group">
                <a href={link.href} className="hover:text-cyan-400 transition-colors duration-300 flex items-center">
                  {link.title}
                  {link.submenu && (
                    <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  )}
                </a>
                {link.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {link.submenu.map(sublink => (
                      <a key={sublink.title} href={sublink.href} className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-500 hover:text-white transition-colors duration-200">{sublink.title}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="/building.webp" alt="Company Building" layout="fill" objectFit="cover" className="opacity-40 animate-zoom-in" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-fade-in-down">叁才通成</h1>
          <p className="text-xl md:text-2xl text-gray-300 animate-fade-in-up delay-500">SANCAITONGCHENG</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 container mx-auto px-6">
        <AnimateOnScroll animationClass="animate-slide-in-up">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-cyan-400">集团简介</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                自2022年8月荣耀启航，是由多位跨界实战型企业家共同铸就的智慧结晶。集团以深邃的前瞻性国际视野为舵，精准布局城市核心战略，致力于在内容分发网络服务、教育创新、现代农业、新能源科技等前沿领域深耕細作，引领行业变革，共绘未来蓝图。
              </p>
              <p className="text-gray-300 leading-relaxed">
                集团汇聚八方英才，整合全球优势资源，构建起一个集技术创新、产业融合、市场拓展于一体的强大生态系统，引领全国乃至全球数字化经济浪潮，开启新纪元的辉煌篇章。
              </p>
            </div>
            <div>
              <Image src="/sancai.webp" alt="About us" width={600} height={400} className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </AnimateOnScroll>
      </section>
      
      {/* SANCAI Section */}
      <section className="py-20 bg-black bg-opacity-20">
        <div className="container mx-auto px-6 text-center">
          <AnimateOnScroll animationClass="animate-fade-in-down">
            <h2 className="text-8xl font-bold text-white tracking-widest">SANCAI</h2>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black bg-opacity-20">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animationClass="animate-fade-in-down">
            <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">数字叁才</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimateOnScroll key={stat.label} animationClass="animate-zoom-in" delay={`delay-${(index + 1) * 100}`}>
                <StatCard {...stat} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 container mx-auto px-6">
        <AnimateOnScroll animationClass="animate-fade-in-down">
          <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">集团产业</h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {industries.map((industry, index) => (
            <AnimateOnScroll key={industry.title} animationClass="animate-slide-in-up" delay={`delay-${(index + 1) * 100}`}>
              <IndustryCard {...industry} />
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* Corporate Honors Section */}
      <section className="py-20 bg-black bg-opacity-20">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animationClass="animate-fade-in-down">
            <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">企业荣誉</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {honors.map((honor, index) => (
              <AnimateOnScroll key={honor.title} animationClass="animate-zoom-in" delay={`delay-${(index + 1) * 100}`}>
                <HonorCard {...honor} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Development History Section */}
      <section className="py-20 container mx-auto px-6">
        <AnimateOnScroll animationClass="animate-fade-in-down">
          <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">发展历程</h2>
        </AnimateOnScroll>
        <div className="relative">
          <div className="border-l-2 border-cyan-400 absolute h-full top-0 left-1/2 -translate-x-1/2"></div>
          {history.map((item, index) => (
            <div key={item.year} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-cyan-400 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
              </div>
              <div className={`order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <p className="text-cyan-400 text-xl font-bold">{item.year}</p>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12">
        <AnimateOnScroll animationClass="animate-slide-in-up">
          <div className="container mx-auto px-6 text-center text-gray-400">
            <h2 className="text-3xl font-bold mb-8 text-cyan-400">联系我们</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {qrcodes.map((qr, index) => (
                <AnimateOnScroll key={qr.title} animationClass="animate-zoom-in" delay={`delay-${(index + 1) * 200}`}>
                  <div className="flex flex-col items-center">
                    <Image src={qr.imgSrc} alt={qr.title} width={150} height={150} className="rounded-lg mb-4" />
                    <p>{qr.title}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <p className="mb-2">联系电话：400-618-0098</p>
            <p>公司地址：成都市武侯区新园大道11号 叁才通成科技集团</p>
            <div className="mt-8 border-t border-gray-800 pt-8">
              <p>&copy; 2025 叁才通成科技集团. All Rights Reserved.</p>
            </div>
          </div>
        </AnimateOnScroll>
      </footer>

      {!isAtBottom && <ScrollIndicator />}
    </div>
  );
}

// Basic CSS for animations (add to globals.css for better practice)
/*
@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-right {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fade-in-left {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-down { animation: fade-in-down 1s ease-out forwards; }
.animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
.animate-fade-in-right { animation: fade-in-right 1s ease-out forwards; }
.animate-fade-in-left { animation: fade-in-left 1s ease-out forwards; }
*/