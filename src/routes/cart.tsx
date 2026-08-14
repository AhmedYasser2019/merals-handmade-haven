import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/cart/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart & Reservation — Meral" },
      {
        name: "description",
        content: "Review your selected Meral handmade pieces and complete your reservation.",
      },
      { property: "og:title", content: "Cart & Reservation — Meral" },
      {
        property: "og:description",
        content: "Review your selected Meral handmade pieces and complete your reservation.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { t, lang } = useI18n();
  const { items, total, setQuantity, remove, clear } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const nf = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      const { data: reservation, error } = await supabase
        .from("reservations")
        .insert({
          user_id: user.id,
          full_name: fullName,
          phone,
          address,
          note,
          total,
        })
        .select("id")
        .single();
      if (error) throw error;

      const { error: itemsError } = await supabase.from("reservation_items").insert(
        items.map((item) => ({
          reservation_id: reservation.id,
          product_id: item.id,
          title: item.title,
          unit_price: item.price,
          quantity: item.quantity,
        })),
      );
      if (itemsError) throw itemsError;

      clear();
      toast.success(t.cart.success);
      navigate({ to: "/" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.cart.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="font-heading text-4xl font-semibold text-foreground">{t.cart.title}</h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border/60 bg-card p-10 text-center">
            <p className="text-muted-foreground">{t.cart.empty}</p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/products">{t.cart.browse}</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-24 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col">
                    <h2 className="font-heading text-lg font-semibold text-foreground">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {nf.format(item.price)} {t.currency}
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex items-center gap-1 rounded-full border border-border/60">
                        <button
                          type="button"
                          aria-label="-"
                          className="p-2 text-muted-foreground hover:text-primary"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm">
                          {nf.format(item.quantity)}
                        </span>
                        <button
                          type="button"
                          aria-label="+"
                          className="p-2 text-muted-foreground hover:text-primary"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                        onClick={() => remove(item.id)}
                      >
                        <Trash2 className="size-3.5" />
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                  <div className="font-heading text-lg font-semibold text-foreground">
                    {nf.format(item.price * item.quantity)} {t.currency}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="text-muted-foreground">{t.cart.total}</span>
                <span className="font-heading text-2xl font-semibold text-foreground">
                  {nf.format(total)} {t.currency}
                </span>
              </div>

              {authLoading ? null : user ? (
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    {t.cart.reservationDetails}
                  </h2>
                  <div className="space-y-2">
                    <Label htmlFor="res-name">{t.cart.fullName}</Label>
                    <Input
                      id="res-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="rounded-xl border-border/60 bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="res-phone">{t.cart.phone}</Label>
                    <Input
                      id="res-phone"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl border-border/60 bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="res-address">{t.cart.address}</Label>
                    <Input
                      id="res-address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="rounded-xl border-border/60 bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="res-note">{t.cart.note}</Label>
                    <Textarea
                      id="res-note"
                      rows={3}
                      placeholder={t.cart.notePlaceholder}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="rounded-xl border-border/60 bg-background"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-full" disabled={submitting}>
                    {submitting ? t.cart.submitting : t.cart.submit}
                  </Button>
                </form>
              ) : (
                <div className="mt-6 space-y-4 text-center">
                  <p className="text-sm text-muted-foreground">{t.cart.loginToCheckout}</p>
                  <Button asChild className="w-full rounded-full">
                    <Link to="/auth" search={{ redirect: "/cart" }}>
                      {t.auth.signIn}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
