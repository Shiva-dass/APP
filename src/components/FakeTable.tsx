import React, { useState } from 'react';
import { TableRowItem } from '../types';
import { useAntiUX } from '../hooks/useAntiUX';
import { playSound } from '../utils/audio';
import { ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, RefreshCw } from 'lucide-react';

const INITIAL_ROWS: TableRowItem[] = [
  { id: 'REC-1092', name: 'Alpha Synergy Core', status: 'Active', progress: 74, lastUpdated: '2 mins ago' },
  { id: 'REC-3041', name: 'Beta Horizon Pipeline', status: 'Pending', progress: 38, lastUpdated: '14 mins ago' },
  { id: 'REC-8820', name: 'Gamma Protocol Gateway', status: 'Suspended', progress: 91, lastUpdated: '1 hour ago' },
  { id: 'REC-4412', name: 'Delta Ingestion Node', status: 'Active', progress: 12, lastUpdated: '3 hours ago' },
  { id: 'REC-9018', name: 'Epsilon Telemetry Stream', status: 'Archived', progress: 65, lastUpdated: 'Yesterday' },
];

export const FakeTable: React.FC = () => {
  const { config, recordInteraction, addToast } = useAntiUX();
  const [rows, setRows] = useState<TableRowItem[]>(INITIAL_ROWS);
  const [page, setPage] = useState<number>(1);
  const [sortCount, setSortCount] = useState<number>(0);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Section 20: Sorting intentionally unreliable
  const handleSort = (column: keyof TableRowItem) => {
    playSound('thud');

    if (config.normalMode) {
      // Normal mode sorts honestly
      const sorted = [...rows].sort((a, b) => {
        if (typeof a[column] === 'number') {
          return (a[column] as number) - (b[column] as number);
        }
        return String(a[column]).localeCompare(String(b[column]));
      });
      setRows(sorted);
      addToast(`Sorted accurately by ${String(column)}.`, 'info');
      return;
    }

    setSortCount(prev => prev + 1);

    if (column === 'name') {
      // Prompt example: Click "Name". Table appears to sort, but actually sorts by Status!
      // Click again: different order!
      if (sortCount % 2 === 0) {
        const sorted = [...rows].sort((a, b) => a.status.localeCompare(b.status));
        setRows(sorted);
        recordInteraction('button_ignored', 5);
        addToast("Sorted by 'Name' (actually sorted by Status).", 'warning');
      } else {
        // Random shuffled order
        const shuffled = [...rows].sort(() => Math.random() - 0.5);
        setRows(shuffled);
        recordInteraction('button_ignored', 6);
        addToast("Sorting algorithm experienced creative entropy.", 'warning');
      }
    } else if (column === 'status') {
      // Sorts by progress instead
      const sorted = [...rows].sort((a, b) => b.progress - a.progress);
      setRows(sorted);
      recordInteraction('button_ignored', 5);
      addToast("Sorted by 'Status' (actually sorted by Progress descending).", 'warning');
    } else {
      // Random shuffle
      const shuffled = [...rows].sort(() => Math.random() - 0.5);
      setRows(shuffled);
      recordInteraction('button_ignored', 5);
      addToast(`Column '${String(column)}' re-indexed haphazardly.`, 'warning');
    }
  };

  // Section 20: Pagination Page 1 -> Page 2 displays same records, says "Page 7 of 3"
  const handlePageChange = (direction: 'next' | 'prev') => {
    playSound('beep');
    if (config.normalMode) {
      setPage(prev => (direction === 'next' ? Math.min(prev + 1, 3) : Math.max(prev - 1, 1)));
      addToast(`Navigated to page ${direction === 'next' ? 2 : 1}.`, 'info');
      return;
    }

    recordInteraction('general', 4);
    // Page toggles between 1 and 2, but displays the same records
    setPage(prev => (prev === 1 ? 2 : 1));
    addToast("Page transitioned: Rendering identical records with higher confidence.", 'info');
  };

  const handleRowAction = (id: string) => {
    playSound('beep');
    setActionLoadingId(id);

    setTimeout(() => {
      setActionLoadingId(null);
      if (config.normalMode) {
        addToast(`Action on record ${id} succeeded.`, 'success');
        return;
      }
      recordInteraction('button_ignored', 6);
      addToast(`Record ${id} action executed: Changes successfully omitted.`, 'success');
    }, 600);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            Enterprise Telemetry Ledger
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              RFC-8211
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Interactive table with deceptive sort vectors and non-Euclidean pagination.
          </p>
        </div>

        <button
          onClick={() => {
            playSound('thud');
            setRows(INITIAL_ROWS);
            recordInteraction('general', 3);
            addToast("Ledger refreshed to original uncalibrated state.", 'info');
          }}
          className="self-start sm:self-auto px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Order</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-800">
          <thead className="bg-slate-950/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th
                onClick={() => handleSort('id')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>ID</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('name')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Name</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('status')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Status</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('progress')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Progress</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('lastUpdated')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Last Updated</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 font-mono text-[11px] text-indigo-400 font-semibold">
                  {row.id}
                </td>
                <td className="py-3 px-4 font-medium text-white">
                  {row.name}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                      row.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : row.status === 'Pending'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : row.status === 'Suspended'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 max-w-[120px]">
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">{row.progress}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-400 text-[11px] font-mono">
                  {row.lastUpdated}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleRowAction(row.id)}
                    disabled={actionLoadingId === row.id}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Execute Row Action"
                  >
                    {actionLoadingId === row.id ? (
                      <span className="text-[10px] font-mono text-indigo-400 animate-pulse">Running...</span>
                    ) : (
                      <MoreHorizontal className="w-4 h-4" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar (Section 20: Displays "Page 7 of 3") */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
        <div>
          Showing <span className="text-white font-mono font-medium">1-5</span> of{' '}
          <span className="text-white font-mono font-medium">14,290</span> records
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300">
            {config.normalMode ? `Page ${page} of 3` : 'Page 7 of 3'}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange('prev')}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange('next')}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
