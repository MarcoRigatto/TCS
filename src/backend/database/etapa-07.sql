-- Execute este script no Query Tool do banco riffly.
-- As tabelas artists e songs já foram criadas na preparação inicial.

ALTER TABLE songs
    ADD COLUMN IF NOT EXISTS genre VARCHAR(100),
    ADD COLUMN IF NOT EXISTS difficulty VARCHAR(50),
    ADD COLUMN IF NOT EXISTS link TEXT,
    ADD COLUMN IF NOT EXISTS observations TEXT,
    ADD COLUMN IF NOT EXISTS tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS sources JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE songs
    ALTER COLUMN status SET DEFAULT 'Não iniciada';

-- Índices para consultas frequentes por artista e título.
CREATE INDEX IF NOT EXISTS idx_songs_artist_id ON songs(artist_id);
CREATE INDEX IF NOT EXISTS idx_songs_title ON songs(title);
