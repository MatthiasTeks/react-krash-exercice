import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, Lock, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen text-black flex flex-col">
      {/* Hero Banner */}
      <section className="flex-1 flex flex-col justify-center items-center text-center p-4 md:p-10 space-y-6 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in-down">
          Secure Data Center for the Resistance
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl animate-fade-in-up">
          Centralizing our fight against the Empire, one encrypted bit at a time.
        </p>
        <Button className="bg-destructive hover:bg-red-800 text-background animate-pulse">Join the Resistance</Button>
      </section>

      {/* Mission Statement */}
      <section id="mission" className="py-12 md:py-20 px-4 bg-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl text-gray-300">
            To provide a secure, centralized hub for Resistance members to access critical information, coordinate
            missions, and ultimately bring freedom to the galaxy.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 md:py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Eye className="w-12 h-12 text-blue-500" />}
            title="Intelligence Gathering"
            description="Collect and analyze data from across the galaxy to stay one step ahead of the Empire."
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-red-500" />}
            title="Secure Communications"
            description="Encrypted channels for real-time strategic discussions and mission planning."
          />
          <FeatureCard
            icon={<Lock className="w-12 h-12 text-green-500" />}
            title="Fortress-level Security"
            description="Multi-layered protection to keep our data safe from Imperial intrusion."
          />
        </div>
      </section>

      {/* Password-protected Entry */}
      <section id="join" className="py-12 md:py-20 px-4 bg-foreground text-background">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Resistance Members</h2>
          <p className="mb-4">Enter the secret code to access the data center:</p>
          <div className="flex space-x-2">
            <Input
              type="password"
              placeholder="Enter access code"
              className="bg-background border-border text-foreground"
            />
            <Button className="bg-destructive hover:bg-red-800 text-foreground">Access</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t text-center">
        <p className="text-sm text-foreground">
          © {new Date().getFullYear()} Resistance HQ. May the Force be with you.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-foreground border-gray-700 hover:border-blue-500 text-background transition-all duration-300 transform hover:scale-105">
      <CardContent className="p-6 text-center flex flex-col justify-center items-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
