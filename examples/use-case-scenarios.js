/**
 * Vibe Idea - Use Case Scenarios
 * 
 * Demonstrates practical applications of the ideation engine
 */

const IdeaBrainstormer = require('../src/brainstorm');
const IdeaVisualizer = require('../src/idea-visualizer');

class UseCaseScenarios {
  constructor() {
    this.brainstormer = new IdeaBrainstormer({
      creativityLevel: 0.9,
      innovationThreshold: 0.75
    });
    this.visualizer = new IdeaVisualizer();
  }

  /**
   * Scenario 1: Tech Entrepreneur Looking for Startup Ideas
   */
  async techEntrepreneurScenario() {
    console.log('🚀 SCENARIO 1: Tech Entrepreneur Seeking Startup Ideas\n');
    
    // Generate ideas in technology domain
    const techIdeas = this.brainstormer.brainstorm('technology', 4);
    
    // Evaluate and rank the ideas
    const evaluations = this.brainstormer.rankIdeas(techIdeas);
    
    console.log('Top 3 Tech Startup Ideas:');
    for (let i = 0; i < Math.min(3, evaluations.length); i++) {
      const evalItem = evaluations[i];
      const idea = this.brainstormer.ideaRegistry.get(evalItem.ideaId);
      
      console.log(`\n${i + 1}. ${idea.description}`);
      console.log(`   Score: ${(evalItem.overallScore * 100).toFixed(1)}%`);
      console.log(`   Feasibility: ${(evalItem.feasibility * 100).toFixed(1)}%`);
      console.log(`   Impact: ${(evalItem.impactPotential * 100).toFixed(1)}%`);
      console.log(`   Originality: ${(evalItem.originality * 100).toFixed(1)}%`);
    }
    
    // Generate roadmap for top idea
    if (evaluations.length > 0) {
      const topIdeaId = evaluations[0].ideaId;
      const roadmap = this.brainstormer.generateRoadmap(topIdeaId);
      
      console.log('\n📋 Implementation Roadmap for Top Idea:');
      console.log(`• ${roadmap.recommendedPath[0].phase}: ${roadmap.recommendedPath[0].duration} months`);
      console.log(`• ${roadmap.recommendedPath[1].phase}: ${roadmap.recommendedPath[1].duration} months`);
      console.log(`• ${roadmap.recommendedPath[2].phase}: ${roadmap.recommendedPath[2].duration} months`);
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
    return evaluations;
  }

  /**
   * Scenario 2: Creative Professional Seeking Artistic Projects
   */
  async creativeProfessionalScenario() {
    console.log('🎨 SCENARIO 2: Creative Professional Seeking Artistic Projects\n');
    
    // Create ideas with artistic focus
    const creativeIdea1 = this.brainstormer.captureIdea(
      "Interactive digital installation exploring the relationship between human emotions and urban environments",
      "creative",
      0.6
    );
    
    const creativeIdea2 = this.brainstormer.captureIdea(
      "AI-assisted generative art series that evolves based on community input and environmental data",
      "creative", 
      0.7
    );
    
    const creativeIdea3 = this.brainstormer.captureIdea(
      "Cross-media storytelling platform combining AR, physical artifacts, and traditional narrative",
      "creative",
      0.5
    );
    
    const creativeIdeas = [creativeIdea1, creativeIdea2, creativeIdea3];
    const evaluations = this.brainstormer.rankIdeas(creativeIdeas, 'impact');
    
    console.log('Artistic Project Ideas Ranked by Impact Potential:');
    for (let i = 0; i < evaluations.length; i++) {
      const evalItem = evaluations[i];
      const idea = this.brainstormer.ideaRegistry.get(evalItem.ideaId);
      
      console.log(`\n${i + 1}. ${idea.description}`);
      console.log(`   Impact Potential: ${(evalItem.impactPotential * 100).toFixed(1)}%`);
      console.log(`   Originality: ${(evalItem.originality * 100).toFixed(1)}%`);
      console.log(`   Feasibility: ${(evalItem.feasibility * 100).toFixed(1)}%`);
    }
    
    // Find synergies between creative ideas
    const synergies = this.brainstormer.findIdeaSynergies();
    if (synergies.length > 0) {
      console.log('\n🔗 Potential Creative Synergies:');
      synergies.slice(0, 2).forEach((synergy, idx) => {
        console.log(`${idx + 1}. ${synergy.suggestedCombination.substring(0, 100)}...`);
      });
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
    return evaluations;
  }

  /**
   * Scenario 3: Social Impact Advocate
   */
  async socialImpactScenario() {
    console.log('🤝 SCENARIO 3: Social Impact Advocate\n');
    
    // Generate ideas focused on social impact
    const socialIdeas = this.brainstormer.brainstorm('social_impact', 3);
    
    // Evaluate with special focus on social impact
    const evaluations = this.brainstormer.rankIdeas(socialIdeas, 'impact');
    
    console.log('Social Impact Ideas:');
    for (let i = 0; i < evaluations.length; i++) {
      const evalItem = evaluations[i];
      const idea = this.brainstormer.ideaRegistry.get(evalItem.ideaId);
      
      console.log(`\n${i + 1}. ${idea.description}`);
      console.log(`   Social Impact Score: ${(evalItem.impactPotential * 100).toFixed(1)}%`);
      console.log(`   Feasibility: ${(evalItem.feasibility * 100).toFixed(1)}%`);
      console.log(`   Market Potential: ${(evalItem.marketPotential * 100).toFixed(1)}%`);
      console.log(`   Risk Level: ${(evalItem.riskAssessment * 100).toFixed(1)}% (lower is better)`);
    }
    
    // Generate comprehensive report for top idea
    if (evaluations.length > 0) {
      const topIdea = this.brainstormer.ideaRegistry.get(evaluations[0].ideaId);
      const topEvaluation = evaluations[0];
      
      console.log('\n📋 Detailed Report for Top Social Impact Idea:');
      
      // Generate recommendations
      const recommendations = [];
      if (topEvaluation.impactPotential > 0.8) {
        recommendations.push('High social impact potential - prioritize development');
      }
      if (topEvaluation.feasibility > 0.7) {
        recommendations.push('Feasible implementation - begin pilot program');
      }
      if (topEvaluation.riskAssessment < 0.5) {
        recommendations.push('Manageable risk level - proceed with planning');
      }
      
      recommendations.forEach(rec => console.log(`• ${rec}`));
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
    return evaluations;
  }

  /**
   * Scenario 4: Personalized Idea Generation
   */
  async personalizedScenario() {
    console.log('👤 SCENARIO 4: Personalized Idea Generation\n');
    
    // Simulate user profile
    const userProfile = {
      expertise: ['design', 'technology', 'education'],
      interests: ['sustainability', 'community', 'innovation'],
      challenges: ['engagement', 'accessibility', 'scalability']
    };
    
    console.log('User Profile Analysis:');
    console.log(`Expertise: ${userProfile.expertise.join(', ')}`);
    console.log(`Interests: ${userProfile.interests.join(', ')}`);
    console.log(`Challenges: ${userProfile.challenges.join(', ')}`);
    
    // Generate ideas that combine user's expertise with interests
    const personalizedIdeas = [];
    
    // Create ideas that intersect expertise and interests
    for (const expertise of userProfile.expertise) {
      for (const interest of userProfile.interests) {
        const idea = this.brainstormer.captureIdea(
          `Solution leveraging ${expertise} expertise to advance ${interest} goals`,
          expertise === 'technology' ? 'technical' : 'creative',
          0.6
        );
        personalizedIdeas.push(idea);
      }
    }
    
    // Also address user challenges
    for (const challenge of userProfile.challenges) {
      const idea = this.brainstormer.captureIdea(
        `Innovative approach to solving ${challenge} in ${userProfile.expertise[0]} contexts`,
        'innovative',
        0.7
      );
      personalizedIdeas.push(idea);
    }
    
    // Evaluate personalized ideas
    const evaluations = this.brainstormer.rankIdeas(personalizedIdeas, 'overall');
    
    console.log('\nPersonalized Ideas Based on Your Profile:');
    for (let i = 0; i < evaluations.length; i++) {
      const evalItem = evaluations[i];
      const idea = this.brainstormer.ideaRegistry.get(evalItem.ideaId);
      
      console.log(`\n${i + 1}. ${idea.description}`);
      console.log(`   Personal Fit: ${(evalItem.overallScore * 100).toFixed(1)}%`);
      console.log(`   Feasibility: ${(evalItem.feasibility * 100).toFixed(1)}%`);
    }
    
    // Generate a detailed report for the top personalized idea
    if (evaluations.length > 0) {
      const topEval = evaluations[0];
      const topIdea = this.brainstormer.ideaRegistry.get(topEval.ideaId);
      
      console.log('\n🎯 Personalized Recommendation:');
      console.log(`Based on your profile, "${topIdea.description.substring(0, 60)}..." seems most aligned.`);
      
      const roadmap = this.brainstormer.generateRoadmap(topIdea.id);
      console.log(`\nSuggested Next Steps:`);
      console.log(`1. ${roadmap.recommendedPath[0].phase} (${roadmap.recommendedPath[0].duration} months)`);
      console.log(`2. ${roadmap.recommendedPath[1].phase} (${roadmap.recommendedPath[1].duration} months)`);
      console.log(`3. ${roadmap.recommendedPath[2].phase} (${roadmap.recommendedPath[2].duration} months)`);
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
    return evaluations;
  }

  /**
   * Run all scenarios
   */
  async runAllScenarios() {
    console.log('🎯 VIBE IDEA - USE CASE SCENARIOS\n');
    console.log('Demonstrating the versatility of the AI-powered ideation engine\n');
    
    const results = {};
    
    results.tech = await this.techEntrepreneurScenario();
    results.creative = await this.creativeProfessionalScenario();
    results.social = await this.socialImpactScenario();
    results.personalized = await this.personalizedScenario();
    
    // Summary
    console.log('📊 SCENARIO SUMMARY');
    console.log(`Tech Startup Ideas Generated: ${results.tech.length}`);
    console.log(`Creative Projects Evaluated: ${results.creative.length}`);
    console.log(`Social Impact Ideas Assessed: ${results.social.length}`);
    console.log(`Personalized Ideas Created: ${results.personalized.length}`);
    
    console.log('\n✨ All scenarios completed! The Vibe Idea engine demonstrates');
    console.log('its ability to generate valuable, personalized ideas across');
    console.log('different domains and user profiles.');
  }
}

// Run scenarios if this file is executed directly
if (require.main === module) {
  const scenarios = new UseCaseScenarios();
  
  scenarios.runAllScenarios()
    .then(() => {
      console.log('\n🎉 Use case scenarios completed successfully!');
    })
    .catch(err => {
      console.error('Error running scenarios:', err);
    });
}

module.exports = UseCaseScenarios;