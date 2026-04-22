// URL base da API APOD (Astronomy Picture of the Day) da NASA.
// É daqui que buscaremos a imagem/vídeo do dia.
const API_URL = "https://api.nasa.gov/planetary/apod";

// Sua chave de acesso à API da NASA.
// Você pode gerar a sua em https://api.nasa.gov/ (gratuita).
// Aqui já está configurada uma chave personalizada, mas poderia ser "DEMO_KEY" para testes.
const API_KEY = "dAXLAO6qpmcj7J95G5NDLhUPn1CYYrJ24LD2360v"; 

/**
 * Função assíncrona que busca os dados da APOD para uma data específica.
 * @param date - A data no formato YYYY-MM-DD (ex.: "2024-10-01").
 * @returns Objeto JSON com título, url, explicação, tipo de mídia e outros campos.
 */
export async function getApodByDate(date: string) {
  // Faz a requisição HTTP para a API da NASA com a data e a chave.
  const response = await fetch(`${API_URL}?api_key=${API_KEY}&date=${date}`);

  // Converte a resposta em JSON (objeto JS que podemos usar no React).
  const data = await response.json();

  // Caso a API retorne um erro (ex.: data futura, limite excedido, etc.),
  // a resposta terá uma propriedade "code". Nesse caso, disparamos um erro manual.
  if (data.code) {
    throw new Error("Essa data não possui foto disponível.");
  }

  // Se tudo deu certo, retornamos os dados (serão usados no componente ApodCard).
  return data;
}
