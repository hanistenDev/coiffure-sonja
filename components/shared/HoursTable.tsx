import { hoursRows } from "@/lib/hours";
import type { OpeningHours } from "@/types/salon";

export function HoursTable({ hours }: { hours: OpeningHours }) {
  const rows = hoursRows(hours);
  if (rows.length === 0) return null;

  return (
    <table className="mt-8 w-full max-w-md border-collapse text-sm">
      <caption className="mb-2 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
        Öffnungszeiten
      </caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.day} className="border-t border-line">
            <th scope="row" className="w-[7.5rem] py-3 pr-4 text-left font-normal text-muted">
              {row.label}
            </th>
            <td className="py-3 text-right leading-snug">{row.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
