import { ATTRIBUTE_LIST } from "./consts";

export type Attributes = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export type Character = {
    id: string;
    attributes: Attributes;
    skillPoints: SkillPoints;
}

export type Attribute = typeof ATTRIBUTE_LIST[number];

export type SkillPoints = Record<string, { points: number; modifier: number; total: number }>
