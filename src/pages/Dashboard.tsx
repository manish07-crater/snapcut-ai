import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Download, Sparkles, Image as ImageIcon, Zap, AlertCircle, History, Clock, Trash2, CreditCard, Key, Settings, LayoutDashboard, TrendingUp, Timer, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { removeBackground } from "@imgly/background-removal";
import { Link } from "react-router-dom";

type HistoryItem = {
  id: string;
  originalName: string;
  processedUrl: string;
  timestamp: number;
};

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const Dashboard = () => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processedPreview, setProcessedPreview] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast } = useToast();

  // Load history from localStorage and preload ML models
  useEffect(() => {
    const savedHistory = localStorage.getItem("snapcut_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Preload models in background without blocking UI
    import("@imgly/background-removal").then(({ preload }) => {
      console.log("Preloading AI models...");
      preload().catch(() => console.log("Silent optional preload fail"));
    });
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
      // Use local machine-learning background removal instead of the dead remote server
      const imageBlob = await removeBackground(file);
      const url = URL.createObjectURL(imageBlob);

      setProcessedPreview(url);

      // Save to history
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        originalName: file.name,
        processedUrl: url,
        timestamp: Date.now(),
      };
      saveToHistory(newItem);

      toast({
        title: "Magic Complete! ✨",
        description: "Your image has been processed and saved to history.",
        variant: "default"
      });
    } catch (error: any) {
      console.error("Error processing image:", error);
      toast({
        title: "Processing Failed",
        description: `Error: ${error?.message || "There was an error while removing the background."} Please try again.`,
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

  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "history", label: "History", icon: History },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "apikeys", label: "API Keys", icon: Key },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-screen bg-[#070b14] text-white overflow-hidden font-sans">
       {/* Sidebar */}
       <aside className="w-64 bg-[#0a0e17] border-r border-white/5 flex flex-col hidden md:flex h-full flex-shrink-0">
         <div className="px-6 py-8">
           <Link to="/" className="flex items-center gap-2 mb-10 group">
             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary transition-transform group-hover:rotate-12">
               <Sparkles className="h-4 w-4" />
             </div>
             <span className="text-xl font-black tracking-tight text-white">Snapcut AI</span>
           </Link>

           <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-2 w-full items-start">
             {sidebarItems.map(item => (
               <TabsTrigger 
                 key={item.id} 
                 value={item.id} 
                 className="w-full justify-start px-4 py-3 text-sm font-semibold rounded-xl text-muted-foreground data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all hover:bg-white/5 hover:text-white"
               >
                 <item.icon className="h-4 w-4 mr-3" />
                 {item.label}
               </TabsTrigger>
             ))}
           </TabsList>
         </div>

         <div className="mt-auto p-6">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2"><Sparkles className="h-8 w-8 text-primary/10" /></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0">Free Plan</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">5 credits left</p>
                </div>
              </div>
              <Button className="w-full gradient-cta glow-primary font-bold rounded-xl h-10" asChild>
                <Link to="/pricing">Upgrade to Pro</Link>
              </Button>
           </div>
         </div>
       </aside>

       {/* Main Content Area */}
       <main className="flex-1 h-screen overflow-y-auto bg-[#070b14] relative">
         <div className="p-8 md:p-12 max-w-6xl mx-auto min-h-full">
           
           {/* Mobile Header */}
           <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="text-xl font-black text-white">Snapcut AI</span>
              </Link>
              <select 
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                {sidebarItems.map(i => <option key={i.id} value={i.id} className="bg-[#070b14]">{i.label}</option>)}
              </select>
           </div>

           <TabsContent value="dashboard" className="m-0 mt-0 h-full animate-in fade-in duration-500">
             <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="glass-card p-6 rounded-2xl border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500"><ImageIcon className="h-5 w-5"/></div>
                       <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md ml-auto">+12%</span>
                    </div>
                    <h3 className="text-3xl font-bold">{history.length}</h3>
                    <p className="text-sm text-muted-foreground">Images Processed</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="p-3 rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5"/></div>
                    </div>
                    <h3 className="text-3xl font-bold">5</h3>
                    <p className="text-sm text-muted-foreground">Credits Remaining</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500"><TrendingUp className="h-5 w-5"/></div>
                       <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md ml-auto">+8%</span>
                    </div>
                    <h3 className="text-3xl font-bold">{history.length}</h3>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-500"><Timer className="h-5 w-5"/></div>
                       <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md ml-auto">-0.5s</span>
                    </div>
                    <h3 className="text-3xl font-bold">3.2s</h3>
                    <p className="text-sm text-muted-foreground">Avg. Time</p>
                  </div>
                </div>

                <h2 className="text-xl font-bold mt-8 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 rounded-2xl border-white/5 hover:bg-white/5 cursor-pointer transition-colors" onClick={() => setActiveTab('upload')}>
                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500 w-fit mb-4"><Upload className="h-5 w-5"/></div>
                    <h3 className="font-bold mb-1">Upload Image</h3>
                    <p className="text-sm text-muted-foreground">Remove background from a new image</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border-white/5 hover:bg-white/5 cursor-pointer transition-colors" onClick={() => setActiveTab('history')}>
                    <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-500 w-fit mb-4"><History className="h-5 w-5"/></div>
                    <h3 className="font-bold mb-1">View History</h3>
                    <p className="text-sm text-muted-foreground">Access your recent processed images</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border-white/5 hover:bg-white/5 cursor-pointer transition-colors" onClick={() => setActiveTab('apikeys')}>
                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500 w-fit mb-4"><Key className="h-5 w-5"/></div>
                    <h3 className="font-bold mb-1">API Access</h3>
                    <p className="text-sm text-muted-foreground">Generate API keys for integration</p>
                  </div>
                </div>

                <h2 className="text-xl font-bold mt-8 mb-4">Recent Images</h2>
                <div className="glass-card rounded-2xl border-white/5 overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-sm font-semibold text-muted-foreground hidden md:grid">
                    <div className="col-span-6">Image</div>
                    <div className="col-span-3">Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1"></div>
                  </div>
                  {history.slice(0, 3).map(item => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center border-b border-white/5 text-sm hover:bg-white/5 transition-colors">
                      <div className="col-span-1 md:col-span-6 flex items-center gap-3">
                         <div className="h-10 w-10 rounded-lg bg-black/20 flex-shrink-0 flex items-center justify-center border border-white/10 overflow-hidden"><img src={item.processedUrl} alt={item.originalName} className="w-full h-full object-contain" /></div>
                         <span className="truncate max-w-[150px] md:max-w-[200px]">{item.originalName}</span>
                      </div>
                      <div className="col-span-1 md:col-span-3 text-muted-foreground text-xs md:text-sm">{new Date(item.timestamp).toLocaleDateString()}</div>
                      <div className="col-span-1 md:col-span-2"><span className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">completed</span></div>
                      <div className="col-span-1 text-right"><Button variant="ghost" size="sm" onClick={() => handleDownload(item.processedUrl, item.originalName)}>Download</Button></div>
                    </div>
                  ))}
                  {history.length === 0 && <div className="p-8 text-center text-muted-foreground">No recent images</div>}
                </div>
             </div>
           </TabsContent>

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
                  <Button variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10" onClick={clearHistory}>
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

            <TabsContent value="billing" className="mt-0 outline-none">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-16 md:p-24 rounded-[2.5rem] glass-card border border-white/10 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
                   <CreditCard className="h-10 w-10 text-primary" />
                 </div>
                 <h2 className="text-3xl font-black mb-2">Billing & Plans</h2>
                 <p className="text-muted-foreground max-w-md mx-auto mb-8">Manage your subscription, view payment history, and download invoices here.</p>
                 <Button variant="hero" size="xl" className="rounded-2xl font-bold px-10">Upgrade to Pro Workspace</Button>
              </motion.div>
            </TabsContent>

            <TabsContent value="apikeys" className="mt-0 outline-none">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-16 md:p-24 rounded-[2.5rem] glass-card border border-white/10 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                   <Key className="h-10 w-10 text-muted-foreground" />
                 </div>
                 <h2 className="text-3xl font-black mb-2">Developer API</h2>
                 <p className="text-muted-foreground max-w-md mx-auto mb-8">Generate API keys to integrate Snapcut AI background removal directly into your own applications.</p>
                 <Button variant="outline" size="xl" className="rounded-2xl font-bold px-8 border-white/10 bg-white/5">Generate New Key</Button>
              </motion.div>
            </TabsContent>

            <TabsContent value="settings" className="mt-0 outline-none">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-16 md:p-24 rounded-[2.5rem] glass-card border border-white/10 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                   <Settings className="h-10 w-10 text-muted-foreground" />
                 </div>
                 <h2 className="text-3xl font-black mb-2">Account Settings</h2>
                 <p className="text-muted-foreground max-w-md mx-auto mb-8">Update your personal information, manage email preferences, and configure workplace security.</p>
              </motion.div>
            </TabsContent>

         </div>
       </main>
    </Tabs>
  );
};

export default Dashboard;
