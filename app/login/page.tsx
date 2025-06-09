
"use client";

import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import InteractiveBackground from '@/components/common/InteractiveBackground';
import { Card, CardContent } from "@/components/ui/card";

// Simple text-based Logo to match the image
const PageLogo = ({ className }: { className?: string }) => (
  <div className={`font-semibold tracking-wider text-center text-2xl ${className}`}>
    <span className="text-foreground">TEAM-VEO3</span>
  </div>
);

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden relative">
      <InteractiveBackground />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs space-y-6"> {/* max-w-xs for compact, space-y for spacing between logo and card */}
        <PageLogo className="text-foreground mb-1" /> {/* Adjusted margin */}
        
        <Card className="w-full bg-card/90 backdrop-blur-sm shadow-2xl rounded-lg border-border/30">
          {/* CardHeader removed as per the target image */}
          <CardContent className="p-6"> {/* Padding adjusted for content */}
            <LoginForm />
          </CardContent>
        </Card>
        
        <Footer className="py-0 text-xs text-muted-foreground/80 !mt-6" /> {/* Footer styling for compactness and less emphasis */}
      </div>
    </div>
  );
}
