/**
 * Vibe Idea - Idea Visualizer
 * 
 * Generates visual representations of ideas using BFL API
 */

require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

class IdeaVisualizer {
  constructor() {
    this.bflApiKey = process.env.BFL_API_KEY;
    this.outputDir = path.join(__dirname, '../assets/generated');
  }

  /**
   * Generate a visual representation of an idea using BFL API
   */
  async visualizeIdea(ideaDescription, options = {}) {
    if (!this.bflApiKey) {
      console.warn('BFL_API_KEY not found. Skipping visualization.');
      return null;
    }

    const {
      width = 1024,
      height = 768,
      model = 'flex', // Good for text-based visuals
      style = 'modern'
    } = options;

    // Enhance the idea description for visual generation
    const visualPrompt = this.enhancePromptForVisualization(ideaDescription, style);
    
    console.log(`🎨 Creating visual for idea: "${ideaDescription.substring(0, 60)}..."`);
    console.log(`Prompt: "${visualPrompt}"`);

    // For now, we'll simulate the API call since we don't want to spend credits
    // In a real implementation, this would call the BFL API
    return this.simulateVisualization(visualPrompt);
  }

  enhancePromptForVisualization(description, style) {
    const styleModifiers = {
      'modern': 'modern, clean, minimalist, contemporary design',
      'futuristic': 'futuristic, tech-inspired, sleek, innovative, cutting-edge',
      'abstract': 'abstract, conceptual, symbolic, artistic interpretation',
      'realistic': 'realistic, detailed, photographic, lifelike representation',
      'minimalist': 'simple, clean lines, uncluttered, elegant, essential elements only'
    };

    const commonEnhancements = [
      'professional design',
      'high quality',
      'visually appealing',
      'conceptually rich',
      'symbolic representation',
      'meaningful imagery',
      'representative visualization'
    ];

    const enhancedPrompt = `${description}, ${styleModifiers[style] || styleModifiers['modern']}, ${commonEnhancements.join(', ')}`;
    
    return enhancedPrompt;
  }

  async simulateVisualization(prompt) {
    // Simulate API call and return a mock result
    // In a real implementation, this would call the actual BFL API
    console.log('🔍 Simulating BFL API call (in real implementation, this would generate an actual image)');
    
    // Return mock data that follows the structure of BFL API responses
    return {
      id: Math.random().toString(36).substr(2, 9),
      status: 'Ready',
      result: {
        prompt: prompt,
        seed: Math.floor(Math.random() * 1000000),
        sample: `mock_visualization_for_${encodeURIComponent(prompt.substring(0, 50))}.jpg`
      },
      simulated: true
    };
  }

  /**
   * Generate a comprehensive idea report with visual elements
   */
  async generateIdeaReport(idea, evaluation) {
    const report = {
      idea: idea,
      evaluation: evaluation,
      visualization: null,
      recommendations: this.generateRecommendations(evaluation),
      implementationNotes: this.generateImplementationNotes(idea, evaluation)
    };

    // Try to create a visual representation
    try {
      report.visualization = await this.visualizeIdea(idea.description, {
        style: this.determineStyleForIdea(idea)
      });
    } catch (error) {
      console.error('Error creating visualization:', error.message);
    }

    return report;
  }

  determineStyleForIdea(idea) {
    if (idea.category === 'technical') return 'futuristic';
    if (idea.category === 'social') return 'modern';
    if (idea.category === 'creative') return 'abstract';
    if (idea.category === 'innovative') return 'futuristic';
    if (idea.category === 'practical') return 'realistic';
    return 'modern';
  }

  generateRecommendations(evaluation) {
    const recommendations = [];

    if (evaluation.overallScore > 0.8) {
      recommendations.push('High-potential idea - consider rapid prototyping');
    } else if (evaluation.overallScore > 0.6) {
      recommendations.push('Moderate-potential idea - validate with target audience');
    } else {
      recommendations.push('Lower-potential idea - consider pivoting or enhancing');
    }

    if (evaluation.originality > 0.8) {
      recommendations.push('Highly original - protect intellectual property considerations');
    }

    if (evaluation.impactPotential > 0.8) {
      recommendations.push('High impact potential - prioritize development');
    }

    if (evaluation.feasibility < 0.4) {
      recommendations.push('Low feasibility - consider simplification or alternative approaches');
    }

    if (evaluation.marketPotential > 0.7) {
      recommendations.push('Strong market potential - investigate business model');
    }

    if (evaluation.riskAssessment > 0.7) {
      recommendations.push('High risk - develop mitigation strategies');
    }

    return recommendations;
  }

