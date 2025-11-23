import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import BottomNav from "@/components/BottomNav";
import ARScanner from "@/components/ARScanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon } from "lucide-react";

const Scan = () => {
  const [projects, setProjects] = useState<Tables<"ar_projects">[]>([]);
  const [selectedProject, setSelectedProject] = useState<Tables<"ar_projects"> | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllProjects();
  }, []);

  const loadAllProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("ar_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartScanning = () => {
    setIsScanning(true);
  };

  const handleStopScanning = () => {
    setIsScanning(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-20 bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading AR experiences...</p>
        <BottomNav />
      </div>
    );
  }

  if (isScanning) {
    return (
      <div className="min-h-screen pb-20 bg-background">
        <div className="relative h-screen">
          <ARScanner 
            projects={projects}
            onProjectDetected={setSelectedProject}
            onStop={handleStopScanning}
          />
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">AR Scanner</h1>
        
        <Card className="p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Camera className="h-10 w-10 text-primary" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Start Scanning</h2>
            <p className="text-muted-foreground">
              Point your camera at any AR marker image to see the content
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 text-left space-y-4">
            <h3 className="font-semibold text-lg">Available AR Experiences: {projects.length}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-background rounded-lg p-3 border border-border flex items-center gap-3"
                >
                  {project.marker_image_url && (
                    <img
                      src={project.marker_image_url}
                      alt={project.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.content_type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handleStartScanning}
            disabled={projects.length === 0}
          >
            <Camera className="mr-2 h-5 w-5" />
            Start AR Scanner
          </Button>

          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No AR experiences available yet. Create one first!
            </p>
          )}
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default Scan;
