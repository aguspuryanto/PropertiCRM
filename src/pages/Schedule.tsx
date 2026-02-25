import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday
} from 'date-fns';
import { id } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2, Circle } from 'lucide-react';
import { MOCK_TASKS } from '../lib/mockData';
import { cn } from '../lib/utils';

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Fill in empty days at start of month for grid alignment
  const startDayOfWeek = monthStart.getDay(); // 0 (Sunday) to 6 (Saturday)
  const emptyDays = Array(startDayOfWeek).fill(null);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const tasksForSelectedDate = MOCK_TASKS.filter(task => 
    isSameDay(new Date(task.date), selectedDate)
  );

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'Survey': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Meeting': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Follow-up': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Calendar Section */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 capitalize">
            {format(currentDate, 'MMMM yyyy', { locale: id })}
          </h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-slate-400 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 flex-1">
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}
          {daysInMonth.map((day) => {
            const hasTasks = MOCK_TASKS.some(t => isSameDay(new Date(t.date), day));
            const isSelected = isSameDay(day, selectedDate);
            
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "relative p-2 rounded-lg flex flex-col items-center justify-start transition-colors min-h-[80px] border",
                  isSelected 
                    ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500" 
                    : "bg-white border-slate-100 hover:border-emerald-200 hover:bg-slate-50",
                  isToday(day) && !isSelected && "bg-blue-50/50 border-blue-200"
                )}
              >
                <span className={cn(
                  "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1",
                  isSelected ? "bg-emerald-600 text-white" : 
                  isToday(day) ? "bg-blue-600 text-white" : "text-slate-700"
                )}>
                  {format(day, 'd')}
                </span>
                
                {hasTasks && (
                  <div className="flex gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List Section */}
      <div className="w-full lg:w-96 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-emerald-600" />
            Agenda
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: id })}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {tasksForSelectedDate.length > 0 ? (
            tasksForSelectedDate.map((task) => (
              <div 
                key={task.id} 
                className={cn(
                  "p-4 rounded-lg border border-l-4 transition-shadow hover:shadow-md",
                  getTaskColor(task.type)
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                    {task.type}
                  </span>
                  {task.status === 'Completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Circle className="w-4 h-4 opacity-50" />
                  )}
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">{task.title}</h4>
                <div className="flex items-center text-sm opacity-75">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {format(new Date(task.date), 'HH:mm')} WIB
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                <CalendarIcon className="w-6 h-6 text-slate-300" />
              </div>
              <p>Tidak ada agenda untuk tanggal ini.</p>
              <button className="mt-4 text-sm text-emerald-600 font-medium hover:underline">
                + Tambah Agenda Baru
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
