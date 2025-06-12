
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Loader2, Crown, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

export function AIAgentGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedJson, setGeneratedJson] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt for your AI workflow",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    console.log("Generating AI workflow for prompt:", prompt);

    try {
      const response = await fetch("/api/agent/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate AI workflow");
      }

      // For now, simulate generated JSON
      const mockJson = {
        name: "AI Workflow",
        nodes: [
          {
            id: "webhook",
            type: "webhook",
            name: "Webhook Trigger",
            parameters: { httpMethod: "POST" }
          },
          {
            id: "ai-processor",
            type: "openai",
            name: "AI Processor",
            parameters: { model: "gpt-4", prompt: prompt }
          },
          {
            id: "output",
            type: "respond-to-webhook",
            name: "Response",
            parameters: { statusCode: 200 }
          }
        ],
        connections: {
          webhook: { main: [["ai-processor"]] },
          "ai-processor": { main: [["output"]] }
        }
      };

      setGeneratedJson(JSON.stringify(mockJson, null, 2));
      
      toast({
        title: "Success!",
        description: "Your AI workflow has been generated successfully",
      });
    } catch (error) {
      console.error("Error generating AI workflow:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI workflow. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (generatedJson) {
      await navigator.clipboard.writeText(generatedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied!",
        description: "JSON workflow copied to clipboard",
      });
    }
  };

  const handleRedirectToN8n = () => {
    window.open("https://n8n.io", "_blank");
    toast({
      title: "Redirecting to n8n.io",
      description: "Paste your JSON workflow to get started",
    });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 dark:from-yellow-950/20 dark:to-orange-950/20">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-500/10 mb-4 mx-auto">
                <Crown className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-2xl">AI Agent Workflow Generator</CardTitle>
              <CardDescription className="text-lg">
                <Badge className="bg-yellow-500 text-white hover:bg-yellow-600 mb-2">
                  💲 PAID TIER - $10/month
                </Badge>
                <br />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  14-day free trial available
                </span>
                <br />
                Generate n8n automation workflows with AI-powered logic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="agent-prompt" className="block text-sm font-medium mb-2">
                  Describe your automation workflow
                </label>
                <Textarea
                  id="agent-prompt"
                  placeholder="Example: Create a workflow that monitors emails for invoices, extracts data using AI, and automatically creates entries in Google Sheets..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating AI Workflow...
                  </>
                ) : (
                  <>
                    <Crown className="mr-2 h-4 w-4" />
                    Generate AI Workflow
                  </>
                )}
              </Button>

              {generatedJson && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-64 border">
                      <code>{generatedJson}</code>
                    </pre>
                    <Button
                      onClick={handleCopy}
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <Button
                    onClick={handleRedirectToN8n}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Redirect to n8n.io
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
