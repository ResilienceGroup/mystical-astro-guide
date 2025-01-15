interface QuizBackgroundProps {
  children: React.ReactNode;
}

export const QuizBackground = ({ children }: QuizBackgroundProps) => {
  return (
    <div className="relative min-h-[600px]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#8639F6] to-black z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 50px 160px, white, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 90px 40px, white, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 160px 120px, white, rgba(0,0,0,0)),
              linear-gradient(to bottom, #8639F6, black)
            `,
            animation: "twinkle 5s infinite",
          }}
        />
      </div>
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};