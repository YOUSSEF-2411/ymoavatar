import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import BottomNav from "@/components/BottomNav";
import ARViewer from "@/components/ARViewer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon, Info } from "lucide-react";

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
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProject = (project: Tables<"ar_projects">) => {
    setSelectedProject(project);
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

  if (isScanning && selectedProject) {
    return (
      <div className="min-h-screen pb-20 bg-background">
        <div className="relative h-screen">
          <ARViewer
            markerUrl={selectedProject.marker_image_url}
            contentType={selectedProject.content_type}
            contentUrl={selectedProject.content_url || undefined}
            projectId={selectedProject.id}
            targetFileUrl={selectedProject.target_file_url || undefined}
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

        <Card className="p-8 text-center space-y-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Camera className="h-10 w-10 text-primary" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Scan AR Markers</h2>
            <p className="text-muted-foreground">
              Select a project below to start scanning its marker image
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="bg-muted/50 rounded-lg p-6">
              <Info className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">No AR projects ready yet</p>
              <p className="text-sm text-muted-foreground">
                Projects need to finish processing before they can be scanned.
                Check your dashboard for project status.
              </p>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-6 text-left">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">How to use:</h3>
              </div>
              <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                <li>Select an AR project below</li>
                <li>Allow camera access when prompted</li>
                <li>Point your camera at the marker image shown</li>
                <li>The content will appear automatically!</li>
                <li>Move away to hide the content</li>
              </ol>
            </div>
          )}
        </Card>

        {projects.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Available AR Experiences ({projects.length})</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleSelectProject(project)}
                >
                  <div className="relative">
                    {project.marker_image_url && (
                      <img
                        src={project.marker_image_url}
                        alt={project.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    {project.target_file_url && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-green-500/90 text-white text-xs px-2 py-1 rounded-full">
                          Ready
                        </div>
                      </div>
                    )}
                    {!project.target_file_url && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-yellow-500/90 text-white text-xs px-2 py-1 rounded-full">
                          Processing
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-1">{project.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize mb-3">
                      {project.content_type} content
                    </p>
                    <Button className="w-full" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Start Scanning
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Scan;
