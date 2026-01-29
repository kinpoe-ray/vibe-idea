/**
 * Vibe Idea - Ideation and Innovation Explorer
 * 
 * This module focuses on capturing, developing, and implementing creative ideas
 * in digital spaces and technological contexts.
 */

class VibeIdea {
  constructor(config = {}) {
    this.config = {
      creativityLevel: config.creativityLevel || 0.8,
      innovationThreshold: config.innovationThreshold || 0.7,
      feasibilityFactor: config.feasibilityFactor || 0.6,
      ...config
    };
    
    this.ideaRegistry = new Map();
    this.ideaCategories = ['innovative', 'practical', 'creative', 'technical', 'social'];
    this.ideaStates = ['conceived', 'developing', 'feasible', 'implemented', 'abandoned'];
    
    console.log('Vibe Idea initialized with config:', this.config);
  }

  /**
   * Capture a new idea
   */
  captureIdea(description, category = 'creative', feasibility = 0.5) {
    const idea = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      description,
      category,
      feasibility,
      originality: this.calculateOriginality(description),
      impactPotential: this.calculateImpact(description),
      state: 'conceived',
      connections: [] // Related ideas
    };

    this.ideaRegistry.set(idea.id, idea);
    console.log(`Idea captured: ${idea.description.substring(0, 60)}... (Category: ${idea.category}, Feasibility: ${idea.feasibility})`);
    
