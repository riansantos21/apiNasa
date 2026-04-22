/**
 * Componente: CalendarPicker
 * Finalidade: renderizar um input de calendário (date picker) que permite
 *             ao usuário escolher uma data. Quando a data muda, chamamos
 *             a função passada via props para atualizar o estado no App.
 */

// Definição da interface das props recebidas pelo componente
interface CalendarPickerProps {
  // "date" é a data atual selecionada (string no formato YYYY-MM-DD)
  date: string;
  // "onDateChange" é a função que será chamada quando o usuário trocar a data
  onDateChange: (newDate: string) => void;
}

// Função do componente, recebendo props desestruturadas
export default function CalendarPicker({ date, onDateChange }: CalendarPickerProps) {
  return (
    // Div que centraliza o conteúdo e adiciona espaço inferior
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      {/* 
        Input do tipo "date" (calendário nativo do HTML5).
        - value: o valor vem da prop "date" (estado controlado).
        - max: impede que o usuário escolha uma data futura (a NASA não tem fotos futuras).
        - onChange: dispara quando a data é alterada e passa a nova data para o App via "onDateChange".
        - style: estilização inline simples para deixar maior e mais visível.
      */}
      <input
        type="date"
        value={date}
        max={new Date().toISOString().split("T")[0]} // gera string YYYY-MM-DD da data de hoje
        onChange={(e) => onDateChange(e.target.value)}
        style={{ padding: "8px", fontSize: "16px" }}
      />
    </div>
  );
}
