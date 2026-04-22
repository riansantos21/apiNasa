// Importamos os hooks do React: useState (para armazenar estados) e useEffect (para efeitos colaterais como chamadas à API).
import { useState, useEffect } from "react";

// Importamos os componentes criados na pasta "components".
import Header from "./components/Header";
import CalendarPicker from "./components/CalendarPicker";
import ApodCard from "./components/ApodCard";

// Importamos a função que conecta com a API da NASA (está em services/api).
import { getApodByDate } from "../src/api/nasaService";

// Componente principal da aplicação
export default function App() {
  // Estado "date": guarda a data escolhida pelo usuário (inicialmente 2024-10-01)
  const [date, setDate] = useState("2024-10-01");

  // Estado "apodData": guarda os dados retornados da API da NASA (título, imagem, explicação, etc.)
  const [apodData, setApodData] = useState<any>(null);

  /**
   * useEffect:
   * - É executado toda vez que a variável "date" muda.
   * - Busca os dados da NASA com a data atual e atualiza o estado "apodData".
   */
  useEffect(() => {
    // Função interna assíncrona para buscar os dados
    const fetchData = async () => {
      try {
        // Chamamos a função do service passando a data selecionada
        const data = await getApodByDate(date);

        // Se der certo, atualizamos o estado "apodData" com os dados recebidos
        setApodData(data);
      } catch (error) {
        // Se ocorrer erro, mostramos no console e limpamos o estado
        console.error(error);
        setApodData(null);
      }
    };

    // Executa a função ao carregar a página e sempre que "date" mudar
    fetchData();
  }, [date]); // <- dependência: toda vez que a data mudar, o efeito roda de novo

  /**
   * JSX (interface da aplicação):
   * - Renderiza o cabeçalho
   * - Renderiza o calendário (controlado pelo estado "date")
   * - Renderiza o card com os dados retornados pela API
   */
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      {/* Cabeçalho fixo com título e subtítulo */}
      <Header />

      {/* Calendário que envia a nova data escolhida para atualizar o estado */}
      <CalendarPicker date={date} onDateChange={setDate} />

      {/* Card que mostra a foto/vídeo e explicação da NASA */}
      <ApodCard data={apodData} />
    </div>
  );
}
