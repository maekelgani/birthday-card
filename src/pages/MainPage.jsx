import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import TimelineItem from '../components/TimelineItem';
import CurvedCarousel from '../components/CurvedCarousel';
import ManifestoTicker from '../components/ManifestoTicker';
import MiniGallery from '../components/MiniGallery';
import GlobalBackground from '../components/GlobalBackground';
import BlurReveal from '../components/BlurReveal';
import ScrollProgress from '../components/ScrollProgress';
import MemoryBubbles from '../components/MemoryBubbles';
import HangingProfile from '../components/HangingProfile';
import HorizontalGallery from '../components/HorizontalGallery';
import Preloader from '../components/Preloader';
import FinaleCanvas from '../components/FinaleCanvas';
import BirthdayWish from '../components/BirthdayWish';
import GiftSurprise from '../components/GiftSurprise';
import WishForYou from '../components/WishForYou';

const MainPage = () => {
  const navigate = useNavigate();
  // Data dummy timeline
  const timelineData = [
    {
      year: "2023",
      title: "Kisah Bermula",
      desc: "Ini adalah tahun awal kita ketemu, pas akhir perjalanan perpisahan di rumah makan. Aku bahkan ga ingat kita ketemu di situ, tapi kamu ingat dan malah nyariin aku awkaokw. Ga kepikiran sih pulang dari Jogja malah kecantolan. Kita kenalan, jalan bareng, dan awalnya ga kepikiran buat serius. Tapi ya, rasa nyaman emang ga bisa bohong."
    },
    {
      year: "2024",
      title: "Perjalanan",
      desc: "Satu tahun jalanin kehidupan sama kamu, dan ini kali pertama buat aku bisa sampai sejauh ini. Kamu ngenalin dunia kamu, aku juga ngenalin minat aku, kita jadi makin saling kenal. Masalah dan kesalahpahaman pasti muncul, tapi kamu, aku, kita.. masih terus jalan bareng dan ga menyerah yaa."
    },
    {
      year: "2025",
      title: "Ujian Waktu",
      desc: "Dua tahun sudah berjalan. Makasih ya udah kuat bertahan di hubungan yang ombaknya lumayan tinggi. Mungkin tahun ini aku sering bikin kamu marah, kesel, dan khawatir (walau tiap hari suka bikin kamu marah). Tapi kamu tetep sayang dan setia nemenin aku pas lagi sakit, dirawat, sampai pemulihan—terima kasih banyak. Aku seneng banget kita bisa coba banyak hal baru, jalan-jalan ke museum, dan datang ke tempat yang belum pernah kita cobain. Seru yaaa!"
    },
    {
      year: "2026",
      title: "Hari Ini..",
      desc: "Awal tahun ini kayaknya kita sempat marahan yaa, aku tida ingat  x. Tapi yang penting intinya, 3 tahun sudah berjalan dan perjalanan kita masih terus berlanjut. Buat kamu, selalu bertahan dan bareng-bareng terus yaa. Tahun ini belum selesai, dan tahun depan masih ada. Masih banyak tempat yang belum kita kunjungi dan rencana yang belum kita selesain."
    }
  ];
  const [isFinaleVisible, setIsFinaleVisible] = useState(false);

  return (
    <div className="w-full min-h-screen relative text-[#112D4E] bg-transparent">
      {/* Layar Loading yang akan muncul pertama kali sebelum memudar/bergeser */}
      <Preloader />

      <ScrollProgress />
      <GlobalBackground />

      {/* Hero Section Kintaro Style (Sticky & Blur Transition on Scroll) */}
      <Hero />

      {/* Solid Background Content Container */}
      {/* Container ini memiliki z-index lebih tinggi dari Hero dan memiliki latar solid, 
          sehingga saat di-scroll, container ini akan meluncur naik menutupi Hero yang diam memburam */}
      <div className="relative z-20 bg-[#FFFFFF] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] pb-10">

        {/* Manifesto Ticker Section */}
        <BlurReveal delay={100}>
          <ManifestoTicker />
        </BlurReveal>

        {/* Cardless Roadmap Section */}
        <section className="max-w-6xl mx-auto px-4 relative py-20 md:py-32">
          <BlurReveal>
            <div className="text-center mb-20 md:mb-32">
              <h2 className="font-sans text-4xl md:text-5xl font-extrabold text-[#112D4E] tracking-tight">Jejak Langkah</h2>
            </div>
          </BlurReveal>

          {/* Garis vertikal biru tipis */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#3F72AF]/30 to-transparent transform md:-translate-x-1/2"></div>

          <div className="space-y-4">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} year={item.year} title={item.title} description={item.desc} isLeft={index % 2 === 0} />
            ))}
          </div>
        </section>

        {/* Horizontal Carousel (former CurvedCarousel) */}
        <BlurReveal delay={200}>
          <CurvedCarousel />
        </BlurReveal>

        {/* Mini Gallery Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 md:py-32 flex flex-col items-center">
          <BlurReveal>
            <div className="text-center mb-16 w-full">
              <h2 className="font-sans text-4xl md:text-5xl font-extrabold text-[#112D4E] tracking-tight">Sekilas Kenangan</h2>
            </div>
          </BlurReveal>
          <BlurReveal delay={150} className="w-full">
            <MiniGallery />
          </BlurReveal>

          {/* Tombol Lihat Galeri Kenangan */}
          <BlurReveal delay={300} className="mt-8">
            <button
              onClick={() => navigate('/gallery')}
              className="px-8 py-4 bg-[#3F72AF] text-[#FFFFFF] rounded-full font-sans font-semibold tracking-wide hover:bg-[#112D4E] hover:scale-105 transition-all duration-300 shadow-xl shadow-[#3F72AF]/30"
            >
              Lihat Galeri Kenangan
            </button>
          </BlurReveal>
        </section>

        {/* Manifesto Ticker Section */}
        <BlurReveal delay={100}>
          <div className="mt-20 mb-32">
            <ManifestoTicker />
          </div>
        </BlurReveal>

        {/* Hanging Profile & About Text Section */}
        <section className="w-full relative py-20 max-w-7xl mx-auto px-6 mb-20">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-16 md:gap-24">
            {/* Kiri: Hanging Profile (Diadaptasi menyerupai desain ABOUT Kintaro) */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <BlurReveal>
                <div className="text-center mb-2">
                  <span className="text-[#112D4E]/50 font-mono text-xs font-bold tracking-widest">[07-07-23]</span>
                  <h3 className="text-[#112D4E] font-sans font-black tracking-widest text-3xl md:text-4xl uppercase mt-2">TENTANG</h3>
                </div>
              </BlurReveal>
              <BlurReveal delay={150}>
                {/* Komponen Profile Bandul */}
                <HangingProfile />
              </BlurReveal>
            </div>

            {/* Kanan: Teks Subjudul & Deskripsi */}
            <div className="w-full md:w-2/3 pt-4 md:pt-16">
              <BlurReveal delay={200}>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans text-[#112D4E] font-light leading-[1.1] mb-10 tracking-tight">
                  Sebuah cerita yang tumbuh melalui <span className="italic font-serif text-[#3F72AF]">pertemuan singkat</span> dan mengubah sebuah cerita <span className="font-bold">menjadi terasa nyata.</span>
                </h2>
              </BlurReveal>
              <BlurReveal delay={300}>
                <p className="text-sm md:text-base text-[#112D4E]/70 font-sans leading-relaxed max-w-xl mb-12">
                  Ini tentang Gani dan Nisa, cuman ringkasan diri dari "siapa itu Maekel dan Anissya. Kalo pengen tahu lebih lanjut tentang mereka silahkan dibuka yaaaa!!! lovee"
                </p>

                <div onClick={() => navigate('/about')} className="flex items-center gap-2 border-b border-[#112D4E]/30 pb-2 w-fit cursor-pointer group hover:border-[#3F72AF] transition-colors duration-300">
                  <span className="text-[#112D4E] font-semibold text-sm group-hover:text-[#3F72AF] transition-colors">Baca Kisah Lengkap</span>
                  <span className="text-[#112D4E] group-hover:text-[#3F72AF] group-hover:translate-x-2 transition-all duration-300">→</span>
                </div>
              </BlurReveal>
            </div>
          </div>
        </section>

        {/* Interactive Horizontal Gallery (Insta-Style) */}
        <HorizontalGallery />

        {/* Birthday Wish Section */}
        <BirthdayWish />

        {/* Gift Surprise Section (Illusion of Choice) */}
        <GiftSurprise />

        {/* Premium Dark Glassmorphism Wish Section */}
        <WishForYou />

        {/* Memory Bubbles Section */}
        <section className="w-full relative py-20 md:py-32">
          <BlurReveal>
            <MemoryBubbles onFinale={() => setIsFinaleVisible(true)} />
          </BlurReveal>
        </section>

      </div>

      {/* Lapisan Hitam Grand Finale */}
      <FinaleCanvas isVisible={isFinaleVisible} />
    </div>
  );
};

export default MainPage;
