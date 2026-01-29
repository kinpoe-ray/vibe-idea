/**
 * Simplified Idea Engine for Web App
 * Lightweight version of the full vibe-idea engine
 */

class WebIdeaEngine {
  constructor() {
    this.knowledgeDomains = [
      'technology', 'sustainability', 'education', 'health', 
      'creativity', 'business', 'social_impact', 'art'
    ];
    
    this.ideaTemplates = {
      technology: [
        'AI-powered solution to optimize {domain}',
        'Blockchain-based platform for {domain}',
        'IoT system to monitor and improve {domain}',
        'Mobile app to help users with {domain}',
        'AR/VR experience for {domain} education'
      ],
      sustainability: [
        'Circular economy approach to {domain}',
        'Zero-waste solution for {domain}',
        'Renewable energy application in {domain}',
        'Community-driven {domain} initiative',
        'Upcycling project focused on {domain}'
      ],
      education: [
        'Interactive learning platform for {domain}',
        'Gamified approach to teaching {domain}',
        'Peer-to-peer knowledge sharing in {domain}',
        'Virtual reality classroom for {domain}',
        'AI tutor specializing in {domain}'
      ],
      health: [
        'Preventive care approach to {domain}',
        'Mental wellness program for {domain}',
        'Fitness tracking solution for {domain}',
        'Telemedicine platform for {domain}',
        'Nutrition-focused app for {domain}'
      ],
      creativity: [
        'Collaborative workspace for {domain} creators',
        'AI-assisted {domain} generation tool',
        'Cross-media storytelling for {domain}',
        'Creative challenge platform for {domain}',
        'Digital archive for {domain} works'
      ],
      business: [
        'Subscription model for {domain} services',
        'Marketplace connecting {domain} providers',
        'Freemium tool for {domain} professionals',
        'Consulting service specializing in {domain}',
        'White-label solution for {domain} businesses'
      ],
      social_impact: [
        'Non-profit organization addressing {domain}',
        'Crowdfunding platform for {domain} projects',
        'Volunteer network focused on {domain}',
        'Awareness campaign for {domain} issues',
        'Policy advocacy around {domain}'
      ],
      art: [
        'Interactive {domain} installation',
        'Digital gallery for {domain} artists',
        'Collaborative {domain} project platform',
        '{domain} workshop series',
        'Augmented reality {domain} experience'
      ]
    };
    
    this.followupQuestions = {
      general: [
        'What specific problem are you trying to solve?',
        'Who would benefit most from this?',
        'What resources do you currently have available?',
        'How would you measure success?',
        'What excites you most about this direction?'
      ],
      technology: [
        'What technology stack interests you most?',
        'Are you targeting consumers or businesses?',
        'What\'s your technical background?',
        'Do you prefer mobile or web solutions?'
      ],
      sustainability: [
        'Which environmental issue concerns you most?',
        'Do you want to focus on individual or systemic change?',
        'Are you interested in policy or direct action?',
        'What sustainable practices do you already follow?'
      ],
      education: [
        'What age group interests you most?',
        'Do you prefer formal or informal learning?',
        'What subjects do you feel passionate about?',
        'Are you interested in traditional or innovative methods?'
      ]
    };
  }

