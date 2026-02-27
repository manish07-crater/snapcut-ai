import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { Sparkles } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />
      <div className="container flex min-h-screen items-center justify-center pt-16">
        <div className="glass-card mx-auto w-full max-w-sm rounded-[2rem] p-8 md:p-10 border-white/10 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary glow-primary">
              <Sparkles className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">Sign in to SnapCut Pro AI</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button variant="hero" className="w-full" type="submit">Sign In</Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
            </div>

            <Button variant="hero-outline" className="w-full" type="button">
              Continue with Google
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">Sign up</Link>
          </div>
          <div className="mt-2 text-center">
            <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-primary">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
