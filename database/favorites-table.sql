-- =============================================
-- Favorites Table for CSE 340 Additional Enhancement
-- =============================================

-- Create the favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
    favorite_id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL,
    inv_id INTEGER NOT NULL,
    date_added TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_account
        FOREIGN KEY (account_id)
        REFERENCES public.account (account_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_inventory
        FOREIGN KEY (inv_id)
        REFERENCES public.inventory (inv_id)
        ON DELETE CASCADE,
    CONSTRAINT unique_favorite
        UNIQUE (account_id, inv_id)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_favorites_account_id ON public.favorites (account_id);
CREATE INDEX IF NOT EXISTS idx_favorites_inv_id ON public.favorites (inv_id);

-- Grant permissions
GRANT ALL ON public.favorites TO PUBLIC;
GRANT ALL ON SEQUENCE public.favorites_favorite_id_seq TO PUBLIC;