  /**
   * Analyze user input and determine the most relevant domain
   */
  analyzeInput(userInput) {
    const input = userInput.toLowerCase();
    let scores = {};
    
    // Score each domain based on keyword matches
    for (const domain of this.knowledgeDomains) {
      let score = 0;
      
      // General keywords that appear across domains
      if (input.includes('app') || input.includes('application')) score += 2;
      if (input.includes('platform') || input.includes('system')) score += 2;
      if (input.includes('solution') || input.includes('solve')) score += 2;
      if (input.includes('help') || input.includes('assist')) score += 1;
      if (input.includes('community') || input.includes('people')) score += 1;
      if (input.includes('learn') || input.includes('education')) score += 1;
      
      // Domain-specific keywords
      switch(domain) {
        case 'technology':
          if (input.includes('ai') || input.includes('artificial intelligence')) score += 3;
          if (input.includes('blockchain') || input.includes('crypto')) score += 3;
          if (input.includes('mobile') || input.includes('app')) score += 2;
          if (input.includes('iot') || input.includes('internet of things')) score += 3;
          if (input.includes('data') || input.includes('algorithm')) score += 2;
          break;
          
        case 'sustainability':
          if (input.includes('sustainable') || input.includes('eco')) score += 3;
          if (input.includes('environment') || input.includes('green')) score += 3;
          if (input.includes('waste') || input.includes('zero')) score += 2;
          if (input.includes('energy') || input.includes('renewable')) score += 2;
          if (input.includes('circular') || input.includes('reuse')) score += 2;
          break;
          
        case 'education':
          if (input.includes('learn') || input.includes('teach')) score += 3;
          if (input.includes('school') || input.includes('student')) score += 2;
          if (input.includes('course') || input.includes('training')) score += 2;
          if (input.includes('knowledge') || input.includes('skill')) score += 2;
          if (input.includes('classroom') || input.includes('study')) score += 2;
          break;
          
        case 'health':
          if (input.includes('health') || input.includes('wellness')) score += 3;
          if (input.includes('fitness') || input.includes('exercise')) score += 2;
          if (input.includes('mental') || input.includes('therapy')) score += 2;
          if (input.includes('nutrition') || input.includes('diet')) score += 2;
          if (input.includes('medical') || input.includes('patient')) score += 2;
          break;
          
        case 'creativity':
          if (input.includes('creative') || input.includes('artistic')) score += 3;
          if (input.includes('design') || input.includes('creative')) score += 2;
          if (input.includes('music') || input.includes('visual')) score += 2;
          if (input.includes('writing') || input.includes('story')) score += 2;
          if (input.includes('maker') || input.includes('craft')) score += 2;
          break;
          
        case 'business':
          if (input.includes('business') || input.includes('startup')) score += 3;
          if (input.includes('market') || input.includes('customer')) score += 2;
          if (input.includes('revenue') || input.includes('profit')) score += 2;
          if (input.includes('service') || input.includes('product')) score += 2;
          if (input.includes('entrepreneur') || input.includes('venture')) score += 2;
          break;
          
        case 'social_impact':
          if (input.includes('impact') || input.includes('change')) score += 3;
          if (input.includes('community') || input.includes('social')) score += 2;
          if (input.includes('nonprofit') || input.includes('charity')) score += 2;
          if (input.includes('advocacy') || input.includes('awareness')) score += 2;
          if (input.includes('equity') || input.includes('accessibility')) score += 2;
          break;
          
        case 'art':
          if (input.includes('art') || input.includes('artist')) score += 3;
          if (input.includes('gallery') || input.includes('exhibition')) score += 2;
          if (input.includes('creative') || input.includes('expression')) score += 2;
          if (input.includes('culture') || input.includes('heritage')) score += 2;
          if (input.includes('performance') || input.includes('theater')) score += 2;
          break;
      }
      
      scores[domain] = score;
    }
    
    // Find the domain with the highest score
    let bestDomain = 'general';
    let bestScore = 0;
    
    for (const [domain, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestScore = score;
        bestDomain = domain;
      }
    }
    
    // If no strong match, default to general
    if (bestScore === 0) {
      bestDomain = 'general';
    }
    
    return {
      domain: bestDomain,
      confidence: bestScore > 0 ? Math.min(bestScore / 10, 1) : 0,
      relatedDomains: this.getRelatedDomains(bestDomain, scores)
    };
  }

  /**
   * Get related domains based on the primary domain
   */
  getRelatedDomains(primaryDomain, allScores) {
    // Define domain relationships
    const relationships = {
      'technology': ['business', 'education'],
      'sustainability': ['social_impact', 'health'],
      'education': ['technology', 'creativity'],
      'health': ['sustainability', 'social_impact'],
      'creativity': ['art', 'education'],
      'business': ['technology', 'social_impact'],
      'social_impact': ['sustainability', 'education'],
      'art': ['creativity', 'education']
    };
    
    const related = relationships[primaryDomain] || [];
    return related.filter(domain => allScores[domain] > 0);
  }

  /**
   * Generate specific ideas based on the analyzed domain
   */
  generateIdeas(inputAnalysis, userInput, count = 2) {
    const { domain } = inputAnalysis;
    const ideas = [];
    
    // Get templates for the identified domain
    const templates = this.ideaTemplates[domain] || this.ideaTemplates.general;
    
    // Replace {domain} placeholder with user's specific interest
    // Extract key terms from user input to personalize
    const keyTerms = this.extractKeyTerms(userInput);
    const domainPlaceholder = keyTerms.length > 0 ? keyTerms[0] : 'your area of interest';
    
    for (let i = 0; i < count && i < templates.length; i++) {
      const template = templates[i];
      const idea = template.replace(/\{domain\}/g, domainPlaceholder);
      
      ideas.push({
        id: `${domain}-${i}-${Date.now()}`,
        text: idea,
        domain: domain,
        relevance: inputAnalysis.confidence,
        tags: this.generateTags(idea, domain)
      });
    }
    
    return ideas;
  }

