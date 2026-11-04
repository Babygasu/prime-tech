import { ChartColumn, HeartPulse, Hospital, MonitorSmartphone, Server, Workflow, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import type { SolutionIcon } from "@/content/site";

export const solutionIcons: Record<SolutionIcon, ComponentType<LucideProps>> = {
  his: HeartPulse,
  hospital: Hospital,
  integration: Workflow,
  infrastructure: Server,
  analytics: ChartColumn,
  digital: MonitorSmartphone,
};
