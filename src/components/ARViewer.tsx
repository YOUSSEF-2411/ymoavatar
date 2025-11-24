import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Camera, X, Info } from "lucide-react";

interface ARViewerProps {
  markerUrl?: string;
  contentType?: string;
  contentUrl?: string;
  projectId?: string;
  targetFileUrl?: string;
}

const ARViewer = ({ markerUrl, contentType, contentUrl, projectId, targetFileUrl }: ARViewerProps) => {
  const [isARActive, setIsARActive] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mindARRef = useRef<any>(null);

  useEffect(() => {
    if (isARActive && targetFileUrl) {
      startMindAR();
    }
    return () => {
      stopAR();
    };
  }, [isARActive, targetFileUrl]);

  const startMindAR = async () => {
    try {
      // Load MindAR library dynamically first
      if (!(window as any).MINDAR) {
        await loadMindARScript();
      }

      const MindAR = (window as any).MINDAR.IMAGE;
      const mindarThree = new MindAR.MindARThree({
        container: containerRef.current,
        imageTargetSrc: targetFileUrl,
      });

      mindARRef.current = mindarThree;

      const { renderer, scene, camera } = mindarThree;

      // Add content based on type
      if (contentType === "video" && contentUrl) {
        const video = document.createElement("video");
        video.src = contentUrl;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = "anonymous";

        const texture = new (window as any).THREE.VideoTexture(video);
        const geometry = new (window as any).THREE.PlaneGeometry(1, 0.5625);
        const material = new (window as any).THREE.MeshBasicMaterial({ map: texture });
        const plane = new (window as any).THREE.Mesh(geometry, material);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        anchor.onTargetFound = () => {
          console.log("Target found!");
          setIsTracking(true);
          video.play().catch(e => console.error("Video play error:", e));
        };
        
        anchor.onTargetLost = () => {
          console.log("Target lost!");
          setIsTracking(false);
          video.pause();
        };
      } else if (contentType === "image" && contentUrl) {
        const loader = new (window as any).THREE.TextureLoader();
        loader.load(contentUrl, (texture: any) => {
          const geometry = new (window as any).THREE.PlaneGeometry(1, 1);
          const material = new (window as any).THREE.MeshBasicMaterial({ map: texture });
          const plane = new (window as any).THREE.Mesh(geometry, material);

          const anchor = mindarThree.addAnchor(0);
          anchor.group.add(plane);

          anchor.onTargetFound = () => {
            console.log("Target found!");
            setIsTracking(true);
          };
          
          anchor.onTargetLost = () => {
            console.log("Target lost!");
            setIsTracking(false);
          };
        });
      }

      // Increment view count
      if (projectId) {
        const { incrementViewCount } = await import("@/lib/supabase-helpers");
        incrementViewCount(projectId);
      }

      await mindarThree.start();
      
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

    } catch (error) {
      console.error("Error starting MindAR:", error);
      setError("Failed to start AR. Please try again.");
    }
  };

  const loadMindARScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Load Three.js first
      const threeScript = document.createElement("script");
      threeScript.src = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js";
      threeScript.async = true;
      
      threeScript.onload = () => {
        // Then load MindAR
        const mindScript = document.createElement("script");
        mindScript.src = "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js";
        mindScript.async = true;
        mindScript.onload = () => resolve();
        mindScript.onerror = reject;
        document.head.appendChild(mindScript);
      };
      
      threeScript.onerror = reject;
      document.head.appendChild(threeScript);
    });
  };

  const stopAR = () => {
    if (mindARRef.current) {
      mindARRef.current.stop();
      mindARRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsTracking(false);
  };

  const handleStart = () => {
    setIsARActive(true);
  };

  const handleStop = () => {
    setIsARActive(false);
    stopAR();
  };

  if (!targetFileUrl) {
    return (
      <div className="h-full flex items-center justify-center px-4">
        <Card className="max-w-lg w-full p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <Info className="h-10 w-10 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Processing AR Target</h1>
            <p className="text-muted-foreground mb-4">
              The AR tracking file is being generated. This may take a few moments.
            </p>
            <p className="text-sm text-muted-foreground">
              Please refresh the page in a few seconds to try again.
            </p>
          </div>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </Card>
      </div>
    );
  }

  if (!isARActive) {
    return (
      <div className="h-full flex items-center justify-center px-4">
        <Card className="max-w-lg w-full p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Camera className="h-10 w-10 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">AR Scanner Ready</h1>
            <p className="text-muted-foreground">
              Point your camera at the marker to view AR content
            </p>
          </div>

          {markerUrl && (
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={markerUrl}
                alt="AR Marker"
                className="w-full h-48 object-contain bg-muted/30"
              />
              <div className="bg-muted/50 p-2 text-xs text-center text-muted-foreground">
                Scan this image with your camera
              </div>
            </div>
          )}

          <Button
            size="lg"
            className="w-full"
            onClick={handleStart}
          >
            <Camera className="mr-2 h-5 w-5" />
            Start Camera
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-black">
      <div ref={containerRef} className="absolute inset-0" />

      {/* Tracking indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
          isTracking 
            ? 'bg-green-500/20 border-green-500/30' 
            : 'bg-primary/20 border-primary/30'
        }`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            isTracking ? 'bg-green-500' : 'bg-primary'
          }`} />
          <span className="text-sm font-medium text-white">
            {isTracking ? '✓ Target Detected!' : 'Scanning for marker...'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 pointer-events-auto z-10">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
          onClick={handleStop}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Error message */}
      {error && (
        <div className="absolute bottom-24 left-4 right-4 pointer-events-auto z-10">
          <Card className="p-4 bg-red-500/20 backdrop-blur-md border-red-500/30 text-white">
            <p className="text-sm">{error}</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ARViewer;
