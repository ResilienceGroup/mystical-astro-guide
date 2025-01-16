import { LoadingStep } from "@/components/Quiz/steps/LoadingStep";

const Loader = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background with stars effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8639F6] to-black z-0">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 160px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 160px 120px, white, rgba(0,0,0,0)),
            linear-gradient(to bottom, #8639F6, black)
          `,
          animation: 'twinkle 5s infinite',
        }} />
      </div>

      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col p-6">
        <LoadingStep onComplete={() => {}} />
      </div>
    </div>
  );
};

export default Loader;