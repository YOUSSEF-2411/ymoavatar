import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { X, Info } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { incrementViewCount } from "@/lib/supabase-helpers";

interface ARScannerProps {
    projects: Tables<"ar_projects">[];
    onProjectDetected?: (project: Tables<"ar_projects"> | null) => void;
    onStop: () => void;
}

const ARScanner = ({ projects, onProjectDetected, onStop }: ARScannerProps) => {
    const [isTracking, setIsTracking] = useState(false);
    const [trackedProject, setTrackedProject] = useState<Tables<"ar_projects"> | null>(null);
    const [showInfo, setShowInfo] = useState(true);
    const [mindARReady, setMindARReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const mindARRef = useRef<any>(null);
    const anchorsRef = useRef<Map<string, any>>(new Map());

    useEffect(() => {
        startCamera();
        return () => {
            cleanup();
        };
    }, []);

    useEffect(() => {
        if (mindARReady && projects.length > 0) {
            initializeMindAR();
        }
    }, [mindARReady, projects]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment",
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;

                await new Promise((resolve) => {
                    if (videoRef.current) {
                        videoRef.current.onloadedmetadata = resolve;
                    }
                });
            }

            // Load MindAR libraries
            await loadMindARScripts();
            setMindARReady(true);
        } catch (error) {
            console.error("Error starting camera:", error);
        }
    };

    const loadMindARScripts = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if ((window as any).MINDAR && (window as any).THREE) {
                resolve();
                return;
            }

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

    const initializeMindAR = async () => {
        try {
            // Filter projects that have target files
            const validProjects = projects.filter(p => p.target_file_url);

            if (validProjects.length === 0) {
                console.warn("No projects with target files available");
                return;
            }

            // For now, we'll use the first project's target file
            // In a real implementation, you'd need to combine multiple targets or switch between them
            const project = validProjects[0];

            const MindAR = (window as any).MINDAR.IMAGE;
            const mindarThree = new MindAR.MindARThree({
                container: containerRef.current,
                imageTargetSrc: project.target_file_url,
            });

            mindARRef.current = mindarThree;

            const { renderer, scene, camera } = mindarThree;

            // Setup content based on project type
            if (project.content_type === "video" && project.content_url) {
                const video = document.createElement("video");
                video.src = project.content_url;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.crossOrigin = "anonymous";

                const texture = new (window as any).THREE.VideoTexture(video);
                const geometry = new (window as any).THREE.PlaneGeometry(1, 1);
                const material = new (window as any).THREE.MeshBasicMaterial({ map: texture });
                const plane = new (window as any).THREE.Mesh(geometry, material);

                const anchor = mindarThree.addAnchor(0);
                anchor.group.add(plane);

                anchor.onTargetFound = () => {
                    setIsTracking(true);
                    setTrackedProject(project);
                    onProjectDetected?.(project);
                    video.play();
                    incrementViewCount(project.id);
                    setTimeout(() => setShowInfo(false), 3000);
                };

                anchor.onTargetLost = () => {
                    setIsTracking(false);
                    setTrackedProject(null);
                    onProjectDetected?.(null);
                    video.pause();
                };

                anchorsRef.current.set(project.id, { anchor, video });
            } else if (project.content_type === "image" && project.content_url) {
                const texture = new (window as any).THREE.TextureLoader().load(project.content_url);
                const geometry = new (window as any).THREE.PlaneGeometry(1, 1);
                const material = new (window as any).THREE.MeshBasicMaterial({ map: texture });
                const plane = new (window as any).THREE.Mesh(geometry, material);

                const anchor = mindarThree.addAnchor(0);
                anchor.group.add(plane);

                anchor.onTargetFound = () => {
                    setIsTracking(true);
                    setTrackedProject(project);
                    onProjectDetected?.(project);
                    incrementViewCount(project.id);
                    setTimeout(() => setShowInfo(false), 3000);
                };

                anchor.onTargetLost = () => {
                    setIsTracking(false);
                    setTrackedProject(null);
                    onProjectDetected?.(null);
                };

                anchorsRef.current.set(project.id, { anchor });
            }

            await mindarThree.start();

            renderer.setAnimationLoop(() => {
                renderer.render(scene, camera);
            });

        } catch (error) {
            console.error("Error initializing MindAR:", error);
        }
    };

    const cleanup = () => {
        if (mindARRef.current) {
            try {
                mindARRef.current.stop();
            } catch (e) {
                console.error("Error stopping MindAR:", e);
            }
            mindARRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        anchorsRef.current.clear();
        setIsTracking(false);
        setTrackedProject(null);
    };

    const handleStop = () => {
        cleanup();
        onStop();
    };

    return (
        <div className="relative h-full bg-black">
            <div ref={containerRef} className="absolute inset-0">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Tracking indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${isTracking
                        ? 'bg-green-500/20 border-green-500/30'
                        : 'bg-primary/20 border-primary/30'
                    }`}>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${isTracking ? 'bg-green-500' : 'bg-primary'
                        }`} />
                    <span className="text-sm text-white font-medium">
                        {isTracking ? `Tracking: ${trackedProject?.name}` : 'Scanning for markers...'}
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

            {/* Info card */}
            {showInfo && (
                <div className="absolute bottom-24 left-4 right-4 pointer-events-auto z-10">
                    <Card className="p-4 bg-black/70 backdrop-blur-md border-white/20 text-white">
                        <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium mb-1">
                                    Point your camera at an AR marker
                                </p>
                                <p className="text-xs text-white/70">
                                    The video/image will appear automatically when detected and disappear when you move away
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-white/70 hover:text-white"
                                onClick={() => setShowInfo(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Tracked content info */}
            {isTracking && trackedProject && (
                <div className="absolute top-20 left-4 right-4 pointer-events-none z-10">
                    <Card className="p-3 bg-green-500/20 backdrop-blur-md border-green-500/30">
                        <p className="text-sm text-white font-medium">
                            ✓ {trackedProject.name} - {trackedProject.content_type}
                        </p>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ARScanner;
