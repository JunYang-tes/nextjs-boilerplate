import Image from "next/image";

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

export default function Home() {
  const navLinks = ["集团首页", "集团概况", "集团产业", "集团新闻", "人才招聘", "集团党建", "联系我们"];
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
    { title: "NEW ENERGY", imgSrc: "/image_9.png" },
    { title: "AGRICULTURE", imgSrc: "/image_8.png" },
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
          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <a key={link} href="#" className="hover:text-cyan-400 transition-colors duration-300">{link}</a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <Image src="/image_3.png" alt="Company Building" layout="fill" objectFit="cover" className="opacity-40" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-fade-in-down">叁才通成科技集团</h1>
          <p className="text-xl md:text-2xl text-gray-300 animate-fade-in-up">SAN CAI TONG CHENG KE JI JI TUAN</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-right">
            <h2 className="text-4xl font-bold mb-6 text-cyan-400">集团介绍</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              自2022年8月荣耀启航，是由多位跨界实战型企业家共同铸就的智慧结晶。集团以深邃的前瞻性国际视野为舵，精准布局城市核心战略，致力于在内容分发网络服务、教育创新、现代农业、新能源科技等前沿领域深耕細作，引领行业变革，共绘未来蓝图。
            </p>
            <p className="text-gray-300 leading-relaxed">
              集团汇聚八方英才，整合全球优势资源，构建起一个集技术创新、产业融合、市场拓展于一体的强大生态系统，引领全国乃至全球数字化经济浪潮，开启新纪元的辉煌篇章。
            </p>
          </div>
          <div className="animate-fade-in-left">
            <Image src="/image_2.png" alt="About us" width={600} height={400} className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-black bg-opacity-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">Group Honor</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">集团产业</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {industries.map(industry => <IndustryCard key={industry.title} {...industry} />)}
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-black bg-opacity-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">新闻资讯</h2>
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden md:flex">
            <div className="md:w-1/2">
              <Image src="/image_7.png" alt="News" width={600} height={400} className="object-cover w-full h-full" />
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">『星链智运』新能源重卡项目评审会在成都召开</h3>
              <p className="text-gray-400 mb-6">叁才通成科技将启绿色矿运新征程</p>
              <a href="#" className="text-cyan-400 hover:underline self-start">了解更多 →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">联系我们</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {qrcodes.map(qr => (
              <div key={qr.title} className="flex flex-col items-center">
                <Image src={qr.imgSrc} alt={qr.title} width={150} height={150} className="rounded-lg mb-4" />
                <p>{qr.title}</p>
              </div>
            ))}
          </div>
          <p className="mb-2">联系电话：400-618-0098</p>
          <p>公司地址：成都市武侯区新园大道11号 叁才通成科技集团</p>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p>&copy; 2025 叁才通成科技集团. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
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

