import { StudentPredictor } from "@/components/student-predictor";
import Image from "next/image";

export default function Home() {
  const assets = [
    { src: "/ias-assets/ai_prediction_dashboard_1769425767621.png", title: "Predictive Analytics", desc: "Real-time performance forecasting" },
    { src: "/ias-assets/student_focus_study_1769425784171.png", title: "AI-Augmented Learning", desc: "Deep focus with digital assistants" },
    { src: "/ias-assets/academic_growth_concept_1769425804842.png", title: "Growth Trajectory", desc: "Data-driven academic success" },
    { src: "/ias-assets/futuristic_digital_library_1769425826511.png", title: "Digital Knowledge", desc: "Next-gen discovery engine" },
    { src: "/ias-assets/ai_brain_circuitry_1769425841529.png", title: "Neural Modeling", desc: "Modeling cognitive performance" },
  ];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-6 relative overflow-hidden">
      {/* Abstract Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-indigo-600 opacity-20 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-purple-600 opacity-15 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-pink-600 opacity-10 blur-[140px] rounded-full" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col py-12">
        <header className="text-center mb-16 space-y-4">
          <div className="flex flex-col items-center gap-3">
            <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-semibold text-indigo-400 uppercase tracking-widest shadow-lg shadow-indigo-500/5">
              Engineered by Er Munna Kumar
            </div>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none">
            Predict Your <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">Future Score</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl max-w-3xl mx-auto mt-6">
            Linear Regression analysis for data-driven academic success. Powered by <span className="text-indigo-400 font-semibold">Er Munna Kumar</span>.
          </p>
        </header>

        {/* Predictor Engine Section */}
        <section className="flex justify-center mb-32">
          <StudentPredictor />
        </section>

        {/* Innovation Gallery Section */}
        <section className="space-y-12 mb-20">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-zinc-100 italic tracking-tight">Innovation <span className="text-indigo-500">Insights</span> Gallery</h2>
            <p className="text-zinc-500 text-sm">Visualizing the future of AI-driven academic excellence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {assets.map((asset, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-indigo-500/10">
                <Image 
                  src={asset.src} 
                  alt={asset.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-1">{asset.desc}</p>
                  <p className="text-white text-sm font-semibold">{asset.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-20 border-t border-zinc-900/50 text-center text-zinc-600 text-xs flex flex-col items-center gap-4">
          <div className="flex gap-8 mb-4">
            <span className="hover:text-zinc-400 transition-colors cursor-pointer">Algorithm Analytics</span>
            <span className="hover:text-zinc-400 transition-colors cursor-pointer">Data Sovereignty</span>
            <span className="hover:text-zinc-400 transition-colors cursor-pointer">Educational Ethics</span>
          </div>
          <p>© 2026 Er Munna Kumar | Student Performance Predictor. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