  generateImplementationNotes(idea, evaluation) {
    const notes = [];
    
    notes.push(`Estimated timeline: ${evaluation.timelineEstimate} months`);
    
    if (evaluation.technicalComplexity > 0.7) {
      notes.push('High technical complexity - consider assembling skilled team');
    }
    
    if (evaluation.resourceRequirements > 0.7) {
      notes.push('Significant resources needed - plan funding strategy');
    }
    
    if (idea.connections && idea.connections.length > 0) {
      notes.push(`Leverage connections with ${idea.connections.length} related ideas`);
    }
    
    return notes;
  }

  /**
   * Save idea report to file
   */
  async saveReport(report, filename = null) {
    if (!filename) {
      const ideaId = report.idea.id || 'unknown';
      filename = `idea_report_${ideaId}_${Date.now()}.json`;
    }

    const outputPath = path.join(this.outputDir, filename);
    
    // Ensure output directory exists
    await fs.mkdir(this.outputDir, { recursive: true });
    
    // Prepare report for saving (remove circular references if any)
    const serializableReport = JSON.parse(JSON.stringify(report, (key, value) => {
      if (key === 'registry' || key === 'ideaRegistry') return undefined;
      return value;
    }));
    
    await fs.writeFile(outputPath, JSON.stringify(serializableReport, null, 2));
    
    console.log(`📋 Report saved to: ${outputPath}`);
    return outputPath;
  }
}

// Example usage
if (require.main === module) {
  console.log('🎨 Initializing Vibe Idea Visualizer...\n');
  
  const visualizer = new IdeaVisualizer();
  
  // Example idea object (similar to what would come from our brainstorming module)
  const exampleIdea = {
    id: 'exp123',
    description: 'AI-powered platform to help people discover their ideal career path based on personality, skills, and market trends',
    category: 'innovative',
    feasibility: 0.7,
    originality: 0.8,
    impactPotential: 0.9,
    state: 'conceived',
    connections: [{ id: 'rel456', type: 'similar' }]
  };
  
  // Example evaluation (similar to what would come from our brainstorming module)
  const exampleEvaluation = {
    ideaId: 'exp123',
    feasibility: 0.7,
    originality: 0.8,
    impactPotential: 0.9,
    marketPotential: 0.85,
    technicalComplexity: 0.6,
    resourceRequirements: 0.7,
    timelineEstimate: 12,
    riskAssessment: 0.4,
    overallScore: 0.75
  };
  
  console.log('Generating comprehensive idea report...');
  
  visualizer.generateIdeaReport(exampleIdea, exampleEvaluation)
    .then(async (report) => {
      console.log('\n✅ Report generated successfully!');
      console.log(`\nIdea: ${report.idea.description}`);
      console.log(`\nEvaluation Score: ${(report.evaluation.overallScore * 100).toFixed(1)}%`);
      console.log(`\nRecommendations: ${report.recommendations.length}`);
      report.recommendations.forEach((rec, i) => console.log(`  ${i + 1}. ${rec}`));
      
      console.log(`\nImplementation Notes: ${report.implementationNotes.length}`);
      report.implementationNotes.forEach(note => console.log(`  • ${note}`));
      
      if (report.visualization) {
        console.log(`\n🖼️  Visualization created: ${report.visualization.result.sample}`);
      } else {
        console.log('\n🖼️  Visualization skipped (API key not configured)');
      }
      
      // Save the report
      try {
        const filePath = await visualizer.saveReport(report);
        console.log(`\n💾 Report saved to: ${filePath}`);
      } catch (saveErr) {
        console.error('Error saving report:', saveErr.message);
      }
      
      console.log('\n✨ Vibe Idea Visualization Complete!');
    })
    .catch(err => {
      console.error('Error generating report:', err);
    });
}

module.exports = IdeaVisualizer;