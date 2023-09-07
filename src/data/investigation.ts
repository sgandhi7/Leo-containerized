import { Investigation, Prompt } from '../types/investigation';

export const promptData: Prompt[] = [
  {
    id: '3',
    prompt: 'Did the Jedi have any enemies?',
    completion:
      'The Jedi have many enemies in the Star Wars universe, including the Sith and Dark Jedi.',
    score: 0.99,
  },
  {
    id: '2',
    prompt: 'Yes tell me about the Jedi',
    completion:
      'In the Star Wars universe, a Jedi is a member of a fictional order of fighters who are trained to protect and help others. They are also known as warrior-monks who keep peace in the universe.',
    score: 0.95,
  },
  {
    id: '1',
    prompt: 'Who is Luke Skywalker?',
    completion:
      'Luke Skywalker is a Jedi from a galaxy far, far away. His Father was Anakan Skywalker, who later turned to the Dark Side!',
    score: 0.99,
    suggestion: 'Would you like to know more about the Jedi?',
  },
];

export const investigationData: Investigation[] = [
  {
    id: '1',
    name: 'Who is John Doe?',
    status: 'Complete',
    created: new Date(),
    createdBy: 'Johnny Bouder',
    modified: new Date(),
    modifiedBy: 'Johnny Bouder',
    prompts: [],
  },
  {
    id: '2',
    name: 'Tell me about Jane Doe',
    status: 'In Progress',
    created: new Date(),
    createdBy: 'Johnny Bouder',
    modified: new Date(),
    modifiedBy: 'Johnny Bouder',
    prompts: [],
  },
  {
    id: '3',
    name: 'Who is Luke Skywalker?',
    status: 'In Progress',
    created: new Date(),
    createdBy: 'Johnny Bouder',
    modified: new Date(),
    modifiedBy: 'Johnny Bouder',
    prompts: [...promptData],
  },
  {
    id: '4',
    name: '3 days before 9/11',
    status: 'In Progress',
    created: new Date(),
    createdBy: 'Johnny Bouder',
    modified: new Date(),
    modifiedBy: 'Johnny Bouder',
    prompts: [],
  },
  {
    id: '5',
    name: 'List the DC Airports',
    status: 'In Progress',
    created: new Date(),
    createdBy: 'Johnny Bouder',
    modified: new Date(),
    modifiedBy: 'Johnny Bouder',
    prompts: [],
  },
  {
    id: '6',
    name: 'Why is Darth Vader so misunderstood?',
    status: 'In Progress',
    created: new Date(),
    createdBy: 'Johnny Bouder',
    modified: new Date(),
    modifiedBy: 'Johnny Bouder',
    prompts: [],
  },
  {
    id: '7',
    name: 'What is Order 66?',
    status: 'In Progress',
    created: new Date(),
    createdBy: 'Johnny Bouder',
    modified: new Date(),
    modifiedBy: 'Johnny Bouder',
    prompts: [],
  },
  {
    id: '8',
    name: 'Project Starkiller',
    status: 'In Progress',
    created: new Date(),
    createdBy: 'Johnny Bouder',
    modified: new Date(),
    modifiedBy: 'Johnny Bouder',
    prompts: [],
  },
];
