const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testN8nWorkflowGeneration() {
  const testPrompt = "Create a workflow that monitors a Gmail inbox for new emails and sends notifications to Slack when important emails arrive";
  
  try {
    console.log('🧪 Testing n8n workflow generation...');
    console.log(`📝 Test prompt: "${testPrompt}"`);
    
    const response = await fetch('http://localhost:3001/generate-n8n-workflow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: testPrompt })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error:', errorData);
      return;
    }

    const workflow = await response.json();
    
    console.log('✅ Success! Generated n8n workflow:');
    console.log('📋 Workflow name:', workflow.name || 'Unnamed Workflow');
    console.log('🔗 Number of nodes:', workflow.nodes ? workflow.nodes.length : 0);
    console.log('🔗 Number of connections:', workflow.connections ? Object.keys(workflow.connections).length : 0);
    
    // Pretty print the first few nodes for verification
    if (workflow.nodes && workflow.nodes.length > 0) {
      console.log('\n📦 Sample nodes:');
      workflow.nodes.slice(0, 3).forEach((node, index) => {
        console.log(`  ${index + 1}. ${node.name} (${node.type})`);
      });
    }
    
    console.log('\n🎉 Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testN8nWorkflowGeneration();
}

module.exports = { testN8nWorkflowGeneration }; 