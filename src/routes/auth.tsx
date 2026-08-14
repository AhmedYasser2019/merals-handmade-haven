import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? (search["redirect"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — Meral" },
      { name: "description", content: "Sign in to your Meral account to complete your reservation." },
      { property: "og:title", content: "Sign in — Meral" },
      {
        property: "og:description",
        content: "Sign in to your Meral account to complete your reservation.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const next = search.redirect && search.redirect.startsWith("/") ? search.redirect : "/";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: next });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${next}`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success(t.auth.checkEmail);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.cart.error);
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(t.cart.error);
      return;
    }
    if (result.redirected) return;
    navigate({ to: next });
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:py-24">
        <h1 className="font-heading text-3xl font-semibold text-foreground">{t.auth.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.auth.subtitle}</p>

        <form
          onSubmit={submit}
          className="mt-8 space-y-5 rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
        >
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="auth-name">{t.auth.name}</Label>
              <Input
                id="auth-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border-border/60 bg-background"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="auth-email">{t.auth.email}</Label>
            <Input
              id="auth-email"
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-border/60 bg-background"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="auth-password">{t.auth.password}</Label>
            <Input
              id="auth-password"
              type="password"
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-border/60 bg-background"
              minLength={6}
              required
            />
          </div>

          <Button type="submit" className="w-full rounded-full" disabled={loading}>
            {mode === "signin" ? t.auth.signIn : t.auth.signUp}
          </Button>

          <div className="text-center text-xs uppercase tracking-wider text-muted-foreground">
            {t.auth.or}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full"
            onClick={googleSignIn}
          >
            {t.auth.google}
          </Button>

          <button
            type="button"
            className="w-full text-center text-sm text-primary hover:underline"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? t.auth.noAccount : t.auth.haveAccount}
          </button>
        </form>
      </div>
    </SiteLayout>
  );
}
