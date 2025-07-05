"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, Workflow, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function N8nWorkflowGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [workflowJson, setWorkflowJson] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt for your n8n workflow",
        variant: "destructive",
      });
      return;
    }

    if (!isLoggedIn) {
      // Store current location and redirect to signup
      localStorage.setItem('redirectAfterAuth', location.pathname + '#n8n-workflow');
      toast({
        title: "Authentication Required",
        description: "Please sign up or log in to generate workflows",
        variant: "destructive",
      });
      navigate("/signup");
      return;
    }

    setIsGenerating(true);
    console.log("Generating n8n workflow for prompt:", prompt);

    try {
      const response = await fetch("https://prompt2plugin-ai.onrender.com/generate-n8n-workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate workflow");
      }

      // Handle JSON response
      const workflow = await response.json();
      setWorkflowJson(JSON.stringify(workflow, null, 2));
      
      toast({
        title: "Success!",
        description: "Your n8n workflow has been generated successfully",
      });
    } catch (error) {
      console.error("Error generating workflow:", error);
      toast({
        title: "Error",
        description: "Failed to generate workflow. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (workflowJson) {
      try {
        await navigator.clipboard.writeText(workflowJson);
        setCopied(true);
        toast({
          title: "Copied!",
          description: "Workflow JSON copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy:", error);
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive",
        });
      }
    }
  };

  const handleDownload = () => {
    if (workflowJson) {
      const blob = new Blob([workflowJson], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "n8n-workflow.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Your n8n workflow JSON file is downloading",
      });
    }
  };

  return (
    <section id="n8n-workflow" className="py-16">
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
                <Workflow className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">n8n Workflow Generator</CardTitle>
              <CardDescription className="text-lg">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  NEW
                </span>
                <br />
                Describe your automation workflow and get importable n8n JSON
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="workflow-prompt" className="block text-sm font-medium mb-2">
                  Describe your n8n workflow
                </label>
                <Textarea
                  id="workflow-prompt"
                  placeholder="Example: Create a workflow that monitors Gmail for new emails and sends notifications to Slack when important emails arrive..."
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
                      <Workflow className="mr-2 h-4 w-4" />
                      Generate Workflow
                    </>
                  )}
                </Button>
              </div>

              {workflowJson && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                    <p className="mb-4 text-green-800 dark:text-green-200 font-semibold">
                      Your n8n workflow is ready!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center"
                      >
                        {copied ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy JSON
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download JSON
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Generated Workflow JSON</h4>
                      <span className="text-xs text-gray-500">Ready to import into n8n</span>
                    </div>
                    <pre className="text-xs overflow-x-auto max-h-64 overflow-y-auto bg-white dark:bg-gray-800 p-3 rounded border">
                      <code>{workflowJson}</code>
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 