export function Roll({ label }: { label: string }) {
  return (
    <span className="roll">
      <span className="roll-inner">
        <span>{label}</span>
        <span aria-hidden="true">{label}</span>
      </span>
    </span>
  );
}
