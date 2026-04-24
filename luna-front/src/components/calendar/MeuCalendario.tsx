import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

export default function MyCalendar() {
  const [selected, setSelected] = React.useState<Date>();

  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        locale={ptBR}
        showOutsideDays
        // fixedWeeks
        components={{
          Chevron: ({ orientation }) => {
            return orientation === 'left' ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            );
          },
        }}
        // Classes para você estilizar no seu CSS
        classNames={{
          months: 'calendar-months',
          month: 'calendar-month',
          month_caption: 'calendar-caption',
          nav: 'calendar-nav',
          button_previous: 'nav-button-prev',
          button_next: 'nav-button-next',
          weekday: 'calendar-weekday',
          day: 'calendar-day',
          selected: 'calendar-day-selected',
          outside: 'calendar-day-outside',
          today: 'calendar-day-today',
        }}
      />

      {/* Botão flutuante da imagem */}
      <button
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '8px',
          padding: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CalendarDays size={20} color="white" />
      </button>
    </div>
  );
}