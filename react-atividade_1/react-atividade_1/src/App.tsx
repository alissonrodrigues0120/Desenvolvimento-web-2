import React, { useState, useEffect } from 'react';
import './App.css';

interface CardData {
  id: number;
  name: string;
  type: string;
  desc: string;
  atk?: number;
  def?: number | null;
  level?: number | null;
  attribute?: string;
  linkval?: number;
  card_images: {
    image_url: string;
  }[];
}

export function App() {
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchRandomCard = async (): Promise<void> => {
    setLoading(true);
    setError('');
    setCard(null);

    try {
      const response = await fetch(
        'https://db.ygoprodeck.com/api/v7/cardinfo.php'
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data: { data: CardData[] } = await response.json();

      if (!data.data || data.data.length === 0) {
        setError('Nenhuma carta encontrada.');
        return;
      }

      const randomIndex: number = Math.floor(
        Math.random() * data.data.length
      );

      const randomCard: CardData = data.data[randomIndex];

      setCard(randomCard);
    } catch (err: unknown) {
      console.error('Erro detalhado do fetch:', err);

      setError('Falha ao conectar com a API. Tente novamente.');
      setCard(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCard();
  }, []);

  return (
    <div className="app">
      <h2 className="title">
        Gerador Surpresa de Cards Yu-Gi-Oh!
      </h2>

      <button
        onClick={fetchRandomCard}
        disabled={loading}
        className={`draw-button ${loading ? 'loading' : ''}`}
      >
        {loading ? 'Sorteando...' : 'Sortear Outra Carta 🎲'}
      </button>

      {error && (
        <div className="error">
          <strong>Atenção:</strong> {error}
        </div>
      )}

      {loading && (
        <p className="loading-text">
          Sorteando carta do baralho...
        </p>
      )}

      {card && !loading && (
        <div className="card">
          <h3 className="card-name">{card.name}</h3>

          <p>
            <strong>Tipo:</strong> {card.type}
          </p>

          {card.attribute && (
            <p>
              <strong>Atributo:</strong> {card.attribute}
            </p>
          )}

          {card.level !== undefined && card.level !== null && (
            <p>
              <strong>Nível:</strong> {card.level}
            </p>
          )}

          {card.linkval !== undefined && (
            <p>
              <strong>Link Rating:</strong> {card.linkval}
            </p>
          )}

          <div className="stats">
            {card.atk !== undefined && card.atk !== null && (
              <p>
                <strong>ATK:</strong> {card.atk}
              </p>
            )}

            {card.def !== undefined && card.def !== null && (
              <p>
                <strong>DEF:</strong> {card.def}
              </p>
            )}
          </div>

          <p className="description">
            <strong>Descrição:</strong> {card.desc}
          </p>

          {card.card_images?.[0] && (
            <div className="image-container">
              <img
                src={card.card_images[0].image_url}
                alt={card.name}
                className="card-image"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
