import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Definindo a interface para os nossos eventos
interface EventoCalendario {
  id: string;
  title: string;
  start: string; // Formato "YYYY-MM-DD"
  backgroundColor?: string;
  allDay?: boolean;
}

export default function MeuCalendario() {
  // Estado para gerenciar a lista de eventos
  const [eventos, setEventos] = useState<EventoCalendario[]>([
    { id: '1', title: 'Feriado Exemplo', start: '2024-12-25', backgroundColor: '#ff4d4d' },
    { id: '2', title: 'Meu Evento', start: '2024-12-10', backgroundColor: '#3788d8' }
  ]);

  useEffect(() => {
  fetch('https://brasilapi.com.br/api/feriados/v1/2024')
    .then(res => res.json())
    .then(data => {
      const feriados = data.map((f: any) => ({
        title: `🚩 ${f.name}`,
        start: f.date,
        backgroundColor: '#ebfbee',
        textColor: '#0ca678',
        display: 'background' // Isso marca o fundo do dia!
      }));
      setEventos(prev => [...prev, ...feriados]);
    });
}, []);

  // Função para adicionar evento ao clicar em uma data
  const handleDateClick = (arg: any) => {
    const titulo = prompt('Novo Evento:');
    if (titulo) {
      const novoEvento: EventoCalendario = {
        id: String(Date.now()),
        title: titulo,
        start: arg.dateStr,
        backgroundColor: '#28a745'
      };
      setEventos([...eventos, novoEvento]);
    }
  };

  // Função para exibir detalhes ao clicar no evento
  const handleEventClick = (clickInfo: any) => {
    alert(`Evento: ${clickInfo.event.title}`);
  };
  

  return (
    <div style={{ padding: '2rem' }}>
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="pt-br"
            headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next'
            }}
            dayHeaderFormat={{ weekday: 'short' }} // Deixa "Dom", "Seg", etc.
            fixedWeekCount={false} // Remove semanas vazias no final
            height="auto"
            events={eventos}
            // Remove as bordas das células
            contentHeight="auto"
        />
    </div>
  );
}