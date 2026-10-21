import { SalonPage } from "@/components/SalonPage";
import { getSalon } from "@/lib/salon";

export default function Page() {
  return <SalonPage salon={getSalon()} />;
}
