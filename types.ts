import { LucideIcon } from 'lucide-react';

export interface ModuleFeature {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: 'Administration' | 'Student Life' | 'Academics' | 'Intelligence';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GeminiConfig {
  temperature?: number;
  topK?: number;
  topP?: number;
}