import SearchBar from "../components/SearchBar";
import CommandBar from "../components/CommandBar";
import GlassButton from "../components/GlassButton";

type Props = {
  onAction: (action: string) => void;
};

export default function WorkspaceTopBar({ onAction }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 16,
        marginBottom: 24
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14
        }}
      >
        <SearchBar />
        <CommandBar />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12
        }}
      >
        <GlassButton label="New Project" primary onClick={() => onAction("New Project")} />
        <GlassButton label="Import" onClick={() => onAction("Import Media")} />
      </div>
    </div>
  );
}
