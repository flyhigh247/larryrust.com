export type EntryStatus = 'Planned' | 'In progress' | 'Published';
export type Section = { heading: string; paragraphs: string[] };
export type Entry = {
  slug: string; title: string; summary: string; category: string;
  status: EntryStatus; skills: string[]; sections: Section[];
  github?: string; evidence?: { label: string; href: string }[];
  publishedAt?: string; updatedAt?: string;
};

// These are proposed directions, not completed projects or claims of experience.
export const projects: Entry[] = [
  {
    slug: 'identity-and-access-lab', title: 'Identity & access lab', category: '01 / IDENTITY', status: 'Planned',
    summary: 'Explore how authentication, authorization, and session boundaries hold up in a deliberately scoped lab.',
    skills: ['OAuth 2.0', 'OpenID Connect', 'Authorization'],
    sections: [
      { heading: 'Proposed scope', paragraphs: ['Build a local identity lab to examine login flows, token handling, and access-control decisions. This is a proposed project; implementation and testing have not started.'] },
      { heading: 'Questions to investigate', paragraphs: ['Where are trust decisions made? How are token audience, issuer, and expiration checked? Can one user access another user’s resources?'] },
      { heading: 'Evidence to publish', paragraphs: ['A reproducible repository, architecture and trust-boundary diagrams, scoped test cases, and documented fixes with retest results. No findings are claimed at this stage.'] },
    ],
  },
  {
    slug: 'api-security-review', title: 'API security review', category: '02 / APPLICATION SECURITY', status: 'Planned',
    summary: 'Trace an API from request to data access, with a focus on object authorization and input boundaries.',
    skills: ['REST APIs', 'Access control', 'Security testing'],
    sections: [
      { heading: 'Proposed scope', paragraphs: ['Create a small test API and document its attack surface in an isolated environment. This project is planned and has no completed assessment or findings.'] },
      { heading: 'Questions to investigate', paragraphs: ['Are access checks applied to every object and operation? What inputs cross a trust boundary? How do error responses and resource limits affect exposure?'] },
      { heading: 'Evidence to publish', paragraphs: ['An endpoint inventory, repeatable test requests, risk explanations, remediation changes, and regression-test results alongside the source code.'] },
    ],
  },
  {
    slug: 'secure-delivery-pipeline', title: 'Secure delivery pipeline', category: '03 / CLOUD & DEVSECOPS', status: 'Planned',
    summary: 'Investigate practical security checks across source code, dependencies, and cloud configuration.',
    skills: ['CI/CD', 'Dependency analysis', 'Cloud configuration'],
    sections: [
      { heading: 'Proposed scope', paragraphs: ['Design a sample delivery pipeline with transparent security checks and documented tradeoffs. No pipeline has been implemented or evaluated yet.'] },
      { heading: 'Questions to investigate', paragraphs: ['Which checks produce actionable feedback? How should secrets and deployment permissions be scoped? What evidence should a release retain?'] },
      { heading: 'Evidence to publish', paragraphs: ['Pipeline configuration, sanitized example results, permission diagrams, and notes on false positives, limitations, and remediation.'] },
    ],
  },
];
export const research: Entry[] = [
  {
    slug: 'mapping-trust-boundaries', title: 'Mapping trust boundaries', category: 'THREAT MODELING', status: 'Planned',
    summary: 'A future exploration of data flows, trust boundaries, and abuse cases in a small web application.',
    skills: ['Data-flow diagrams', 'Abuse cases', 'Risk analysis'],
    sections: [
      { heading: 'Research brief', paragraphs: ['Use a deliberately small application to make the reasoning behind a threat model visible. This is a planned writeup; no completed model is available yet.'] },
      { heading: 'Questions to explore', paragraphs: ['What assets need protection? Who can influence each data flow? Which assumptions deserve testing, and which mitigations reduce the most meaningful risks?'] },
      { heading: 'Planned artifacts', paragraphs: ['A system diagram, explicit assumptions, prioritized threats, mitigation notes, and a discussion of remaining uncertainty.'] },
    ],
  },
  {
    slug: 'ai-tool-boundaries', title: 'When AI can call tools', category: 'AI SECURITY', status: 'Planned',
    summary: 'An experiment outline for prompt injection, untrusted content, and tool permissions in AI-assisted workflows.',
    skills: ['Prompt injection', 'Tool permissions', 'Trust boundaries'],
    sections: [
      { heading: 'Research brief', paragraphs: ['Explore how untrusted inputs can influence an AI workflow with tool access in an isolated test environment. This is an experiment outline, not a published result.'] },
      { heading: 'Questions to explore', paragraphs: ['Where should instructions end and untrusted data begin? Can narrowly scoped tools and explicit approvals limit unintended actions? How can failures be reproduced reliably?'] },
      { heading: 'Planned artifacts', paragraphs: ['A test harness, threat assumptions, sanitized examples, observed outcomes, and limitations. Results will be added only after the experiments are run.'] },
    ],
  },
];

// Fail the build for ambiguous URLs, duplicate slugs, or ungrounded publication records.
for (const collection of [projects, research]) {
  const slugs = new Set<string>();
  for (const entry of collection) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug) || slugs.has(entry.slug)) throw new Error(`Invalid or duplicate slug: ${entry.slug}`);
    slugs.add(entry.slug);
    if (entry.status === 'Published' && (!entry.publishedAt || !entry.evidence?.length)) throw new Error(`Published entry needs a date and evidence: ${entry.slug}`);
    for (const url of [entry.github, ...(entry.evidence?.map(link => link.href) ?? [])]) {
      if (url && new URL(url).protocol !== 'https:') throw new Error(`Evidence must use HTTPS: ${entry.slug}`);
    }
  }
}
