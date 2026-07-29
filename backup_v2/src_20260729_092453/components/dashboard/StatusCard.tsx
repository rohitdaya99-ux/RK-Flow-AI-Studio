interface StatusCardProps {
  status: string;
}

export const StatusCard = ({ status }: StatusCardProps) => {
  return (
    <div
      style={{
        background: "#333333",
        color: "#00ffd0",
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 15,
        border: "1px solid #444"
      }}
    >
      STATUS : {status}
    </div>
  );
};