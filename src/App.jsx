import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronRight, MapPin, Mail, Phone, ExternalLink, Globe, Smartphone, Ticket, Sparkles, Building2 } from 'lucide-react';
import ContactForm from './ContactForm';

/**
 * 共通コンポーネント: フェードインセクション
 */
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'VISION', href: '#vision' },
    { name: 'PRODUCTS', href: '#products' },
    { name: 'COMPANY', href: '#company' },
    { name: 'NEWS', href: '#news' },
    { name: 'RECRUIT', href: '#recruit' },
  ];

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="font-sans text-[#333] bg-white antialiased tracking-wide selection:bg-pink-500 selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${scrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-8'
          }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div
            className="z-50 relative cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/logo_switch_media_v2.png" alt="Switch Media" className="h-14 w-auto object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-[11px] font-bold tracking-[0.2em] hover:text-pink-400 transition-colors relative group py-2 uppercase ${scrolled ? 'text-gray-800' : 'text-white/90'
                  }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-[1px] bg-pink-500 transition-all duration-300 group-hover:w-full ${scrolled ? '' : 'bg-white'}`}></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className={`ml-8 px-8 py-3 text-[10px] font-bold tracking-[0.2em] border transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] uppercase ${scrolled
                ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                : 'border-white/50 text-white hover:bg-white hover:text-gray-900 hover:border-white'
                }`}
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 focus:outline-none p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <div className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-2xl font-bold tracking-widest text-gray-900 hover:text-pink-600 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="mt-8 px-12 py-4 border border-gray-900 text-gray-900 font-bold tracking-widest hover:bg-gray-900 hover:text-white transition-colors"
            >
              CONTACT
            </button>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section - プロダクトカンパニー仕様 */}
      <header className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-[#0a0514]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          {/* ユーザーがスマホを掲げているライブ会場や、デジタルとリアルの融合を感じさせる画像 */}
          <img
            src="/hero_idol_v2.jpg"
            alt="Idol Live Performance"
            className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          {/* ベースのオーバーレイ */}
          <div className="absolute inset-0 bg-[#0a0514]/50 mix-blend-multiply"></div>
          {/* ピンク〜紫のグラデーション */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#be185d]/20 to-transparent"></div>
          {/* 下部からのグラデーション */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center pt-20">
          <div className="max-w-[90%] md:max-w-5xl">

            {/* Tagline Area */}
            <div className="flex items-center gap-6 mb-12 animate-fade-in-up">
              <div className="w-[4px] h-[40px] bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,1)]"></div>
              <p className="text-xs md:text-sm font-bold tracking-[0.4em] text-pink-200/90 uppercase">
                Entertainment Tech Company
              </p>
            </div>

            {/* Main Title */}
            <h1 className="text-[13vw] md:text-[7.5rem] lg:text-[8.5rem] font-bold tracking-tighter leading-[0.85] text-white mb-16 font-sans mix-blend-overlay opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              UPDATE<br />
              THE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 opacity-100 mix-blend-normal filter drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]">FANDOM.</span>
            </h1>

            {/* Subtext Area */}
            <div className="flex items-start gap-8 ml-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex gap-1.5 mt-2 opacity-70">
                <div className="w-[1px] h-[60px] bg-white"></div>
                <div className="w-[1px] h-[60px] bg-white"></div>
              </div>
              <p className="text-sm md:text-base text-gray-300 tracking-[0.1em] font-light max-w-xl leading-8">
                「推し活」を、次世代のスタンダードへ。<br />
                デジタルとリアルを融合させた革新的なプラットフォームで、<br />
                ファンとアーティストの新しい絆をデザインする。
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-0 right-12 hidden md:flex flex-col items-center z-20 h-[200px]">
          <span className="text-[10px] font-bold tracking-[0.3em] text-white/60 [writing-mode:vertical-rl] mb-4 uppercase mix-blend-difference">Scroll Down</span>
          <div className="w-[1px] h-full bg-white/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/80 animate-slide-down shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
          </div>
        </div>

        <style>{`
          @keyframes slide-down {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(200%); opacity: 0; }
          }
          .animate-slide-down {
            animation: slide-down 2.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
          }
        `}</style>
      </header>

      {/* 2. Vision Section */}
      <section id="vision" className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute top-0 left-[-2%] text-[18vw] font-bold text-gray-100/50 opacity-20 pointer-events-none select-none leading-none font-sans z-0">
          VISION
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeInSection>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-16">
              <div className="md:w-1/3 pt-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-[2px] bg-pink-600"></div>
                  <span className="text-pink-600 text-xs font-bold tracking-[0.3em]">VISION</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                  INNOVATE<br />
                  THE<br />
                  FANDOM.
                </h2>
              </div>

              <div className="md:w-2/3 md:pl-12 border-l border-gray-100">
                <h3 className="text-2xl md:text-3xl font-bold leading-relaxed mb-10 text-gray-900">
                  ファンダムエコノミーを、<br />
                  OSから書き換える。
                </h3>
                <p className="text-gray-500 leading-8 mb-12 text-justify text-[15px] font-medium">
                  エンターテインメントの構造は、テクノロジーで進化する。<br className="hidden md:block" />
                  オンラインくじ、デジタルトレカ、コミュニティアプリ――。<br className="hidden md:block" />
                  私たちが開発するプロダクトは、単なるツールではありません。<br className="hidden md:block" />
                  それは、ファンとクリエイターの新しい経済圏を創り出し、<br />
                  持続可能な熱狂を生み出すためのインフラストラクチャーです。
                </p>
                <a href="#" className="inline-flex items-center text-sm font-bold tracking-[0.2em] text-gray-900 hover:text-pink-600 transition-colors group">
                  <span className="border-b border-gray-900 group-hover:border-pink-600 pb-1 transition-colors">OUR VISION</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 3. Products Section */}
      <section id="products" className="py-24 bg-[#fdf2f8] relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20 md:mb-32">
            <span className="text-pink-600 text-xs font-bold tracking-[0.2em] block mb-4">OUR PRODUCTS</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">PRODUCTS</h2>
            <p className="text-gray-400 text-xs tracking-[0.2em]">自社開発プロダクト</p>
          </div>

          <div className="space-y-24 md:space-y-40">
            {/* Product 01: Fandom App */}
            <FadeInSection>
              <div className="flex flex-col md:flex-row items-center relative group">
                <div className="w-full md:w-[65%] overflow-hidden shadow-2xl rounded-sm">
                  <div className="w-full h-[300px] md:h-[550px] overflow-hidden">
                    {/* アプリ画面のイメージ */}
                    {/* アプリ画面のイメージ */}
                    <img
                      src="/product_app_final.jpg"
                      alt="Fandom App Platform"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                </div>
                {/* Overlapping Text Box */}
                <div className="w-full md:w-[45%] bg-white p-8 md:p-14 shadow-2xl relative z-10 md:-ml-24 md:mt-24 rounded-sm border-t-4 border-pink-500">
                  <div className="absolute -top-10 left-8 md:-left-10 text-[6rem] font-bold text-pink-50 z-[-1] leading-none">01</div>
                  <div className="flex items-center mb-4">
                    <Smartphone className="w-6 h-6 text-pink-500 mr-3" />
                    <h3 className="text-3xl font-bold text-gray-900">OSHI Pick</h3>
                  </div>
                  <p className="text-xs font-bold text-gray-400 tracking-widest mb-8 uppercase">K-POP投票支援アプリ</p>

                  <p className="text-gray-600 leading-8 text-sm mb-10">
                    K-POPファン必携の投票一括管理アプリ。<br />
                    複数サイトのスケジュール管理やリマインダー通知で、大事な投票を逃しません。<br />
                    ファン同士のコミュニティ機能も搭載し、毎日の推し活を強力にサポートします。
                  </p>
                  <a href="#" className="inline-flex items-center text-xs font-bold tracking-widest text-gray-900 hover:text-pink-600 transition-colors group/link">
                    VIEW PRODUCT <div className="w-8 h-[1px] bg-gray-300 ml-4 mr-2 group-hover/link:bg-pink-600 transition-colors"></div> <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </FadeInSection>

            {/* Product 02: Coming Soon */}
            <FadeInSection>
              <div className="flex flex-col md:flex-row-reverse items-center relative group">
                <div className="w-full md:w-[65%] overflow-hidden shadow-2xl rounded-sm relative">
                  <div className="w-full h-[300px] md:h-[550px] overflow-hidden bg-gray-100 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl md:text-5xl font-bold text-gray-400/50 tracking-[0.2em] transform -rotate-12 border-4 border-gray-400/50 p-4">COMING SOON</span>
                    </div>
                  </div>
                </div>
                {/* Overlapping Text Box */}
                <div className="w-full md:w-[45%] bg-white p-8 md:p-14 shadow-2xl relative z-10 md:-mr-24 md:mt-24 rounded-sm border-t-4 border-gray-300">
                  <div className="absolute -top-10 right-8 md:-right-10 text-[6rem] font-bold text-gray-100 z-[-1] leading-none">02</div>
                  <div className="flex items-center mb-4">
                    <Sparkles className="w-6 h-6 text-gray-400 mr-3" />
                    <h3 className="text-3xl font-bold text-gray-400">COMING SOON</h3>
                  </div>
                  <p className="text-xs font-bold text-gray-400 tracking-widest mb-8 uppercase">New Project</p>

                  <p className="text-gray-500 leading-8 text-sm mb-10">
                    現在、新規サービスを計画中です。<br />
                    公開まで今しばらくお待ちください。
                  </p>
                  <div className="inline-flex items-center text-xs font-bold tracking-widest text-gray-400 cursor-not-allowed">
                    UNDER DEVELOPMENT <div className="w-8 h-[1px] bg-gray-300 ml-4 mr-2"></div>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Product 03: Coming Soon */}
            <FadeInSection>
              <div className="flex flex-col md:flex-row items-center relative group">
                <div className="w-full md:w-[65%] overflow-hidden shadow-2xl rounded-sm relative">
                  <div className="w-full h-[300px] md:h-[550px] overflow-hidden bg-gray-100 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl md:text-5xl font-bold text-gray-400/50 tracking-[0.2em] transform -rotate-12 border-4 border-gray-400/50 p-4">COMING SOON</span>
                    </div>
                  </div>
                </div>
                {/* Overlapping Text Box */}
                <div className="w-full md:w-[45%] bg-white p-8 md:p-14 shadow-2xl relative z-10 md:-ml-24 md:mt-24 rounded-sm border-t-4 border-gray-300">
                  <div className="absolute -top-10 left-8 md:-left-10 text-[6rem] font-bold text-gray-100 z-[-1] leading-none">03</div>
                  <div className="flex items-center mb-4">
                    <Sparkles className="w-6 h-6 text-gray-400 mr-3" />
                    <h3 className="text-3xl font-bold text-gray-400">COMING SOON</h3>
                  </div>
                  <p className="text-xs font-bold text-gray-400 tracking-widest mb-8 uppercase">New Project</p>

                  <p className="text-gray-500 leading-8 text-sm mb-10">
                    現在、新規サービスを計画中です。<br />
                    公開まで今しばらくお待ちください。
                  </p>
                  <div className="inline-flex items-center text-xs font-bold tracking-widest text-gray-400 cursor-not-allowed">
                    UNDER DEVELOPMENT <div className="w-8 h-[1px] bg-gray-300 ml-4 mr-2"></div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 4. Company Section */}
      <section id="company" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <FadeInSection>
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
              {/* Left Column: Title & Image */}
              <div className="lg:w-[40%]">
                <div className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">COMPANY</h2>
                  <p className="text-gray-400 text-xs tracking-[0.2em] mb-8">会社概要</p>
                  <p className="text-gray-600 text-sm leading-7">
                    「Switch Media LLC」は、<br />
                    エンターテインメントの未来を実装する<br />
                    プロダクト開発スタジオです。
                  </p>
                </div>
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden shadow-xl">
                  {/* クリエイティブでオープンなオフィス風景 */}
                  <img
                    src="/recruit_team_japanese.jpg"
                    alt="Creative Office"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              {/* Right Column: Definition List */}
              <div className="lg:w-[60%] lg:pt-8">
                <dl className="border-t border-gray-200">
                  {[
                    { label: "会社名", value: "合同会社スイッチメディア / Switch Media LLC" },
                    { label: "設立", value: "2025年 6月" },
                    { label: "代表者", value: "代表社員 馬場誠" },
                    { label: "所在地", value: "〒150-0043\n東京都渋谷区道玄坂1丁目10番8号\n渋谷道玄坂東急ビル2F−C" },
                    { label: "事業内容", value: "・ファンダム事業\n・WEBマーケティング事業\n・デジタルコンテンツの企画・販売" },
                    { label: "運営サービス", value: "「Oshi Pick」他" },
                  ].map((row, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row py-8 border-b border-gray-200 group hover:bg-pink-50 transition-colors">
                      <dt className="w-full sm:w-[30%] font-bold text-gray-900 text-sm tracking-wide mb-2 sm:mb-0 flex items-center">
                        <div className="w-1.5 h-1.5 bg-pink-600 mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {row.label}
                      </dt>
                      <dd className="w-full sm:w-[70%] text-gray-600 text-sm leading-relaxed whitespace-pre-line pl-6 sm:pl-0">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 5. News & Recruit Section */}
      <section id="news" className="py-24 bg-[#fdf2f8]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

            {/* News Area */}
            <FadeInSection>
              <div className="flex justify-between items-end mb-12 border-b border-gray-300 pb-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">NEWS</h2>
                  <p className="text-gray-400 text-xs tracking-widest mt-2">お知らせ</p>
                </div>
                <a href="#" className="text-xs font-bold tracking-widest text-gray-900 hover:text-pink-600 transition-colors flex items-center group">
                  VIEW ALL <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <ul className="space-y-0">
                {[
                  { date: "2025.06.13", cat: "INFO", title: "会社を設立しました" },
                ].map((item, i) => (
                  <li key={i} className="group border-b border-gray-200 py-6 cursor-pointer hover:bg-white transition-colors px-3 -mx-3">
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm">
                      <div className="flex items-center mb-2 sm:mb-0 sm:w-44 flex-shrink-0">
                        <span className="text-gray-400 font-mono text-xs tracking-wider mr-4">{item.date}</span>
                        <span className="text-pink-600 font-bold text-[10px] tracking-wider border border-pink-600 px-3 py-1 min-w-[70px] text-center">{item.cat}</span>
                      </div>
                      <p className="text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-1 flex-grow font-medium">{item.title}</p>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-pink-600 ml-4 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 hidden sm:block" />
                    </div>
                  </li>
                ))}
              </ul>
            </FadeInSection>

            {/* Recruit Area */}
            <FadeInSection delay={200}>
              <div id="recruit" className="h-full flex flex-col">
                <div className="flex justify-between items-end mb-12 border-b border-gray-300 pb-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">RECRUIT</h2>
                    <p className="text-gray-400 text-xs tracking-widest mt-2">採用情報</p>
                  </div>
                </div>

                <div className="relative h-full min-h-[450px] w-full group overflow-hidden bg-gray-100 rounded-sm shadow-xl">
                  {/* Asian/Japanese Business Team Image */}
                  <img
                    src="/recruit_team_japanese.jpg"
                    alt="Coming Soon"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-60 grayscale hover:grayscale-0"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="relative z-10 p-12 h-full flex flex-col justify-end text-white">
                    <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                      COMING<br />
                      SOON.<br />
                      <span className="text-gray-400 text-lg block mt-4 font-normal tracking-wider">採用情報公開準備中</span>
                    </h3>
                    <div className="w-16 h-[2px] bg-gray-500 mb-8"></div>
                    <p className="text-gray-300 text-sm mb-12 leading-relaxed max-w-sm">
                      現在、採用情報の公開に向けて準備を進めています。<br />
                      私たちと一緒に、エンターテインメントの未来を創る仲間を<br />
                      募集する予定です。今しばらくお待ちください。
                    </p>
                    <div className="inline-flex w-fit items-center border border-gray-500 px-10 py-4 text-xs font-bold tracking-[0.2em] text-gray-400 cursor-not-allowed bg-black/20">
                      PREPARING... <div className="w-8 h-[1px] bg-gray-500 ml-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeInSection>
            <div className="flex flex-col lg:flex-row gap-16">

              {/* Left Column: Info */}
              <div className="lg:w-1/3">
                <div className="mb-10 relative">
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900 inline-block relative z-10">CONTACT</h2>
                  <div className="absolute -bottom-3 left-0 w-24 h-1 bg-[#10b981]"></div>
                </div>

                <div className="text-sm leading-8 text-gray-600 font-medium mb-12">
                  案件のご相談や見積依頼などございましたら、<br />
                  フォームよりお気軽にお問い合わせください。<br />
                  2〜3営業日以内に担当者より返信いたします。
                </div>

                <div className="space-y-6 text-sm text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-[#10b981] mr-4 flex-shrink-0 mt-0.5" />
                    <span>東京都渋谷区道玄坂1丁目10番8号<br />渋谷道玄坂東急ビル2F−C</span>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 text-[#10b981] mr-4 flex-shrink-0" />
                    <span>合同会社スイッチメディア</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:w-2/3 bg-gray-50/50 p-8 md:p-12 rounded-lg">
                <ContactForm />
              </div>

            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-[#0f172a] text-gray-400 py-20 text-sm">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20">
            <div className="mb-12 md:mb-0 max-w-sm">
              <div
                className="mb-8 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <img src="/logo_switch_media.png" alt="Switch Media" className="h-12 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <address className="not-italic leading-relaxed text-gray-500 text-xs mb-8 font-medium">
                〒150-0043 東京都渋谷区道玄坂1丁目10番8号<br />
                渋谷道玄坂東急ビル2F−C
              </address>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all">
                  <span className="font-bold text-xs">X</span>
                </a>
                <a href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all">
                  <span className="font-bold text-xs">fb</span>
                </a>
                <a href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all">
                  <span className="font-bold text-xs">ig</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-16 sm:gap-32">
              <div>
                <h4 className="text-white font-bold mb-8 tracking-widest text-xs border-b border-gray-700 pb-3">CONTENT</h4>
                <ul className="space-y-5">
                  <li><a href="#vision" className="hover:text-white transition-colors text-xs tracking-wide block">Vision</a></li>
                  <li><a href="#products" className="hover:text-white transition-colors text-xs tracking-wide block">Products</a></li>
                  <li><a href="#company" className="hover:text-white transition-colors text-xs tracking-wide block">Company</a></li>
                  <li><a href="#news" className="hover:text-white transition-colors text-xs tracking-wide block">News</a></li>
                  <li><a href="#recruit" className="hover:text-white transition-colors text-xs tracking-wide block">Recruit</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-8 tracking-widest text-xs border-b border-gray-700 pb-3">SUPPORT</h4>
                <ul className="space-y-5">
                  <li><a href="#contact" className="hover:text-white transition-colors text-xs tracking-wide block">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors text-xs tracking-wide block">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors text-xs tracking-wide block">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors text-xs tracking-wide block">Sitemap</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-wider text-gray-600">
            <p>&copy; 2025 Switch Media LLC All Rights Reserved.</p>
            <p className="mt-2 md:mt-0"></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
