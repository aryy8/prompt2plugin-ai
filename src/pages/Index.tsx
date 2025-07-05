
import { HeroSection } from "@/components/HeroSection";
import { ExtensionGenerator } from "@/components/ExtensionGenerator";
import { N8nWorkflowGenerator } from "@/components/N8nWorkflowGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ExtensionGenerator />
      <N8nWorkflowGenerator />
    </div>
  );
};

export default Index;