  /**
   * Extract key terms from user input
   */
  extractKeyTerms(input) {
    const terms = [];
    const lowerInput = input.toLowerCase();
    
    // Common prepositions and articles to exclude
    const exclusions = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    
    // Split by spaces and punctuation, then filter and deduplicate
    const words = lowerInput.split(/[^\w\s]/).join(' ').split(/\s+/)
      .filter(word => word.length > 2 && !exclusions.includes(word))
      .filter((word, index, arr) => arr.indexOf(word) === index); // Remove duplicates
    
    // Take up to 3 meaningful terms
    return words.slice(0, 3);
  }

  /**
   * Generate tags for an idea based on its content and domain
   */
  generateTags(idea, domain) {
    const tags = [domain];
    const lowerIdea = idea.toLowerCase();
    
    // Add specific tags based on keywords
    if (lowerIdea.includes('ai') || lowerIdea.includes('artificial intelligence')) tags.push('ai', 'automation');
    if (lowerIdea.includes('blockchain') || lowerIdea.includes('crypto')) tags.push('blockchain', 'decentralized');
    if (lowerIdea.includes('mobile') || lowerIdea.includes('app')) tags.push('mobile', 'application');
    if (lowerIdea.includes('sustainable') || lowerIdea.includes('eco')) tags.push('sustainability', 'environmental');
    if (lowerIdea.includes('learn') || lowerIdea.includes('education')) tags.push('education', 'learning');
    if (lowerIdea.includes('health') || lowerIdea.includes('wellness')) tags.push('health', 'wellness');
    if (lowerIdea.includes('creative') || lowerIdea.includes('art')) tags.push('creativity', 'artistic');
    
    return [...new Set(tags)]; // Remove duplicates
  }

  /**
   * Generate follow-up questions to help user refine their idea
   */
  generateFollowupQuestions(inputAnalysis, generatedIdeas) {
    const { domain } = inputAnalysis;
    const questions = [];
    
    // Get domain-specific questions
    const domainQuestions = this.followupQuestions[domain] || this.followupQuestions.general;
    
    // Add 2-3 relevant questions
    const selectedQuestions = domainQuestions.slice(0, 3);
    questions.push(...selectedQuestions);
    
    // Add idea-specific questions based on generated ideas
    if (generatedIdeas.length > 0) {
      const firstIdea = generatedIdeas[0];
      if (firstIdea.domain === 'technology') {
        questions.push('What\'s your development experience?', 'Do you have a technical co-founder in mind?');
      } else if (firstIdea.domain === 'sustainability') {
        questions.push('Have you researched existing solutions?', 'What\'s your budget for initial development?');
      }
    }
    
    // Limit to 3-4 questions to avoid overwhelming
    return questions.slice(0, 4);
  }

  /**
   * Generate a complete response for the web app
   */
  generateResponse(userInput) {
    // Analyze the user input
    const analysis = this.analyzeInput(userInput);
    
    // Generate ideas
    const ideas = this.generateIdeas(analysis, userInput);
    
    // Generate follow-up questions
    const questions = this.generateFollowupQuestions(analysis, ideas);
    
    // Create a friendly response
    const domainResponses = {
      technology: "Technology is a great field with lots of opportunities! Here are some ideas based on your interest:",
      sustainability: "Sustainability is such an important area! Here are some impactful ideas for you:",
      education: "Education is fundamental to progress! Here are some learning-focused ideas:",
      health: "Health and wellness are crucial! Here are some ideas in this space:",
      creativity: "Creativity drives innovation! Here are some creative project ideas:",
      business: "Business innovation can create real impact! Here are some entrepreneurial ideas:",
      social_impact: "Social impact work is very meaningful! Here are some ways you can make a difference:",
      art: "Art enriches our lives! Here are some creative art-related ideas:",
      general: "That sounds interesting! Here are some ideas based on your input:"
    };
    
    const responseText = domainResponses[analysis.domain] || domainResponses.general;
    
    return {
      analysis: analysis,
      responseText: responseText,
      ideas: ideas,
      followupQuestions: questions,
      mood: this.getMoodForResponse(analysis, ideas)
    };
  }

  /**
   * Determine the appropriate mood for the response
   */
  getMoodForResponse(analysis, ideas) {
    if (analysis.confidence > 0.7) {
      return 'excited'; // High confidence in domain match
    } else if (ideas.length > 0) {
      return 'happy'; // Successfully generated ideas
    } else {
      return 'thinking'; // Had to default to general response
    }
  }
}

// Export the engine
const ideaEngine = new WebIdeaEngine();
export default ideaEngine;