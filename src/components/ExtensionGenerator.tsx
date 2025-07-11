"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ExtensionGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt for your Chrome extension",
        variant: "destructive",
      });
      return;
    }

    if (!isLoggedIn) {
      // Store current location and redirect to signup
      localStorage.setItem('redirectAfterAuth', location.pathname + '#free-tier');
      toast({
        title: "Authentication Required",
        description: "Please sign up or log in to generate extensions",
        variant: "destructive",
      });
      navigate("/signup");
      return;
    }

    setIsGenerating(true);
    console.log("Generating extension for prompt:", prompt);

    try {
      const response = await fetch("https://prompt2plugin-ai.onrender.com/generate-extension", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate extension");
      }

      // Handle ZIP file response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      toast({
        title: "Success!",
        description: "Your Chrome extension has been generated successfully",
      });
    } catch (error) {
      console.error("Error generating extension:", error);
      toast({
        title: "Error",
        description: "Failed to generate extension. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "chrome-extension.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: "Your Chrome extension ZIP file is downloading",
      });
    }
  };

  return (
    <section id="free-tier" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 mx-auto">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Chrome Extension Generator</CardTitle>
              <CardDescription className="text-lg">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  FREE TIER
                </span>
                <br />
                Describe your Chrome extension idea and get a downloadable ZIP file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="extension-prompt" className="block text-sm font-medium mb-2">
                  Describe your Chrome extension
                </label>
                <Textarea
                  id="extension-prompt"
                  placeholder="Example: Create a password generator extension that creates secure passwords with customizable length and character sets..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Extension
                    </>
                  )}
                </Button>
              </div>
              {downloadUrl && (
                <div className="mt-6 p-4 border rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
                  <p className="mb-2 text-green-800 dark:text-green-200 font-semibold">
                    Your extension ZIP is ready!
                  </p>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="lg"
                    className="flex items-center justify-center mx-auto"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download ZIP
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
