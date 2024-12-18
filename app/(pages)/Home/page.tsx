import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Truck, Ship, Users } from "lucide-react";
import NavbarHome from "@/components/NavbarHome";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarHome />

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <UserTypesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Streamline Your Global Trade <br /> with TradeFlow
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Connect buyers, sellers, transporters, and freight forwarders in
              one powerful platform. Simplify your import and export business
              today.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/signup">
              {" "}<Button>Get Started</Button>
            </Link>
            {/* <Button variant="outline">Learn More</Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Global Product Discovery",
              description: "Find products from sellers worldwide",
              icon: Globe
            },
            {
              title: "Efficient Quotation System",
              description: "Request and manage quotes with ease",
              icon: ArrowRight
            },
            {
              title: "Seamless Booking Process",
              description: "Book shipments and manage logistics effortlessly",
              icon: Ship
            },
            {
              title: "Local Transport Coordination",
              description:
                "Connect with local transporters for efficient delivery",
              icon: Truck
            },
            {
              title: "Freight Forwarding Integration",
              description: "Streamline your port-to-port operations",
              icon: Ship
            },
            {
              title: "User-Specific Dashboards",
              description: "Tailored interfaces for each user type",
              icon: Users
            }
          ].map((feature, index) =>
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 p-2 bg-blue-100 rounded-full">
                <feature.icon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">
                {feature.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function UserTypesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Who Benefits from TradeFlow?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Buyers",
              description:
                "Discover products globally, request quotes, and book shipments with ease."
            },
            {
              title: "Sellers",
              description:
                "Manage orders, connect with freight forwarders, and coordinate local transport efficiently."
            },
            {
              title: "Freight Forwarders",
              description:
                "Handle container bookings and streamline port-to-port delivery processes."
            },
            {
              title: "Transporters",
              description:
                "Assist sellers with product delivery from manufacturers to ports seamlessly."
            }
          ].map((userType, index) =>
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">
                {userType.title}
              </h3>
              <p className="text-gray-500">
                {userType.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-white"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          How TradeFlow Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: "Sign Up",
              description:
                "Create your account as a buyer, seller, freight forwarder, or transporter."
            },
            {
              step: 2,
              title: "Connect",
              description:
                "Find and connect with other users based on your trade needs."
            },
            {
              step: 3,
              title: "Transact",
              description:
                "Request quotes, book shipments, and manage logistics."
            },
            {
              step: 4,
              title: "Grow",
              description:
                "Expand your business globally with TradeFlow's powerful network."
            }
          ].map((step, index) =>
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                {step.step}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500">
                {step.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 bg-blue-500 text-white"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Streamline Your Global Trade?
            </h2>
            <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
              Join TradeFlow today and experience the future of import and
              export business.
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="secondary">Get Started Now</Button>
            <Button variant="outline">Contact Sales</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-800 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Product</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Connect</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="hover:underline">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © {new Date().getFullYear()} TradeFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
