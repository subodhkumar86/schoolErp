import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export default function StudentStatusBadge({ status }: Props) {
  return (
    <Badge variant={status === "Active" ? "default" : "secondary"}>
      {status}
    </Badge>
  );
}
