
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Download, Crown, ArrowRight, Settings, Upload, Play } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            How Prompt2Plugin Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your ideas into powerful tools with AI-driven automation. 
            No coding required - just describe what you want to build.
          </p>
        </motion.div>

        {/* Architecture Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Platform Architecture</CardTitle>
              <CardDescription>
                Two powerful tiers for different automation needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* Free Tier */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <Download className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Free Tier - Chrome Extensions</h3>
                    <Badge variant="secondary">FREE</Badge>
                  </div>
                  
                  <div className="space-y-4 pl-11">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Frontend: Prompt Input</p>
                        <p className="text-sm text-muted-foreground">
                          User describes their Chrome extension idea
                        </p>
                      </div>
                    </div>
                    
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-1" />
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Backend: OpenAI Processing</p>
                        <p className="text-sm text-muted-foreground">
                          POST /api/extension/generate processes prompt with OpenAI
                        </p>
                      </div>
                    </div>
                    
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-1" />
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Output: Downloadable ZIP</p>
                        <p className="text-sm text-muted-foreground">
                          Complete Chrome extension bundled and ready to install
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Paid Tier */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                      <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Paid Tier - AI Agents</h3>
                    <Badge className="bg-yellow-500 text-white">$10/month</Badge>
                  </div>
                  
                  <div className="space-y-4 pl-11">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Frontend: Workflow Description</p>
                        <p className="text-sm text-muted-foreground">
                          User describes their automation workflow
                        </p>
                      </div>
                    </div>
                    
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-1" />
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Backend: Claude AI Processing</p>
                        <p className="text-sm text-muted-foreground">
                          POST /api/agent/generate creates workflow with Claude
                        </p>
                      </div>
                    </div>
                    
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-1" />
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Output: n8n JSON + Redirect</p>
                        <p className="text-sm text-muted-foreground">
                          Executable workflow code for n8n automation platform
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How to Use Chrome Extension */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="p-8">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2">
                <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">How to Install Your Chrome Extension</CardTitle>
              <CardDescription>
                Step-by-step guide to install and use your generated Chrome extension
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Download and Extract</h4>
                    <p className="text-sm text-muted-foreground">
                      Download the ZIP file from Prompt2Plugin and extract it to a folder on your computer.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Open Chrome Extensions</h4>
                    <p className="text-sm text-muted-foreground">
                      Open Chrome browser and navigate to <code className="bg-muted px-1 rounded">chrome://extensions/</code> or go to Menu → More Tools → Extensions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Enable Developer Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Toggle the "Developer mode" switch in the top-right corner of the extensions page.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Load Unpacked Extension</h4>
                    <p className="text-sm text-muted-foreground">
                      Click "Load unpacked" button and select the extracted folder containing your extension files.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Start Using</h4>
                    <p className="text-sm text-muted-foreground">
                      Your extension is now installed! Look for its icon in the Chrome toolbar and click to start using it.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How to Use n8n Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="p-8">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mb-2">
                <Crown className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-2xl">How to Use Your n8n Workflow</CardTitle>
              <CardDescription>
                Step-by-step guide to import and run your AI-generated workflow in n8n
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Copy the JSON Code</h4>
                    <p className="text-sm text-muted-foreground">
                      After generating your workflow, copy the JSON code using the "Copy" button.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Open n8n.io</h4>
                    <p className="text-sm text-muted-foreground">
                      Click the "Redirect to n8n.io" button or visit <a href="https://n8n.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">n8n.io</a> directly. Sign up for a free account if you don't have one.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Create New Workflow</h4>
                    <p className="text-sm text-muted-foreground">
                      In your n8n dashboard, click "New workflow" to create a blank workflow.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Import JSON</h4>
                    <p className="text-sm text-muted-foreground">
                      Click the "..." menu in the top-right, select "Import from JSON", and paste your copied JSON code.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Configure and Activate</h4>
                    <p className="text-sm text-muted-foreground">
                      Review the imported workflow, configure any required credentials or settings, then save and activate your workflow to start automation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
