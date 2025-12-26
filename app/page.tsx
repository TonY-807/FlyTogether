"use client";

import { SearchWidget } from "@/components/search-widget";
import { DestinationCard } from "@/components/destination-card";
import { ArrowUpRight, Star, Quote } from "lucide-react";

import Link from "next/link";
import { SlidingNav } from "@/components/sliding-nav";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Placeholder */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/5 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <div className="flex-1">
            <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent w-fit">
              FlyTogether
            </div>
          </div>

          <SlidingNav />

          <div className="flex-1 flex justify-end items-center gap-4">
            <Link href="/signup" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Sign Up
            </Link>
            <Link href="/login" className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors cursor-pointer z-50">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden pt-20">
        {/* Immersive Animated Background */}
        <div className="absolute inset-0 z-[-1]">
          <motion.img
            src="/flight_hero_v3.png"
            alt="Cloudscape background"
            className="w-full h-full object-cover"
            animate={{
              scale: [1.1, 1.15, 1.1],
              x: [-10, 10, -10],
              y: [-5, 5, -5]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          {/* Animated Particles/Orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-[120px]"
              animate={{
                x: [Math.random() * 1000, Math.random() * -1000],
                y: [Math.random() * 500, Math.random() * -500],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
          {/* Multi-layered overlay for depth and legibility */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center px-4 max-w-5xl mx-auto mb-16 relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-2xl">
            THE SKY IS NO <br /> LONGER THE LIMIT.
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto font-medium drop-shadow-md">
            Seamless flight bookings meets next-gen AI. Travel the world in style with FlyTogether.
          </p>
        </motion.div>

        <SearchWidget />

        {/* Brand/Trust Section */}
        <div className="mt-20 flex justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholder Logos */}
          {["Airbnb", "Expedia", "Booking.com", "TripAdvisor"].map((brand) => (
            <span key={brand} className="text-xl font-bold text-white/40 hover:text-white transition-colors cursor-default">{brand}</span>
          ))}
        </div>
      </main>

      {/* Creative Features Section */}
      <section className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Smart Prices", desc: "AI-driven predictions tell you exactly when to book.", color: "bg-indigo-500" },
              { title: "Eco-Friendly", desc: "Track and offset your carbon footprint per flight.", color: "bg-green-500" },
              { title: "Instant Refund", desc: "Automated refunds processed within 30 minutes.", color: "bg-purple-500" }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-transparent hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${feature.color} opacity-10 rounded-bl-full group-hover:scale-150 transition-transform duration-700`} />
                <h3 className="text-2xl font-bold mb-4 mt-4">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                  Learn more <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Destinations Parallax */}
      <section className="py-24 bg-black text-white relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
            Trending Everywhere.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DestinationCard
              city="Tokyo" country="Japan" price="₹68,000"
              imageUrl="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop"
              delay={0.1}
            />
            <DestinationCard
              city="Paris" country="France" price="₹34,000"
              imageUrl="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop"
              delay={0.2}
            />
            <DestinationCard
              city="Dubai" country="UAE" price="₹28,000"
              imageUrl="/dubai_destination_v2.png"
              delay={0.3}
            />
            <DestinationCard
              city="New York" country="USA" price="₹50,000"
              imageUrl="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop"
              delay={0.4}
            />
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all font-bold text-lg">
              Explore All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full z-0" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full z-0" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-indigo-400 text-xs font-black uppercase tracking-widest mb-4"
            >
              <Star className="w-3 h-3 fill-indigo-400" />
              Trusted by 50,000+ Travelers
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Experiences.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Rivera",
                role: "Frequent Flyer",
                text: "The AI price prediction is a game changer. Saved ₹15,000 on my last trip to Tokyo. The interface is just breathtaking.",
                rating: 5,
                image: "https://i.pravatar.cc/150?u=alex"
              },
              {
                name: "Sarah Chen",
                role: "Luxury Traveler",
                text: "FlyTogether makes complex bookings feel like a breeze. The hotel recommendations were spot on for my Bali getaway.",
                rating: 5,
                image: "https://i.pravatar.cc/150?u=sarah"
              },
              {
                name: "James Wilson",
                role: "Digital Nomad",
                text: "Customer support is lightning fast. Had a flight change and it was resolved in minutes. Highly recommended!",
                rating: 5,
                image: "https://i.pravatar.cc/150?u=james"
              }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-xl hover:bg-white/10 transition-all duration-500 group"
              >
                <Quote className="w-10 h-10 text-indigo-500/20 mb-6 group-hover:text-indigo-500/40 transition-colors" />
                <p className="text-lg text-white/80 mb-8 font-medium leading-relaxed italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full ring-2 ring-white/10" />
                  <div>
                    <h4 className="font-bold text-white">{review.name}</h4>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider">{review.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-white/30 text-sm flex flex-col gap-2">
        <p>© 2024 FlyTogether. All rights reserved.</p>
        <a href="/admin/login" className="text-white/20 hover:text-white/50 transition-colors text-xs">Admin Access</a>
      </footer>
    </div>
  );
}
