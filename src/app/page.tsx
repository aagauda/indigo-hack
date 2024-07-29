"use client";
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";
import { useState, useEffect } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white">
      {/* Background Image */}
      {/* <div className="absolute inset-0">
        <Image
          src="/images/aviation-background.jpg" // Add a suitable aviation background image
          alt="Aviation Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div> */}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Hero Section */}
        <div className="text-center">
          <Plane className="text-white text-8xl mb-4" />
          <h1 className="text-5xl font-bold mb-6">Welcome to AA_Aviation</h1>
          <p className="text-xl mb-8">Your gateway to seamless flight bookings and management. Experience the best in aviation services with us.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button className="bg-green-500 hover:bg-green-600">Login</Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button className="bg-yellow-500 hover:bg-yellow-600">Sign Up</Button>
            </Link>
          </div>
        </div>

        {/* Additional sections */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
          <p className="text-lg">We offer the best services for booking and managing your flights with ease and reliability. Discover the features that set us apart.</p>
          <div className="flex flex-col md:flex-row gap-8 mt-8 justify-center">
            <div className="p-4 bg-white text-black rounded-lg shadow-lg max-w-xs">
              <h3 className="text-2xl font-bold mb-2">Global Reach</h3>
              <p>Book flights to any destination worldwide with our extensive network.</p>
            </div>
            <div className="p-4 bg-white text-black rounded-lg shadow-lg max-w-xs">
              <h3 className="text-2xl font-bold mb-2">Seamless Experience</h3>
              <p>Enjoy a user-friendly interface and a smooth booking process.</p>
            </div>
            <div className="p-4 bg-white text-black rounded-lg shadow-lg max-w-xs">
              <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
              <p>Our customer support team is available around the clock to assist you.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
