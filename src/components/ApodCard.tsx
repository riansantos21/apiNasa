/**
 * Componente: ApodCard
 * Finalidade: exibir o conteúdo retornado pela NASA APOD (foto ou vídeo do dia),
 *             com título, data e explicação, a partir de um objeto `data` recebido via props.
 * Observação: este arquivo não importa `React` explicitamente porque, no React 17+,
 *             o novo JSX Transform dispensa o import quando não usamos `React` diretamente.
 */

// Declara a forma das props que o componente recebe
interface ApodCardProps {
  data: any; // `any` para simplificar; poderia ser tipado depois (title, date, url, media_type, explanation)
}

// Exporta o componente como padrão, recebendo `data` via desestruturação das props
export default function ApodCard({ data }: ApodCardProps) {
  // Se ainda não há dados (ex.: enquanto o fetch está em andamento), renderiza um feedback simples de carregamento
  if (!data) return <p style={{ textAlign: "center" }}>Carregando...</p>;

  // Quando `data` existe, renderizamos o card completo
  return (
    // Contêiner raiz do card; centraliza todo o conteúdo
    <div style={{ textAlign: "center" }}>
      {/* Título da APOD (ex.: nome da nebulosa, galáxia, etc.) */}
      <h2>{data.title}</h2>

      {/* Data no formato YYYY-MM-DD retornada pela API */}
      <p>{data.date}</p>

      {/* 
        A APOD pode ser "image" ou "video".
        Se for imagem, exibimos uma <img>; se for vídeo (YouTube/Vimeo), exibimos um <iframe>.
      */}
      {data.media_type === "image" ? (
        // Renderização para IMAGEM
        <img
          // URL da imagem do dia
          src={data.url}
          // Texto alternativo para acessibilidade e fallback
          alt={data.title}
          // Estilos inline simples para limitar largura e arredondar cantos
          style={{ maxWidth: "80%", borderRadius: "10px" }}
        />
      ) : (
        // Renderização para VÍDEO (normalmente YouTube/Vimeo)
        <iframe
          // URL do vídeo retornada pela API
          src={data.url}
          // Título do iframe (importante para acessibilidade)
          title="video"
          // Dimensões padrão; você pode ajustar conforme o layout desejado
          width="560"
          height="315"
          // Removemos borda e arredondamos cantos para manter visual consistente
          style={{ border: "none", borderRadius: "10px" }}
          // Permite modo tela cheia no player
          allowFullScreen
        />
      )}

      {/* 
        Parágrafo com a explicação detalhada do conteúdo do dia.
        Usamos `maxWidth` + `margin: "20px auto"` para limitar a largura e centralizar o texto.
      */}
      <p
        style={{
          marginTop: "15px",
          textAlign: "justify",
          maxWidth: "800px",
          margin: "20px auto",
        }}
      >
        {data.explanation}
      </p>
    </div>
  );
}
