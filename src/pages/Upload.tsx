import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Download, Sparkles, Image as ImageIcon, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Clock, Trash2 } from "lucide-react";

type HistoryItem = {
  id: string;
  originalName: string;
  processedUrl: string;
  timestamp: number;
};

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const UploadPage = () => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processedPreview, setProcessedPreview] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast } = useToast();

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("snapcut_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (item: HistoryItem) => {
    const updatedHistory = [item, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("snapcut_history", JSON.stringify(updatedHistory));
  };

  const deleteFromHistory = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("snapcut_history", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("snapcut_history");
  };

  const validateAndSetFile = useCallback((f: File) => {
    if (!ALLOWED_TYPES.includes(f.type)) {
      toast({ title: "Invalid format", description: "Only JPG, PNG, and WebP are supported.", variant: "destructive" });
      return;
    }
    if (f.size > MAX_SIZE) {
      toast({ title: "File too large", description: "Maximum file size is 10 MB.", variant: "destructive" });
      return;
    }
    setFile(f);
    setProcessedPreview(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, [toast]);

  // Handle Paste Event
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const pastedFile = items[i].getAsFile();
          if (pastedFile) {
            validateAndSetFile(pastedFile);
            toast({
              title: "Image Pasted! 📋",
              description: "AI is ready to process your clipboard image.",
              duration: 3000
            });
            break; // Found an image, stop looking
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [validateAndSetFile, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  }, [validateAndSetFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  }, [validateAndSetFile]);

  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);
    setProcessedPreview(null);

    try {
      const response = await fetch("https://manishpandey07.app.n8n.cloud/webhook/remove-background", {
        method: "POST",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const data = await response.json();

      if (data && data.url) {
        setProcessedPreview(data.url);

        // Save to history
        const newItem: HistoryItem = {
          id: Date.now().toString(),
          originalName: file.name,
          processedUrl: data.url,
          timestamp: Date.now(),
        };
        saveToHistory(newItem);

        toast({
          title: "Magic Complete! ✨",
          description: "Your image has been processed and saved to history.",
          variant: "default"
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Processing Failed",
        description: "There was an error while removing the background. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    // Force HTTPS to prevent "Mixed Content" blocks on Vercel (Production)
    const secureUrl = url.replace("http://", "https://");

    toast({
      title: "Preparing Download",
      description: "Processing your image for saving...",
    });

    try {
      // Priority 1: Fetch as Blob (Best experience, allows custom filename)
      // We must use 'cors' mode for production environments
      const response = await fetch(secureUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('Fetch failed');

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename.startsWith("removed-bg-") ? filename : `removed-bg-${filename}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.warn("Blob fetch failed, falling back to secure attachment method:", error);

      const isCloudinary = secureUrl.includes('cloudinary.com') && secureUrl.includes('/upload/');
      let downloadUrl = secureUrl;

      if (isCloudinary) {
        // Cloudinary native download flag + Force HTTPS
        downloadUrl = secureUrl.replace('/upload/', '/upload/fl_attachment/');
      }

      // Priority 2: Forced attachment via hidden iframe (prevents tab opening)
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = downloadUrl;
      document.body.appendChild(iframe);

      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 10000);

      toast({
        title: "Download Started",
        description: "Your file is being saved to your computer.",
      });
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setProcessedPreview(null);
  };

  return (
    <div className="min-h-screen bg-mesh relative">
      <Navbar />

      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />

      <div className="container pt-32 pb-16 relative z-10 text-center">
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="upload" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white/5 backdrop-blur-md border border-white/10 p-1 h-14 rounded-2xl">
                <TabsTrigger value="upload" className="px-8 flex items-center gap-2 text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all">
                  <Upload className="h-5 w-5" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="history" className="px-8 flex items-center gap-2 text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all">
                  <History className="h-5 w-5" />
                  History
                  {history.length > 0 && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-white text-primary rounded-full">
                      {history.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upload" className="mt-0 outline-none">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <h1 className="mb-4 text-4xl font-black md:text-5xl lg:text-6xl tracking-tight">
                  AI <span className="gradient-text">Background</span> Remover
                </h1>
                <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed">
                  Upload, Drag & Drop, or <span className="text-primary font-bold">Paste (Ctrl+V)</span> any image.
                  Our AI handles the rest instantly.
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div
                    key="dropzone"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <label
                      htmlFor="file-upload"
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed p-16 md:p-24 transition-all duration-500 ease-in-out group ${dragOver
                        ? "border-primary bg-primary/10 scale-[1.02] shadow-[0_0_50px_rgba(3,169,244,0.1)]"
                        : "border-white/10 bg-white/5 backdrop-blur-md hover:border-primary/50 hover:bg-white/10"
                        }`}
                    >
                      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary glow-primary transition-all group-hover:scale-110 group-hover:rotate-6">
                        <Upload className="h-10 w-10" />
                      </div>
                      <h3 className="mb-2 text-2xl font-bold group-hover:text-primary transition-colors">Drop or Paste your image</h3>
                      <p className="mb-8 text-muted-foreground font-medium">Click to select from desktop · Ctrl+V to paste</p>
                      <div className="relative">
                        <div className="h-14 px-10 flex items-center justify-center text-lg font-bold gradient-cta rounded-2xl glow-primary shadow-xl">
                          Browse Files
                        </div>
                      </div>
                      <input id="file-upload" type="file" className="hidden" accept=".jpg,.jpeg,.png,.webp" onChange={handleFileSelect} />
                    </label>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { icon: Zap, label: "5s Processing" },
                        { icon: Sparkles, label: "HD Quality Output" },
                        { icon: AlertCircle, label: "Privacy Protected" }
                      ].map((item, id) => (
                        <div key={id} className="flex items-center justify-center gap-3 text-muted-foreground py-3 px-6 rounded-2xl bg-white/5 border border-white/5">
                          <item.icon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/10 relative overflow-hidden"
                  >
                    <div className="mb-8 flex items-center justify-between text-left">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold">{file.name}</h3>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all" onClick={clearFile}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-black/20 group">
                      <img src={processedPreview || preview!} alt="Preview" className="mx-auto max-h-[500px] w-full object-contain transition-transform duration-700 group-hover:scale-105" />
                      {processing && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                          <div className="flex flex-col items-center gap-6">
                            <div className="relative h-20 w-20">
                              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary animate-pulse" />
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold text-white mb-2">Analyzing Pixels...</p>
                              <p className="text-sm text-white/60">Our AI is meticulously removing the background</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="xl" className="flex-1 h-16 text-lg font-bold gradient-cta rounded-2xl glow-primary" onClick={handleProcess} disabled={processing}>
                        {processing ? "Processing..." : "Remove Background"}
                        {!processing && <Sparkles className="ml-2 h-5 w-5" />}
                      </Button>
                      <Button variant="outline" size="xl" className="h-16 px-10 text-lg font-bold rounded-2xl border-white/10 bg-white/5 hover:bg-white/10" onClick={() => handleDownload(processedPreview!, file.name)} disabled={!processedPreview}>
                        <Download className="mr-2 h-5 w-5 text-primary" />
                        Download
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="history" className="mt-0 outline-none">
              <div className="text-left mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Recent Creations</h2>
                  <p className="text-muted-foreground">Access your previously processed images anytime.</p>
                </div>
                {history.length > 0 && (
                  <Button variant="destructive" variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10" onClick={clearHistory}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear History
                  </Button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="p-20 rounded-[2.5rem] bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                    <Clock className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No history yet</h3>
                  <p className="text-muted-foreground mb-8">Process some images and they will appear here automatically.</p>
                  <TabsTrigger value="upload" className="h-12 px-8 bg-primary text-white rounded-xl font-bold hover:glow-primary transition-all">
                    Start Creating
                  </TabsTrigger>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {history.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="glass-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md"
                      >
                        <div className="aspect-square relative overflow-hidden bg-black/20">
                          <img src={item.processedUrl} alt={item.originalName} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <Button size="icon" variant="secondary" className="rounded-full h-12 w-12" onClick={() => handleDownload(item.processedUrl, item.originalName)}>
                              <Download className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="destructive" className="rounded-full h-12 w-12 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white border-none" onClick={() => deleteFromHistory(item.id)}>
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-5 text-left flex items-center justify-between">
                          <div className="truncate pr-4">
                            <p className="font-bold truncate text-sm">{item.originalName}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
                              {new Date(item.timestamp).toLocaleDateString()} · {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
