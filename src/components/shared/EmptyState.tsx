interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="py-10 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
