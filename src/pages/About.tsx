
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Download, Crown, ArrowRight, Code2, Zap, Globe } from "lucide-react";

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

        {/* Technical Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
                <Code2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Modern Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Next.js + TypeScript frontend</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Node.js + Express backend</li>
                <li>• OpenAI & Claude API integration</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>AI-Powered Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Intelligent code generation</li>
                <li>• Context-aware responses</li>
                <li>• Production-ready output</li>
                <li>• Error handling & validation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2">
                <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Seamless Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Direct n8n.io integration</li>
                <li>• Chrome Web Store ready</li>
                <li>• Modular architecture</li>
                <li>• Developer-friendly APIs</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">API Endpoints</CardTitle>
              <CardDescription>
                RESTful API architecture for seamless integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Chrome Extension Generation</h4>
                  <code className="text-sm">POST /api/extension/generate</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Accepts user prompt, processes with OpenAI, generates and bundles Chrome extension files, returns downloadable ZIP.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">AI Workflow Generation</h4>
                  <code className="text-sm">POST /api/agent/generate</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Accepts workflow description, processes with Claude AI, generates n8n-compatible JSON workflow, provides redirect to n8n.io.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
