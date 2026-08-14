CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  note TEXT,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.reservations TO authenticated;
GRANT ALL ON public.reservations TO service_role;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own reservations"
  ON public.reservations FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.reservation_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reservation_id UUID NOT NULL REFERENCES public.reservations(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  title TEXT NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.reservation_items TO authenticated;
GRANT ALL ON public.reservation_items TO service_role;
ALTER TABLE public.reservation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage items of their own reservations"
  ON public.reservation_items FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.reservations r WHERE r.id = reservation_id AND r.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.reservations r WHERE r.id = reservation_id AND r.user_id = auth.uid()));

CREATE INDEX idx_reservations_user ON public.reservations(user_id);
CREATE INDEX idx_reservation_items_reservation ON public.reservation_items(reservation_id);