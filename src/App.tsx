/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Mail, Calendar, Heart, Hotel, Star, ExternalLink, DollarSign } from 'lucide-react';
import hotelData from './data/hotels.json';

interface HotelInfo {
  id: string;
  name: string;
  rating?: number;
  price?: string;
  priceValue?: number;
  distance?: string;
  distanceValue?: number;
  address?: string;
  url?: string;
  isPinned?: boolean;
}

function LodgingSection() {
  const [sortBy, setSortBy] = React.useState<'price' | 'distance'>('distance');

  const hotels: HotelInfo[] = hotelData;

  const sortedHotels = [...hotels].sort((a, b) => {
    // Pinned hotels always come first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    if (sortBy === 'price') {
      return (a.priceValue || 0) - (b.priceValue || 0);
    } else {
      return (a.distanceValue || 0) - (b.distanceValue || 0);
    }
  });

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-light">Where to Stay</h2>
        <p className="text-lg max-w-2xl mx-auto opacity-80">
          We've gathered a list of recommended hotels near the ceremony. 
          Prices are estimates for May 1-3.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <div className="bg-white border border-[#5a5a40]/10 rounded-full p-1 flex">
          <button 
            onClick={() => setSortBy('distance')}
            className={`px-6 py-2 rounded-full text-sm font-sans font-medium transition-all ${sortBy === 'distance' ? 'bg-[#5a5a40] text-white' : 'text-[#5a5a40] hover:bg-[#5a5a40]/5'}`}
          >
            Sort by Distance
          </button>
          <button 
            onClick={() => setSortBy('price')}
            className={`px-6 py-2 rounded-full text-sm font-sans font-medium transition-all ${sortBy === 'price' ? 'bg-[#5a5a40] text-white' : 'text-[#5a5a40] hover:bg-[#5a5a40]/5'}`}
          >
            Sort by Price
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sortedHotels.map((hotel) => (
          <motion.div 
            layout
            key={hotel.id}
            className={`group relative bg-white border rounded-2xl p-6 transition-all ${hotel.isPinned ? 'border-[#5a5a40] ring-1 ring-[#5a5a40]/20 shadow-sm' : 'border-[#5a5a40]/10 hover:shadow-md'}`}
          >
            {hotel.isPinned && (
              <div className="absolute -top-3 left-6 bg-[#5a5a40] text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-sans font-bold">
                Highly Recommended
              </div>
            )}

            <div className="flex gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${hotel.isPinned ? 'bg-[#5a5a40] text-white' : 'bg-[#5a5a40]/5 text-[#5a5a40]'}`}>
                <Hotel className="w-6 h-6" />
              </div>
              <div className="space-y-2 pr-4">
                <h3 className="text-xl font-medium leading-tight">{hotel.name}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-sans opacity-70">
                  {hotel.rating && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {hotel.rating}
                    </span>
                  )}
                  {hotel.price && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {hotel.price}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {hotel.distance}
                  </span>
                </div>
                {hotel.url && (
                  <a 
                    href={hotel.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#5a5a40] text-sm font-medium hover:underline mt-2"
                  >
                    View on Maps <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default function App() {
  const ceremonyAddress = "313 N State St, Westerville, OH 43082";
  const receptionAddress = "6030 Chandler Ct, Westerville, OH 43082";
  
  const ceremonyMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("St. Paul the Apostle Catholic Church Westerville Ohio")}`;
  const receptionMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Giammarco's Italian Restaurant Westerville Ohio")}`;

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#4a4a40] font-serif selection:bg-[#5a5a40]/20">
      {/* Hero Section */}
      <header className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden border-b border-[#5a5a40]/10">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920" 
            alt="White Wedding Flowers" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center px-4"
        >
          <div className="flex justify-center mb-6">
            <Heart className="text-[#5a5a40] w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4">
            Anthony & Quynh
          </h1>
          <p className="text-xl md:text-2xl italic opacity-80 mb-8">
            Are getting married
          </p>
          <div className="h-px w-24 bg-[#5a5a40] mx-auto mb-8 opacity-30" />
          <p className="text-lg tracking-[0.2em] uppercase font-sans font-medium">
            May 2nd • Westerville, Ohio
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-20 space-y-24">
        
        {/* Ceremony & Reception Section */}
        <section className="grid md:grid-cols-2 gap-16">
          {/* Ceremony */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-light border-b border-[#5a5a40]/10 pb-4">The Ceremony</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 mt-1 text-[#5a5a40]" />
                <div>
                  <p className="font-sans font-semibold uppercase text-xs tracking-wider opacity-60">Date</p>
                  <p className="text-lg">Saturday, May 2nd</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 mt-1 text-[#5a5a40]" />
                <div>
                  <p className="font-sans font-semibold uppercase text-xs tracking-wider opacity-60">Time</p>
                  <p className="text-lg">11:30 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 mt-1 text-[#5a5a40]" />
                <div>
                  <p className="font-sans font-semibold uppercase text-xs tracking-wider opacity-60">Location</p>
                  <p className="text-lg leading-relaxed">
                    St. Paul the Apostle Catholic Church<br />
                    313 N State St<br />
                    Westerville, OH 43082
                  </p>
                  <a 
                    href={ceremonyMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-[#5a5a40] hover:underline underline-offset-4 font-sans text-sm font-medium"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-light border-b border-[#5a5a40]/10 pb-4">The Reception</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 mt-1 text-[#5a5a40]" />
                <div>
                  <p className="font-sans font-semibold uppercase text-xs tracking-wider opacity-60">Time</p>
                  <p className="text-lg">12:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 mt-1 text-[#5a5a40]" />
                <div>
                  <p className="font-sans font-semibold uppercase text-xs tracking-wider opacity-60">Location</p>
                  <p className="text-lg leading-relaxed">
                    Giammarco's Italian Restaurant<br />
                    6030 Chandler Ct<br />
                    Westerville, OH 43082
                  </p>
                  <a 
                    href={receptionMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-[#5a5a40] hover:underline underline-offset-4 font-sans text-sm font-medium"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* RSVP Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#5a5a40]/5 rounded-[2rem] p-12 text-center space-y-6"
        >
          <h2 className="text-4xl font-light">RSVP</h2>
          <p className="text-lg max-w-md mx-auto opacity-80">
            We look forward to celebrating with you. Please kindly RSVP via email by April 1st.
          </p>
          <div className="flex justify-center pt-4">
            <a 
              href="mailto:anthonyquynhwedding@gmail.com" 
              className="bg-[#5a5a40] text-white px-8 py-4 rounded-full font-sans font-medium tracking-wide hover:bg-[#4a4a30] transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              anthonyquynhwedding@gmail.com
            </a>
          </div>
        </motion.section>

        {/* Registry Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-[#5a5a40]/10 rounded-[2rem] p-12 text-center space-y-8 shadow-sm"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[#5a5a40]/5 rounded-full flex items-center justify-center">
              <Heart className="text-[#5a5a40] w-8 h-8" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-light">Wedding Registry</h2>
            <p className="text-lg max-w-md mx-auto opacity-80">
              Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have registered at Amazon.
            </p>
          </div>
          <div className="flex justify-center">
            <a 
              href="https://www.amazon.com/wedding/guest-view/2R62T64XP8AHJ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#232f3e] text-white rounded-full font-sans font-medium hover:bg-black transition-all transform hover:scale-105 shadow-lg"
            >
              <img src="https://www.amazon.com/favicon.ico" alt="" className="w-5 h-5 rounded-sm" />
              View Amazon Registry
            </a>
          </div>
        </motion.section>

        {/* Lodging Section */}
        <LodgingSection />
      </main>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-[#5a5a40]/10 opacity-60 font-sans text-xs tracking-widest uppercase">
        Anthony & Quynh • 2026
      </footer>
    </div>
  );
}
