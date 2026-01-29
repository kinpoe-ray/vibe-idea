/**
 * Vibe Idea - Quick Demo
 * 
 * Demonstrates the core functionality of the AI-powered ideation engine
 */

const IdeaBrainstormer = require('./src/brainstorm');

async function runDemo() {
  console.log('🌟 VIBE IDEA - QUICK DEMONSTRATION\n');
  console.log('Showing the power of AI-powered personalized ideation...\n');
  
  // Initialize the brainstorming engine
  const brainstormer = new IdeaBrainstormer({
    creativityLevel: 0.9,
    innovationThreshold: 0.75
  });
  
  console.log('1. 🧠 INITIALIZING BRAINSTORMING ENGINE');
  console.log('   - Creativity level set to 90%');
  console.log('   - Innovation threshold set to 75%');
  console.log('   - Multi-dimensional evaluation system active\n');
  
  // Generate ideas in different categories
  console.log('2. 💡 GENERATING IDEAS ACROSS DOMAINS');
  
  // Technology-focused ideas
  console.log('   🖥️  Technology Ideas:');
  const techIdeas = brainstormer.brainstorm('technology', 2);
  
  // Business-focused ideas
  console.log('\n   💼 Business Ideas:');
  const businessIdeas = brainstormer.brainstorm('business', 2);
  
  // Social impact ideas
  console.log('\n   🤝 Social Impact Ideas:');
  const socialIdeas = brainstormer.brainstorm('social_impact', 2);
  
  console.log('\n3. 📊 EVALUATING AND RANKING IDEAS');
  
  // Combine all ideas and rank them
  const allIdeas = [...techIdeas, ...businessIdeas, ...socialIdeas];
  const rankedIdeas = brainstormer.rankIdeas(allIdeas);
  
  console.log('\n   Top 3 Ideas by Overall Score:');
  rankedIdeas.slice(0, 3).forEach((evaluation, idx) => {
    const idea = brainstormer.ideaRegistry.get(evaluation.ideaId);
    console.log(`\n   ${idx + 1}. ${idea.description.substring(0, 80)}...`);
    console.log(`      Score: ${(evaluation.overallScore * 100).toFixed(1)}%`);
    console.log(`      Feasibility: ${(evaluation.feasibility * 100).toFixed(1)}% | ` +
                `Impact: ${(evaluation.impactPotential * 100).toFixed(1)}% | ` +
                `Originality: ${(evaluation.originality * 100).toFixed(1)}%`);
  });
  
  console.log('\n4. 🔍 FINDING CONNECTIONS BETWEEN IDEAS');
  
  // Find synergies between ideas
  const synergies = brainstormer.findIdeaSynergies();
  console.log(`   Found ${synergies.length} potential synergies between ideas`);
  if (synergies.length > 0) {
    console.log(`   Top synergy: ${synergies[0].synergyScore.toFixed(2)} score`);
    console.log(`   Suggestion: ${synergies[0].suggestedCombination.substring(0, 100)}...`);
  }
  
  console.log('\n5. 🗺️  GENERATING IMPLEMENTATION ROADMAP');
  
  // Generate roadmap for the top idea
  if (rankedIdeas.length > 0) {
    const topIdeaId = rankedIdeas[0].ideaId;
    const roadmap = brainstormer.generateRoadmap(topIdeaId);
    
    console.log(`   Selected idea: ${(brainstormer.ideaRegistry.get(topIdeaId)?.description || '').substring(0, 60)}...`);
    console.log(`   Estimated timeline: ${roadmap.milestones[roadmap.milestones.length - 1].timeline}`);
    
    console.log('\n   Implementation phases:');
    roadmap.recommendedPath.forEach((phase, idx) => {
      console.log(`   ${idx + 1}. ${phase.phase} (${phase.duration} months)`);
    });
  }
  
  console.log('\n6. 🎯 PERSONALIZED RECOMMENDATIONS');
  
  // Show recommendations based on top evaluation
  if (rankedIdeas.length > 0) {
    const topEvaluation = rankedIdeas[0];
    const recommendations = [];
    
    if (topEvaluation.overallScore > 0.7) {
      recommendations.push('High-potential idea - consider rapid prototyping');
    } else if (topEvaluation.overallScore > 0.5) {
      recommendations.push('Moderate-potential idea - validate with target audience');
    } else {
      recommendations.push('Lower-potential idea - consider enhancement or pivoting');
    }
    
    if (topEvaluation.originality > 0.7) {
      recommendations.push('Highly original concept - consider IP protection');
    }
    
    if (topEvaluation.impactPotential > 0.7) {
      recommendations.push('High impact potential - prioritize development');
    }
    
    if (topEvaluation.feasibility < 0.5) {
      recommendations.push('Lower feasibility - consider simplification');
    }
    
    recommendations.forEach(rec => console.log(`   • ${rec}`));
  }
  
  console.log('\n7. 📈 PROJECT STATS');
  const stats = brainstormer.getIdeaStats();
  console.log(`   • Total ideas generated: ${stats.totalIdeas}`);
  console.log(`   • Average originality: ${(stats.averageOriginality * 100).toFixed(1)}%`);
  console.log(`   • Average impact potential: ${(stats.averageImpact * 100).toFixed(1)}%`);
  console.log(`   • Category distribution: ${Object.entries(stats.categoryDistribution).map(([cat, count]) => `${cat}:${count}`).join(', ')}`);
  
  console.log('\n✨ DEMONSTRATION COMPLETE');
  console.log('\nVibe Idea successfully demonstrated:');
  console.log('- Context-aware idea generation');
  console.log('- Multi-dimensional evaluation');
  console.log('- Idea synergy detection');
  console.log('- Implementation roadmap generation');
  console.log('- Personalized recommendations');
  console.log('- Project analytics');
  
  console.log('\nThe AI-powered ideation engine is ready to help you discover');
  console.log('valuable ideas that align with your unique experiences and goals!');
}

// Run the demo
if (require.main === module) {
  runDemo()
    .then(() => {
      console.log('\n🎯 Demo finished successfully!');
    })
    .catch(err => {
      console.error('Error running demo:', err);
    });
}

module.exports = { runDemo };