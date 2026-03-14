import { z } from "zod";

/**
 * Schema for validating the AI response from step classification.
 */
export const ClassifyStepSchema = z.object({
  step_type: z.enum(["mechanical", "judgment", "hybrid"]),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
});

export type ClassifyStepResult = z.infer<typeof ClassifyStepSchema>;

/**
 * Schema for a single automation opportunity identified by AI.
 */
const OpportunityItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  affected_steps: z.array(z.string()),
  impact_score: z.number().min(1).max(5),
  effort_score: z.number().min(1).max(5),
  risk_score: z.number().min(1).max(5),
  frequency_score: z.number().min(1).max(5),
  pain_score: z.number().min(1).max(5),
  reasoning: z.string(),
});

/**
 * Schema for validating the AI response from opportunity identification.
 */
export const IdentifyOpportunitiesSchema = z.object({
  opportunities: z.array(OpportunityItemSchema),
});

export type IdentifyOpportunitiesResult = z.infer<
  typeof IdentifyOpportunitiesSchema
>;

/**
 * Schema for a single automation recommendation in a blueprint.
 */
const AutomationRecommendationSchema = z.object({
  title: z.string(),
  description: z.string(),
  steps_replaced: z.array(z.string()),
  dependencies: z.array(z.string()),
  implementation_notes: z.string(),
});

/**
 * Schema for expected ROI in a blueprint.
 */
const ExpectedROISchema = z.object({
  hours_saved_monthly: z.number().min(0),
  cycle_time_reduction_pct: z.number().min(0).max(100),
  error_rate_reduction_pct: z.number().min(0).max(100),
});

/**
 * Schema for validating the AI response from blueprint generation.
 */
export const GenerateBlueprintSchema = z.object({
  automations: z.array(AutomationRecommendationSchema),
  sequence: z.array(z.string()),
  expected_roi: ExpectedROISchema,
});

export type GenerateBlueprintResult = z.infer<typeof GenerateBlueprintSchema>;