    return idea;
  }

  /**
   * Calculate the originality of an idea
   */
  calculateOriginality(description) {
    const originalityFactors = {
      novel: description.includes('novel') || description.includes('new') ? 0.9 : 0.3,
      unique: description.includes('unique') || description.includes('original') ? 0.8 : 0.2,
      unconventional: description.includes('unusual') || description.includes('different') ? 0.7 : 0.1,
      creative: description.includes('creative') || description.includes('innovative') ? 0.6 : 0.4
    };
    
    const avgOriginality = Object.values(originalityFactors).reduce((sum, val) => sum + val, 0) / Object.keys(originalityFactors).length;
    return Math.min(avgOriginality, 1.0);
  }

  /**
   * Calculate impact potential
   */
  calculateImpact(description) {
    const impactKeywords = [
      'transform', 'revolutionize', 'solve', 'improve', 'enhance',
      'scale', 'democratize', 'accelerate', 'optimize', 'empower'
    ];
    
    const lowerDesc = description.toLowerCase();
    const matchedKeywords = impactKeywords.filter(word => lowerDesc.includes(word)).length;
    return Math.min(matchedKeywords / impactKeywords.length * 1.5, 1.0); // Boost for multiple matches
  }

  /**
   * Connect related ideas
   */
  connectIdeas(ideaId1, ideaId2, connectionType = 'similar') {
    const idea1 = this.ideaRegistry.get(ideaId1);
    const idea2 = this.ideaRegistry.get(ideaId2);
    
    if (!idea1 || !idea2) {
      throw new Error('One or both ideas not found');
    }
    
    idea1.connections.push({ id: ideaId2, type: connectionType });
    idea2.connections.push({ id: ideaId1, type: connectionType });
    
    console.log(`Connected ideas: ${ideaId1} ↔ ${ideaId2} (${connectionType})`);
  }

  /**
   * Advance idea state
   */
  advanceIdeaState(ideaId, newState) {
    const idea = this.ideaRegistry.get(ideaId);
    if (!idea) {
      throw new Error('Idea not found');
    }
    
    if (!this.ideaStates.includes(newState)) {
      throw new Error(`Invalid state: ${newState}`);
    }
    
    idea.state = newState;
    console.log(`Idea ${ideaId} advanced to state: ${newState}`);
    return idea;
  }

  /**
   * Find ideas matching criteria
   */
  findIdeas(filterFn) {
    const matches = [];
    
    for (const [id, idea] of this.ideaRegistry.entries()) {
      if (filterFn(idea)) {
        matches.push(idea);
      }
    }
    
    return matches;
  }

  /**
   * Generate a creative idea based on parameters
   */
  generateIdea(seedConcept = '') {
    const prefixes = ['AI-powered', 'Blockchain-based', 'IoT-enhanced', 'VR/AR-enabled', 'Quantum-inspired'];
    const verbs = ['streamline', 'revolutionize', 'automate', 'optimize', 'enhance', 'connect', 'empower'];
    const domains = ['education', 'healthcare', 'finance', 'communication', 'productivity', 'creativity', 'collaboration'];
    const outcomes = ['user experience', 'efficiency', 'accessibility', 'personalization', 'sustainability'];

    const prefix = seedConcept || prefixes[Math.floor(Math.random() * prefixes.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

    const description = `${prefix} solution to ${verb} ${domain} for improved ${outcome}`;
    const category = this.ideaCategories[Math.floor(Math.random() * this.ideaCategories.length)];
    const feasibility = 0.3 + Math.random() * 0.5; // 30-80% feasible

    return this.captureIdea(description, category, feasibility);
  }

  /**
   * Get idea statistics
   */
  getIdeaStats() {
    const totalIdeas = this.ideaRegistry.size;
    if (totalIdeas === 0) {
      return {
        totalIdeas: 0,
        averageOriginality: 0,
        averageImpact: 0,
        categoryDistribution: {},
        stateDistribution: {}
      };
    }

    let totalOriginality = 0;
    let totalImpact = 0;
    const categoryCounts = {};
    const stateCounts = {};

    for (const idea of this.ideaRegistry.values()) {
      totalOriginality += idea.originality;
      totalImpact += idea.impactPotential;
      
      categoryCounts[idea.category] = (categoryCounts[idea.category] || 0) + 1;
      stateCounts[idea.state] = (stateCounts[idea.state] || 0) + 1;
    }

    return {
      totalIdeas,
      averageOriginality: totalOriginality / totalIdeas,
      averageImpact: totalImpact / totalIdeas,
      categoryDistribution: categoryCounts,
      stateDistribution: stateCounts
    };
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Serialize the current state
   */
  toJSON() {
    return {
      config: this.config,
      ideaCount: this.ideaRegistry.size,
      stats: this.getIdeaStats()
    };
  }
}

// Example usage
if (require.main === module) {
  console.log('💡 Starting Vibe Idea Exploration...\n');
  
  const vibeIdea = new VibeIdea({
    creativityLevel: 0.9,
    innovationThreshold: 0.75
  });
  
  // Capture some sample ideas
  vibeIdea.captureIdea("An AI assistant that learns your thinking patterns and suggests improvements", "technical", 0.7);
  vibeIdea.captureIdea("A platform that connects people with complementary skills for collaborative projects", "social", 0.85);
  vibeIdea.captureIdea("Visual programming interface for non-technical users to create AI workflows", "innovative", 0.6);
  vibeIdea.captureIdea("Decentralized knowledge sharing network with reputation-based curation", "technical", 0.5);
  
  // Generate some random ideas
  console.log("\n--- Generating Random Ideas ---");
  for (let i = 0; i < 3; i++) {
    vibeIdea.generateIdea();
  }
  
  // Connect related ideas
  const ideas = Array.from(vibeIdea.ideaRegistry.keys());
  if (ideas.length >= 2) {
    vibeIdea.connectIdeas(ideas[0], ideas[1], 'complementary');
  }
  
  console.log('\n📊 Idea Statistics:');
  console.log(JSON.stringify(vibeIdea.getIdeaStats(), null, 2));
  
  console.log('\n🔍 High-Impact Ideas (>0.5 impact):');
  const highImpactIdeas = vibeIdea.findIdeas(i => i.impactPotential > 0.5);
  console.log(highImpactIdeas.map(i => ({ description: i.description, impact: i.impactPotential })));
  
  console.log('\n✨ Vibe Idea exploration completed!');
}

module.exports = VibeIdea;