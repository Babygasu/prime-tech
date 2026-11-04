import {
  Baby,
  Building2,
  ChartColumn,
  FileHeart,
  FlaskConical,
  Hospital,
  House,
  Network,
  Pill,
  ReceiptText,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { CapabilityIcon, ClientIcon, SolutionIcon } from "@/content/site";

type Icon = ComponentType<LucideProps>;

export const solutionIcons: Record<SolutionIcon, Icon> = {
  emr: FileHeart,
  hmis: ChartColumn,
  network: Network,
  claims: ReceiptText,
};

export const capabilityIcons: Record<CapabilityIcon, Icon> = {
  registration: UserRound,
  consultation: Stethoscope,
  lab: FlaskConical,
  pharmacy: Pill,
  billing: ReceiptText,
  reports: ChartColumn,
  security: ShieldCheck,
};

export const clientIcons: Record<ClientIcon, Icon> = {
  hospital: Hospital,
  chps: House,
  maternity: Baby,
  clinic: Stethoscope,
  private: Building2,
  organisation: Users,
};
